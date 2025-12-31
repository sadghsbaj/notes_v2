# [createThemeContract](#createthemecontract)

Creates a contract of locally scoped variable names for themes to implement.

This is useful if you want to split your themes into different bundles. In this case, your themes would be defined in separate files, but we’ll keep this example simple.

> 🎨  New to theming in vanilla-extract? Make sure you’ve read the [theming overview](/documentation/theming) first.

themes.css.ts

```tsx
import {
  createThemeContract,
  createTheme,
  style
} from '@vanilla-extract/css';

export const vars = createThemeContract({
  color: {
    brand: null
  },
  font: {
    body: null
  }
});

export const themeA = createTheme(vars, {
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
.themes_themeA__1k6oxph2 {
  --color-brand__1k6oxph0: blue;
  --font-body__1k6oxph1: arial;
}
.themes_themeB__1k6oxph3 {
  --color-brand__1k6oxph0: pink;
  --font-body__1k6oxph1: comic sans ms;
}
.themes_brandText__1k6oxph4 {
  color: var(--color-brand__1k6oxph0);
  font-family: var(--font-body__1k6oxph1);
}
```

Show Output

[PreviouscreateTheme](/documentation/api/create-theme/)

[NextassignVars](/documentation/api/assign-vars/)
