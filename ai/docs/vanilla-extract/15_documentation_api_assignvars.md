# [assignVars](#assignvars)

Allows you to populate the values of a theme contract and assign them to a style.

While similar to [createTheme](/documentation/api/create-theme), this API provides more fine-grained control of how you populate the variables.

For example, this is useful for creating responsive themes since it can be used within `@media` blocks:

theme.css.ts

```tsx
import {
  createThemeContract,
  style,
  assignVars
} from '@vanilla-extract/css';

export const vars = createThemeContract({
  space: {
    small: null,
    large: null
  }
});

export const responsiveTheme = style({
  vars: assignVars(vars, {
    space: {
      small: '4px',
      large: '16px'
    }
  }),
  '@media': {
    'screen and (min-width: 1024px)': {
      vars: assignVars(vars, {
        space: {
          small: '8px',
          large: '32px'
        }
      })
    }
  }
});
```

CSS

```css
.theme_responsiveTheme__z05zdf2 {
  --space-small__z05zdf0: 4px;
  --space-large__z05zdf1: 16px;
}
@media screen and (min-width: 1024px) {
  .theme_responsiveTheme__z05zdf2 {
    --space-small__z05zdf0: 8px;
    --space-large__z05zdf1: 32px;
  }
}
```

Show Output

## [Partial theme contracts](#partial-theme-contracts)

As a convenience, the `assignVars` function can also handle populating sections of the theme contract.

For example, if the theme contract above also included a colour palette, we could choose to only implement the space scale responsively:

styles.css.ts

```tsx
import {
  createThemeContract,
  style,
  assignVars
} from '@vanilla-extract/css';

export const vars = createThemeContract({
  color: {
    brand: null,
    accent: null
  },
  space: {
    small: null,
    large: null
  }
});

export const responsiveTheme = style({
  vars: assignVars(vars, {
    color: {
      brand: 'pink',
      accent: 'aquamarine'
    },
    space: {
      small: '4px',
      large: '16px'
    }
  }),
  '@media': {
    'screen and (min-width: 1024px)': {
      vars: assignVars(vars.space, {
        small: '8px',
        large: '32px'
      })
    }
  }
});
```

CSS

```css
.styles_responsiveTheme__1hiof574 {
  --color-brand__1hiof570: pink;
  --color-accent__1hiof571: aquamarine;
  --space-small__1hiof572: 4px;
  --space-large__1hiof573: 16px;
}
@media screen and (min-width: 1024px) {
  .styles_responsiveTheme__1hiof574 {
    --space-small__1hiof572: 8px;
    --space-large__1hiof573: 32px;
  }
}
```

Show Output

[PreviouscreateThemeContract](/documentation/api/create-theme-contract/)

[NextfontFace](/documentation/api/font-face/)
