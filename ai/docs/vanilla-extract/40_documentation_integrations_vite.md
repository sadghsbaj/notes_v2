# [Vite](#vite)

A plugin for integrating vanilla-extract with [Vite](https://vitejs.dev/).

## [Installation](#installation)

`npm install --save-dev @vanilla-extract/vite-plugin`

## [Setup](#setup)

Add the plugin to your Vite configuration, along with any desired [plugin configuration](/documentation/integrations/vite/#configuration).

vite.config.js

`import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';  export default {   plugins: [vanillaExtractPlugin()] };`

## [Configuration](#configuration)

vite.config.js

`import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';  export default {   plugins: [     vanillaExtractPlugin({       // configuration     })   ] };`

The plugin accepts the following as optional configuration:

### [identifiers](#identifiers)

Different formatting of identifiers (e.g. class names, keyframes, CSS Vars, etc) can be configured by selecting from the following options:

-   `short` identifiers are a 7+ character hash. e.g. `hnw5tz3`
-   `debug` identifiers contain human readable prefixes representing the owning filename and a potential rule level debug name. e.g. `myfile_mystyle_hnw5tz3`
-   A custom identifier function takes an object parameter with properties `hash`, `filePath`, `debugId`, and `packageName`, and returns a customized identifier. e.g.

``vanillaExtractPlugin({   identifiers: ({ hash }) => `prefix_${hash}` });``

Each integration will set a default value based on the configuration options passed to the bundler.

[PreviousRollup](/documentation/integrations/rollup/)

[NextWebpack](/documentation/integrations/webpack/)
