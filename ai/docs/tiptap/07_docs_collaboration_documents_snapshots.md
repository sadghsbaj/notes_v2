[Collaboration](/docs/collaboration/getting-started/overview)/

[Documents](/docs/collaboration/documents)

Copy markdownAsk AI

# Integrate snapshots

Document history records every change to your content so you can roll back mistakes, audit edits, or branch a new draft from any point.

This page walks you through installation, configuration, and common tasks for the **History** extension.

### Public Demo

The editor content is shared across all demo visitors.

## [](#access-the-pro-registry)Access the Pro registry

The Version History extension is published in Tiptap’s private npm registry. Integrate the extension by following the [private registry guide](/docs/guides/pro-extensions). If you already authenticated your Tiptap account you can go straight to [#Install](#install).

## [](#install)Install

```

npm install @tiptap-pro/extension-snapshot @hocuspocus/transformer
```

**Note**: The `@hocuspocus/transformer` package is required for transforming Y.js binary into Tiptap JSON. It also requires Y.js installed for collaboration. If you don't have it installed, run `npm install yjs` in your project. This should happen automatically if you use NPM (as it automatically resolves peer dependencies).

## [](#settings)Settings

| Setting | Type | Default |
| --- | --- | --- |
| provider | `TiptapCollabProvider` | `null` |
| onUpdate | `function` | `() => {}` |

## [](#autoversioning)Autoversioning

The autoversioning feature automatically creates new versions of your document at regular intervals. This ensures that you have a comprehensive change history without manual intervention.

You can toggle this feature using the `toggleVersioning` command (default: disabled).

When you enable autoversioning, Tiptap creates new versions at regular intervals (30 seconds by default, only if the document has changed). This can create many versions, so you may want to increase the interval. To customize the interval, you can do the following:

```
// Set the interval (in seconds) between autoversions
const ydoc = provider.configuration.document
ydoc.getMap<number>('__tiptapcollab__config').set('intervalSeconds', 900)
```

## [](#revert-to-a-version)Revert to a version

When you revert to a previous version:

1.  If there are unsaved changes, Tiptap automatically creates a version to preserve those changes.
2.  Tiptap creates a new version at the top of the history with the content from the version you select.
3.  All users can continue working from this new version.

Note that reverting only affects the `default` fragment in the ydoc. When you revert the Tiptap content, the comments don't change (unless you specify a different `field` in the TiptapCollabProvider).

You can integrate the [compare snapshots](/docs/collaboration/documents/snapshot-compare) extension to highlight differences between versions, ensuring you choose the right version to restore.

## [](#storage)Storage

| Key | Type | Description |
| --- | --- | --- |
| currentVersion | `number` | The current version. |
| lastSaved | `Date` | The last saved timestamp |
| latestVersion | `number` | The latest version. |
| provider | `TiptapCollabProvider` | The Collaboration provider instance |
| status | `string` | The status of the provider - can be `connecting`, `connected` or `disconnected` |
| synced | `boolean` | Is the version history synced with the server |
| versioningEnabled | `boolean` | Is versioning enabled |
| versions | `array<Version>` | The array of versions that are stored in the history. |

## [](#commands)Commands

| Command | Description |
| --- | --- |
| saveVersion | Creates a new version with a given title |
| toggleVersioning | Toggles autoversioning for this document |
| revertToVersion | Revert to a specific version, can create a new revert version with optional title |

## [](#examples)Examples

### [](#basic-setup)Basic setup

```
const provider = new TiptapCollabProvider({
  // ...
})

const editor = new Editor({
  // ...
  extensions: [
    // ...
    Snapshot.configure({
      provider,
    }),
  ],
})
```

### [](#store-version-updates)Store version updates

In this example we retrieve the data of a version update and save it into a variable

```
let currentVersion = 0
let latestVersion = 0
let autoversioningEnabled = false
let versions = []

const provider = new TiptapCollabProvider({
  // ...
})

const editor = new Editor({
  // ...
  extensions: [
    // ...
    Snapshot.configure({
      provider,
      onUpdate(payload) {
        currentVersion = payload.currentVersion
        latestVersion = payload.version
        versions = payload.versions
        autoversioningEnabled = payload.autoVersioning
      },
    }),
  ],
})
```

### [](#access-version-data-directly-from-storage)Access version data directly from storage

```
const provider = new TiptapCollabProvider({
  // ...
})

const editor = new Editor({
  // ...
  extensions: [
    // ...
    Snapshot.configure({
      provider,
    }),
  ],
})

const latestVersion = editor.storage.snapshot.latestVersion
const currentVersion = editor.storage.snapshot.currentVersion
const versions = editor.storage.snapshot.versions
const autoversioningEnabled = editor.storage.snapshot.versioningEnabled
```

### [](#create-a-new-version-manually)Create a new version manually

```
editor.commands.saveVersion('My new custom version')
```

### [](#toggle-autoversioning-on-document)Toggle autoversioning on document

```
editor.commands.toggleVersioning()
```

### [](#revert-with-version-id)Revert with version ID

```
editor.commands.revertToVersion(4)
```

### [](#revert-with-version-id-with-custom-name)Revert with version ID with custom name

In this example, the editor command helps you go back to version 4. When you use this command, it takes you back to how things were in version 4, and it also saves this old version as a new version called 'Revert to version'. This way, you can continue working from version 4, but it's now saved as the latest version.

```
editor.commands.revertToVersion(4, 'Revert to version')
```

### [](#revert-name-and-back-up)Revert, name, and back up

In this example, when you revert to version 4 of your document, the editor automatically creates two new versions. The first new version captures and saves your document’s state just before reverting, serving as a backup. The second new version restores the document to version 4, allowing you to continue from here as your new starting point.

```
editor.commands.revertToVersion(4, 'Revert to version', 'Unversioned changes before revert')
```

### [](#implementing-version-previews-for-your-editor)Implementing version previews for your editor

The examples above directly modify the document and do not provide local-only previews of the version. Therefore, you must create your own frontend solution for this requirement. You can leverage the stateless messaging system of the `TiptapCloudProvider` to request a specific version from the server.

Start by attaching a listener to the provider:

```
// Import the getPreviewContentFromVersionPayload helper function (refer to details below)
import { watchPreviewContent } from '@tiptap-pro/extension-snapshot'

// Configure the provider
const provider = new TiptapCollabProvider({ ... })

// Use the watchPreviewContent util function to watch for content changes on the provider
const unbindWatchContent = watchPreviewContent(provider, content => {
  // set your editors content
  editor.commands.setContent(content)
})
```

If you want to unbind the watcher, you can call the returned `unbindWatchContent` function like this:

```
const unbindWatchContent = watchPreviewContent(provider, (content) => {
  // set your editors content
  editor.commands.setContent(content)
})

// unwatch
unbindWatchContent()
```

Following this setup, you can trigger `version.preview` requests like so:

```
// Define a function that sends a version.preview request to the provider
const requestVersion = (version) => {
  provider.sendStateless(
    JSON.stringify({
      action: 'version.preview',
      // Include your version number here
      version,
    }),
  )
}

// Trigger the request
requestVersion(1)

// You can then link this function to button clicks or other UI elements to trigger the request.
```

To go beyond previews and compare different versions visually, the [compare snapshots](/docs/collaboration/documents/snapshot-compare) extension provides an easy way to see the changes between any two versions within the editor.

## [](#utility-functions)Utility functions

### [](#getpreviewcontentfromversionpayload)getPreviewContentFromVersionPayload

This function turns the payload from the Collaboration provider into Tiptap JSON content.

| Argument | Description |
| --- | --- |
| payload | The Hocuspocus payload for the version preview event |
| field | The field you want to parse. Default: `default` |

```
const myContent = getPreviewContentFromVersionPayload(payload, 'default')
```

### [](#watchpreviewcontent)watchPreviewContent

This function sets up a watcher on your provider that watches the necessary events to react to version content changes. It also returns a new function that you can use to unwatch those events.

| Argument | Description |
| --- | --- |
| provider | The Collaboration provider |
| callback | The callback function that is called, the argument is the Tiptap JSON content |
| field | The watched field - defaults to `default` |

```
const unwatchContent = watchPreviewContent(provider, editor.commands.setContent, 'default')

// unwatch the version preview content
unwatchContent()
```

## [](#possible-provider-payloads)Possible provider payloads

Here is a list of payloads that can be sent or received from the provider:

### [](#outgoing)Outgoing

#### [](#documentrevert)`document.revert`

Request a document revert to a given version with optional title settings.

```
provider.sendStateless(
  JSON.stringify({
    action: 'document.revert',
    version: 1,
    currentVersionName: 'Before reverting to version 1',
    newVersionName: 'Revert to version 1',
  }),
)
```

#### [](#versioncreate)`version.create`

Creates a new version with an optional title.

```
this.options.provider.sendStateless(
  JSON.stringify({ action: 'version.create', name: 'My custom version' }),
)
```

### [](#incoming)Incoming

#### [](#saved)`saved`

This stateless message can be used to retrieve the last saved timestamp.

```
provider.on('stateless', (data) => {
  const payload = JSON.parse(data.payload)

  if (payload.action === 'saved') {
    const lastSaved = new Date()
  }
})
```

#### [](#versioncreated)`version.created`

This stateless message includes information about newly created versions.

```
provider.on('stateless', (data) => {
  const payload = JSON.parse(data.payload)

  if (payload.action === 'version.created') {
    const latestVersion = payload.version
    const currentVersion = payload.version
  }
})
```

#### [](#documentreverted)`document.reverted`

This stateless message includes information about a document revert.

```
provider.on('stateless', (data) => {
  const payload = JSON.parse(data.payload)

  if (payload.action === 'document.reverted') {
    const currentVersion = payload.version
  }
})
```

[PreviouslyREST API](/docs/collaboration/documents/rest-api)

[Next upCompare Snapshots](/docs/collaboration/documents/snapshot-compare)
