# [Getting Started](#getting-started)

## [Installation](#installation)

`npm install @vanilla-extract/css`

## [Bundler Integration](#bundler-integration)

Vanilla-extract requires that you have set up a bundler and configured it to handle CSS. This allows your styles to be handled the same as any other dependencies in your code, importing and bundling only what is required.

Install your integration of preference:

-   [vite](/documentation/integrations/vite/)
-   [esbuild](/documentation/integrations/esbuild/)
-   [webpack](/documentation/integrations/webpack/)
-   [next](/documentation/integrations/next/)
-   [parcel](/documentation/integrations/parcel/)
-   [rollup](/documentation/integrations/rollup/)
-   [gatsby](/documentation/integrations/gatsby/)

## [Create a style](#create-a-style)

A stylesheet can be made by adding a `.css.ts` file into your project.

For example:

styles.css.ts

```tsx
import { style } from '@vanilla-extract/css';

export const container = style({
  padding: 10
});
```

CSS

```css
.styles_container__1hiof570 {
  padding: 10px;
}
```

Show Output

Importantly, this does two things:

1.  creates a locally scoped class
2.  exports the generated class name.

## [Apply the style](#apply-the-style)

To apply the style to an element, we need to import it from our stylesheet.

By importing the style we receive the scoped class name that was generated and we can apply it to the `class` attribute on the element.

app.ts

styles.css.ts

```tsx
import { container } from './styles.css.ts';

document.write(`
  <section class="${container}">
    ...
  </section>
`);
```

As a side effect of this import, the CSS is also processed by the selected bundler integration and handled accordingly.

[NextStyling](/documentation/styling/)
