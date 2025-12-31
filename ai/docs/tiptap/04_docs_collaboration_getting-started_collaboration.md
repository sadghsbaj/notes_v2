[Collaboration](/docs/collaboration/getting-started/overview)

Copy markdownAsk AI

# Make your editor collaborative

Collaboration adds real-time collaborative editing to your editor. Presence indicators show who’s active, awareness highlights each user’s cursor and selection, and built-in [version history](/docs/collaboration/documents/snapshot) and [Comments](/docs/comments/getting-started/overview) track every change.

It runs on our open source [Hocuspocus](https://github.com/ueberdosis/hocuspocus) backend, syncs content with the Yjs CRDT, and scales from a single demo to thousands of concurrent connections.

## [](#maintain-documents)Maintain documents

Every change is stored as a Yjs update. Use the [REST API](/docs/collaboration/documents/rest-api) to fetch JSON or push programmatic edits. Add [webhooks](/docs/collaboration/core-concepts/webhooks) for instant notifications and to retrieve all your documents.

Create your own backups of all documents and associated information using our [document management API](/docs/collaboration/documents/rest-api).

## [](#enable-advanced-features)Enable advanced features

-   [Version history](/docs/collaboration/documents/snapshot) – install the Collaboration Snapshot extension and let users restore any previous state.
-   [Snapshot compare](/docs/collaboration/documents/snapshot-compare) – highlight differences between versions with Snapshot Compare.
-   [Semantic search](/docs/collaboration/documents/semantic-search) – join the beta to search your library by meaning rather than keywords.

## Enterprise on-premises solution

Integrate Collaboration and all other Tiptap features into your infrastructure.

-   On-premises:

    Deploy our docker images in your own stack

-   High availability cluster:

    Scale confidently to millions of users

-   Dedicated support:

    Custom development and integration support in Chat


[

Let's talk

](https://tiptap.dev/contact-sales)

## [](#migrate-from-hocuspocus-or-collaboration-cloud)Migrate from Hocuspocus or Collaboration Cloud

Migrating your application from Hocuspocus to either an on-premises solution or the Tiptap Collaboration Cloud involves a simple switch from the `HocuspocusProvider` to the `TiptapCollabProvider`, or the other way around.

This doesn't require any other updates to your setup, and the way you interact with the API won't change as well. The `TiptapCollabProvider` acts as a go-between, managing how your application connects to the server and handles login details.

This migration approach is also applicable when migrating from the Tiptap Collaboration Cloud to an on-premises configuration.

Review the [Batch Import endpoint](/docs/collaboration/documents/rest-api#batch-import-documents) to migrate your documents.

## [](#schema-management)Schema management

Tiptap enforces strict schema adherence, discarding any elements not defined in the active schema. This can cause issues when clients using different schema versions concurrently edit a document.

For instance, imagine adding a task list feature in an update. Users on the previous schema won't see these task lists, and any added by a user on the new schema will disappear from their view due to schema discrepancies. This occurs because Tiptap synchronizes changes across clients, removing unrecognized elements based on the older schema.

To mitigate these issues, consider implementing [Invalid Schema Handling](/docs/editor/core-concepts/schema#invalid-schema-handling) as outlined in the Tiptap Editor docs.

[Next upInstall](/docs/collaboration/getting-started/install)
