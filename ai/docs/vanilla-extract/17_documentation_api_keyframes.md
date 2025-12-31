# [keyframes](#keyframes)

Creates a locally scoped [animation name](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name) for the defined [@keyframes](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes).

animation.css.ts

```tsx
import { keyframes, style } from '@vanilla-extract/css';

const rotate = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' }
});

export const spin = style({
  animationName: rotate,
  animationDuration: '3s'
});

// or interpolate as a shorthand:
export const spinAgain = style({
  animation: `${rotate} 3s`
});
```

CSS

```css
@keyframes animation_rotate__jxjrfl0 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.animation_spin__jxjrfl1 {
  animation-name: animation_rotate__jxjrfl0;
  animation-duration: 3s;
}
.animation_spinAgain__jxjrfl2 {
  animation: animation_rotate__jxjrfl0 3s;
}
```

Show Output

## [Animating CSS variables](#animating-css-variables)

CSS variables can be animated by setting their values within the `vars` property of a keyframe step:

animation.css.ts

```tsx
import {
  createVar,
  fallbackVar,
  keyframes,
  style
} from '@vanilla-extract/css';

const angle = createVar({
  syntax: '<angle>',
  inherits: false,
  initialValue: '0deg'
});

const angleKeyframes = keyframes({
  '0%': {
    vars: {
      [angle]: '0deg'
    }
  },
  '100%': {
    vars: {
      [angle]: '360deg'
    }
  }
});

export const root = style({
  backgroundImage: `linear-gradient(${angle}, rgba(153, 70, 198, 0.35) 0%, rgba(28, 56, 240, 0.46) 100%)`,
  animation: `${angleKeyframes} 7s infinite ease-in-out both`,

  vars: {
    // This will fallback to 180deg if @property is not supported by the browser
    [angle]: fallbackVar(angle, '180deg')
  }
});
```

CSS

```css
@property --angle__jxjrfl0 {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}
@keyframes animation_angleKeyframes__jxjrfl1 {
  0% {
    --angle__jxjrfl0: 0deg;
  }
  100% {
    --angle__jxjrfl0: 360deg;
  }
}
.animation_root__jxjrfl2 {
  --angle__jxjrfl0: var(--angle__jxjrfl0, 180deg);
  background-image: linear-gradient(var(--angle__jxjrfl0), rgba(153, 70, 198, 0.35) 0%, rgba(28, 56, 240, 0.46) 100%);
  animation: animation_angleKeyframes__jxjrfl1 7s infinite ease-in-out both;
}
```

Show Output

[PreviousfontFace](/documentation/api/font-face/)

[NextcreateContainer](/documentation/api/create-container/)
