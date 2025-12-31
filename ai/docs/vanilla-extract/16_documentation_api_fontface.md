# [fontFace](#fontface)

Creates a locally scoped [font-family](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-family) for the defined [@font-face](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face).

text.css.ts

```tsx
import { fontFace, style } from '@vanilla-extract/css';

const comicSans = fontFace({
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
  font-family: "text_comicSans__fih47p0";
}
.text_font__fih47p1 {
  font-family: "text_comicSans__fih47p0";
}
```

Show Output

## [Multiple Fonts with Single Family](#multiple-fonts-with-single-family)

The `fontFace` function allows you to pass an array of font-face rules that may contain different rules but treat them as if they are from one font family.

text.css.ts

```tsx
import { fontFace, style } from '@vanilla-extract/css';

const gentium = fontFace([
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
  font-family: "text_gentium__fih47p0";
}
@font-face {
  src: local("Gentium Bold");
  font-weight: bold;
  font-family: "text_gentium__fih47p0";
}
.text_font__fih47p1 {
  font-family: "text_gentium__fih47p0";
}
```

Show Output

[PreviousassignVars](/documentation/api/assign-vars/)

[Nextkeyframes](/documentation/api/keyframes/)
