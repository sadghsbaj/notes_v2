# [Test Environments](#test-environments)

When executing a `.css.ts` file, class name identifiers will be returned as expected, and if running in a browser-like environment, such as [jsdom](https://github.com/jsdom/jsdom), then real styles will be injected into the document. However for vanilla-extract styles to work in a test environment, a transform needs to be applied to the code.

Currently, [Jest](https://jestjs.io/) and [Vitest](https://vitest.dev/) have official integrations. Please reach out in the [Discord](https://discord.gg/6nCfPwwz6w) or [Discussions](https://github.com/vanilla-extract-css/vanilla-extract/discussions) for help with other setups.

## [Jest](#jest)

Install the [Jest](https://jestjs.io/) transformer

`npm install --save-dev @vanilla-extract/jest-transform`

Add the transform to your Jest configuration.

jest.config.js

`{   "transform": {     "\\.css\\.ts$": "@vanilla-extract/jest-transform"   } }`

### [Remove Style Mocking](#remove-style-mocking)

It is very common in Jest setups to have a mock file returned for all `.css` files. This clashes with vanilla-extract as Jest can’t differentiate between `.css` and `.css.ts` imports.

For example:

package.json

`{   "jest": {     "moduleNameMapper": {       // ❌ Breaks .css.ts imports       "\\.css$": "<rootDir>/styleMock.js"     }   } }`

Ideally, remove this mock from your setup. However, if you need to support both at the same time you’ll need a way to target your regular CSS files. Using a folder for all your CSS files, or giving your CSS files a custom extension will work.

package.json

`{   "jest": {     "moduleNameMapper": {       "my-css-folder/.*\\.css$": "<rootDir>/styleMock.js",       "\\.legacy\\.css$": "<rootDir>/styleMock.js"     }   } }`

## [Vitest](#vitest)

If you are already using vanilla-extract with [Vite](https://vitejs.dev/) then no setup should be required as [Vitest](https://vitest.dev/) references your existing vite config file.

If using [Vitest](https://vitest.dev/) in other environments, install the `@vanilla-extract/vite-plugin`:

`npm install --save-dev @vanilla-extract/vite-plugin`

Add the plugin to your Vitest configuration.

vitest.config.ts

`import { defineConfig } from 'vitest/config'; import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';  export default defineConfig({   plugins: [vanillaExtractPlugin()] });`

## [Disabling Runtime Styles](#disabling-runtime-styles)

While testing against actual styles is often desirable, it can be a major slowdown in your tests. If your tests don’t require styles to be available, importing `disableRuntimeStyles` will prevent all style creation.

setupTests.ts

`import '@vanilla-extract/css/disableRuntimeStyles';`

[PreviousComposition](/documentation/style-composition/)

[Nextstyle](/documentation/api/style/)
