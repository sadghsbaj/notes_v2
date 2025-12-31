# [createGlobalVar](#createglobalvar)

Similar to [`createVar`](/documentation/api/create-var), `createGlobalVar` creates a global CSS variable reference:

vars.css.ts

```tsx
import {
  createGlobalVar,
  style
} from '@vanilla-extract/css';

const opacityVar = createGlobalVar('opacity');

export const content = style({
  opacity: opacityVar
});
```

CSS

```css
.vars_content__l19d8b0 {
  opacity: var(--opacity);
}
```

Show Output

[@property](https://developer.mozilla.org/en-US/docs/Web/CSS/@property) rules can also be created using `createGlobalVar`:

vars.css.ts

```tsx
import {
  createGlobalVar,
  style
} from '@vanilla-extract/css';

const opacityVar = createGlobalVar('opacity', {
  syntax: '<number>',
  inherits: false,
  initialValue: '0.5'
});

export const content = style({
  opacity: opacityVar
});
```

CSS

```css
@property --opacity {
  syntax: "<number>";
  inherits: false;
  initial-value: 0.5;
}
.vars_content__l19d8b0 {
  opacity: var(--opacity);
}
```

Show Output

[PreviousglobalFontFace](/documentation/global-api/global-font-face/)

[NextglobalKeyframes](/documentation/global-api/global-keyframes/)
