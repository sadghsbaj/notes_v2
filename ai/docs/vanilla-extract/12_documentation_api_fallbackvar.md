# [fallbackVar](#fallbackvar)

Provides fallback values for variables that have been created using vanilla-extract APIs, e.g. `createVar`, `createTheme`, etc.

As these APIs produce variable references that contain the CSS var function, e.g. `var(--colorVar__qzfheg0)`, it is necessary to handle the wrapping function when providing a fallback.

style.css.ts

```tsx
import {
  createVar,
  fallbackVar,
  style
} from '@vanilla-extract/css';

export const colorVar = createVar();

export const color = style({
  color: fallbackVar(colorVar, 'blue')
});
```

CSS

```css
.style_color__1p33h4l1 {
  color: var(--colorVar__1p33h4l0, blue);
}
```

Show Output

## [Multiple fallback values](#multiple-fallback-values)

The `fallbackVar` function handles falling back across multiple variables by providing multiple parameters.

style.css.ts

```tsx
import {
  createVar,
  fallbackVar,
  style
} from '@vanilla-extract/css';

export const primaryVar = createVar();
export const secondaryVar = createVar();

export const color = style({
  color: fallbackVar(primaryVar, secondaryVar, 'blue')
});
```

CSS

```css
.style_color__1p33h4l2 {
  color: var(--primaryVar__1p33h4l0, var(--secondaryVar__1p33h4l1, blue));
}
```

Show Output

[PreviouscreateVar](/documentation/api/create-var/)

[NextcreateTheme](/documentation/api/create-theme/)
