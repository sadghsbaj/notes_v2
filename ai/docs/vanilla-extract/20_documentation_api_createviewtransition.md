# [createViewTransition](#createviewtransition)

Creates a single scoped view transition name for use with [CSS View Transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API#css_additions). This avoids potential naming collisions with other view transitions.

> 🚧  Ensure your target browsers [support view transitions](https://caniuse.com/view-transitions). Vanilla-extract supports the [view transition syntax](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API#css_additions) but does not polyfill the feature in unsupported browsers.

itemPage.css.ts

navigation.css.ts

```tsx
import {
  style,
  createViewTransition
} from '@vanilla-extract/css';

export const titleViewTransition = createViewTransition();

export const pageTitle = style({
  viewTransitionName: titleViewTransition
});
```

CSS

```css
.itemPage_pageTitle__1i8e34m1 {
  view-transition-name: itemPage_titleViewTransition__1i8e34m0;
}
```

Show Output

[Previouslayer](/documentation/api/layer/)

[NextaddFunctionSerializer](/documentation/api/add-function-serializer/)
