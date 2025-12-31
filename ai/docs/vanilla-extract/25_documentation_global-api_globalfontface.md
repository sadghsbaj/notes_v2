# [globalFontFace](#globalfontface)

Creates a globally scoped custom font.

text.css.ts

```tsx
import {
  globalFontFace,
  style
} from '@vanilla-extract/css';

const comicSans = 'GlobalComicSans';

globalFontFace(comicSans, {
  src: 'local("Comic Sans MS")'
});

export const font = style({
  fontFamily: comicSans
});
```

CSS

```css
@font-face {
  src: local("Comic Sans MS");
  font-family: GlobalComicSans;
}
.text_font__fih47p0 {
  font-family: GlobalComicSans;
}
```

Show Output

## [Multiple Global Fonts with Single Family](#multiple-global-fonts-with-single-family)

The `globalFontFace` function allows you to pass an array of font-face rules that may contain different rules but treat them as if they are from one font family.

text.css.ts

```tsx
import {
  globalFontFace,
  style
} from '@vanilla-extract/css';

const gentium = 'GlobalGentium';

globalFontFace(gentium, [
  {
    src: 'local("Gentium")',
    fontWeight: 'normal'
  },
  {
    src: 'local("Gentium Bold")',
    fontWeight: 'bold'
  }
]);

export const font = style({
  fontFamily: gentium
});
```

CSS

```css
@font-face {
  src: local("Gentium");
  font-weight: normal;
  font-family: GlobalGentium;
}
@font-face {
  src: local("Gentium Bold");
  font-weight: bold;
  font-family: GlobalGentium;
}
.text_font__fih47p0 {
  font-family: GlobalGentium;
}
```

Show Output

[PreviouscreateGlobalThemeContract](/documentation/global-api/create-global-theme-contract/)

[NextcreateGlobalVar](/documentation/global-api/create-global-var/)
