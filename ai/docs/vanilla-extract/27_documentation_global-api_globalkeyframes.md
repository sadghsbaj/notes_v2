# [globalKeyframes](#globalkeyframes)

Creates a globally scoped set of keyframes.

animation.css.ts

```tsx
import {
  globalKeyframes,
  style
} from '@vanilla-extract/css';

const rotate = 'globalRotate';

globalKeyframes(rotate, {
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' }
});

export const spin = style({
  animation: `3s infinite ${rotate}`
});
```

CSS

```css
@keyframes globalRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.animation_spin__jxjrfl0 {
  animation: 3s infinite globalRotate;
}
```

Show Output

[PreviouscreateGlobalVar](/documentation/global-api/create-global-var/)

[NextglobalLayer](/documentation/global-api/global-layer/)
