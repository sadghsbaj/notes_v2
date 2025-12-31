# [createGlobalTheme](#createglobaltheme)

Creates a theme attached to a global selector, but with locally scoped variable names.

> 🎨  New to theming in vanilla-extract? Make sure you’ve read the [theming overview](/documentation/theming) first.

theme.css.ts

```tsx
import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  color: {
    brand: 'blue'
  },
  font: {
    body: 'arial'
  }
});
```

CSS

```css
:root {
  --color-brand__z05zdf0: blue;
  --font-body__z05zdf1: arial;
}
```

Show Output

All theme values must be provided or it’s a type error.

Importing this stylesheet as a side effect to include the styles in your CSS bundle.

app.ts

`import './theme.css.ts';`

## [Implementing a Theme Contract](#implementing-a-theme-contract)

An existing theme contract can be implemented by passing it as the second argument.

theme.css.ts

```tsx
import {
  createThemeContract,
  createGlobalTheme
} from '@vanilla-extract/css';

export const vars = createThemeContract({
  color: {
    brand: null
  },
  font: {
    body: null
  }
});

createGlobalTheme(':root', vars, {
  color: {
    brand: 'blue'
  },
  font: {
    body: 'arial'
  }
});
```

CSS

```css
:root {
  --color-brand__z05zdf0: blue;
  --font-body__z05zdf1: arial;
}
```

Show Output

## [@layer](#layer)

Global themes can be assigned to a layer by name using the `@layer` key at the top-level of the theme definition.

> 🚧  Ensure your target browsers [support layers](https://caniuse.com/css-cascade-layers). Vanilla Extract supports the [layers syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) but does not polyfill the feature in unsupported browsers.

theme.css.ts

```tsx
import {
  createGlobalTheme,
  layer
} from '@vanilla-extract/css';

export const themeLayer = layer();

export const vars = createGlobalTheme(':root', {
  '@layer': themeLayer,
  color: {
    brand: 'blue'
  },
  font: {
    body: 'arial'
  }
});
```

CSS

```css
@layer theme_themeLayer__z05zdf0;
@layer theme_themeLayer__z05zdf0 {
  :root {
    --color-brand__z05zdf1: blue;
    --font-body__z05zdf2: arial;
  }
}
```

Show Output

[PreviousglobalStyle](/documentation/global-api/global-style/)

[NextcreateGlobalThemeContract](/documentation/global-api/create-global-theme-contract/)
