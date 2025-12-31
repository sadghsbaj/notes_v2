# [globalStyle](#globalstyle)

Creates styles attached to a global selector.

Requires a selector string as the first parameter, followed by a style object.

app.css.ts

```tsx
import { globalStyle } from '@vanilla-extract/css';

globalStyle('html, body', {
  margin: 0
});
```

CSS

```css
html, body {
  margin: 0;
}
```

Show Output

> 🧠  The global style object cannot use [simple pseudo](/documentation/styling#simple-pseudo-selectors) or [complex selectors](/documentation/styling/#complex-selectors). This avoids unexpected results when merging with the global selector, e.g. `ul li:first-child, a > span`.

Global selectors can also contain references to other scoped class names.

app.css.ts

```tsx
import { style, globalStyle } from '@vanilla-extract/css';

export const parentClass = style({});

globalStyle(`${parentClass} > a`, {
  color: 'pink'
});
```

CSS

```css
.app_parentClass__sznanj0 > a {
  color: pink;
}
```

Show Output

[PreviousaddFunctionSerializer](/documentation/api/add-function-serializer/)

[NextcreateGlobalTheme](/documentation/global-api/create-global-theme/)
