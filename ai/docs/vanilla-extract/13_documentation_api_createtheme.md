# [createTheme](#createtheme)

Creates a locally scoped theme class and a theme contract which can be consumed within your styles.

> 🎨  New to theming in vanilla-extract? Make sure you’ve read the [theming overview](/documentation/theming) first.

theme.css.ts

```tsx
import { createTheme, style } from '@vanilla-extract/css';

export const [themeClass, vars] = createTheme({
  color: {
    brand: 'blue'
  },
  font: {
    body: 'arial'
  }
});

export const brandText = style({
  color: vars.color.brand,
  fontFamily: vars.font.body
});
```

CSS

```css
.theme_themeClass__z05zdf0 {
  --color-brand__z05zdf1: blue;
  --font-body__z05zdf2: arial;
}
.theme_brandText__z05zdf3 {
  color: var(--color-brand__z05zdf1);
  font-family: var(--font-body__z05zdf2);
}
```

Show Output

## [Creating theme variants](#creating-theme-variants)

Theme variants can be created by passing a theme contract as the first argument to `createTheme`.

All theme values must be provided or it’s a type error.

themes.css.ts

```tsx
import { createTheme, style } from '@vanilla-extract/css';

export const [themeA, vars] = createTheme({
  color: {
    brand: 'blue'
  },
  font: {
    body: 'arial'
  }
});

export const themeB = createTheme(vars, {
  color: {
    brand: 'pink'
  },
  font: {
    body: 'comic sans ms'
  }
});

export const brandText = style({
  color: vars.color.brand,
  fontFamily: vars.font.body
});
```

CSS

```css
.themes_themeA__1k6oxph0 {
  --color-brand__1k6oxph1: blue;
  --font-body__1k6oxph2: arial;
}
.themes_themeB__1k6oxph3 {
  --color-brand__1k6oxph1: pink;
  --font-body__1k6oxph2: comic sans ms;
}
.themes_brandText__1k6oxph4 {
  color: var(--color-brand__1k6oxph1);
  font-family: var(--font-body__1k6oxph2);
}
```

Show Output

## [@layer](#layer)

Themes can be assigned to a layer by name using the `@layer` key at the top-level of the theme definition.

> 🚧  Ensure your target browsers [support layers](https://caniuse.com/css-cascade-layers). Vanilla Extract supports the [layers syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) but does not polyfill the feature in unsupported browsers.

themes.css.ts

```tsx
import { createTheme, layer } from '@vanilla-extract/css';

export const themeLayer = layer();

export const [themeA, vars] = createTheme({
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
@layer themes_themeLayer__1k6oxph0;
@layer themes_themeLayer__1k6oxph0 {
  .themes_themeA__1k6oxph1 {
    --color-brand__1k6oxph2: blue;
    --font-body__1k6oxph3: arial;
  }
}
```

Show Output

[PreviousfallbackVar](/documentation/api/fallback-var/)

[NextcreateThemeContract](/documentation/api/create-theme-contract/)
