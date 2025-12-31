# [Astro](#astro)

Integrating Vanilla Extract with [Astro](https://astro.build) is done with the help of the [Vite plugin](/documentation/integrations/vite).

## [Installation](#installation)

`npm install @vanilla-extract/css npm install @vanilla-extract/vite-plugin --save-dev`

## [Setup](#setup)

Add Vanilla Extract Vite plugin to the Astro configuration:

`import { defineConfig } from 'astro/config'; import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';  // https://astro.build/config export default defineConfig({   vite: {     plugins: [vanillaExtractPlugin()]   } });`

You’ll then be able to use `style` and other APIs in `.css.ts` files.

button.css.ts

`import { style } from '@vanilla-extract/css';  export const button = style({   padding: '0.5rem 1rem',   border: 'none',   borderRadius: '0.25rem',   color: 'white',   background: '#333' });`

And now you can reference styles in your Astro component:

 Button.astro

`--- import { button } from './button.css' ---  <button class={button}>Click Me!</button>`

## [Configuration](#configuration)

See the [Vite integration page](/documentation/integrations/vite) for documentation on the Vite plugin.

[PreviousCSS Utils](/documentation/packages/css-utils/)

[Nextesbuild](/documentation/integrations/esbuild/)
