# [layer](#layer)

Creates a single scoped [layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer). This avoids potential naming collisions with other layers.

> 🚧  Ensure your target browsers [support layers](https://caniuse.com/css-cascade-layers). Vanilla Extract supports the [layers syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) but does not polyfill the feature in unsupported browsers.

layers.css.ts

```tsx
import { layer } from '@vanilla-extract/css';

export const reset = layer('reset');
export const framework = layer('framework');
export const app = layer('app');
```

CSS

```css
@layer layers_reset__e9kt8i0;
@layer layers_framework__e9kt8i1;
@layer layers_app__e9kt8i2;
```

Show Output

## [Nesting layers](#nesting-layers)

To facilitate organisation of styles, [layer nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer#nesting_layers) is supported by providing a `parent` layer reference via the options object. This will generate the shorthand syntax, i.e. `parent.child`, while also making the relationship between layers explicit.

layers.css.ts

```tsx
import { layer } from '@vanilla-extract/css';

export const reset = layer('reset');
export const framework = layer('framework');
export const typography = layer(
  { parent: framework },
  'typography'
);
```

CSS

```css
@layer layers_reset__e9kt8i0;
@layer layers_framework__e9kt8i1;
@layer layers_framework__e9kt8i1.layers_typography__e9kt8i2;
```

Show Output

## [Assigning styles](#assigning-styles)

Styles can be assigned to a layer by name, using the `@layer` key in the style object.

In this example, we first import the `layers.css.ts` stylesheet, setting up the order of the layers, then create a style within the `reset` layer.

reset.css.ts

layers.css.ts

```tsx
import { style } from '@vanilla-extract/css';
import { reset } from './layers.css.ts';

export const noMargin = style({
  '@layer': {
    [reset]: {
      margin: 0
    }
  }
});
```

CSS

```css
@layer layers_reset__e9kt8i0;
@layer layers_reset__e9kt8i0 {
  .reset_noMargin__1m3l8q90 {
    margin: 0;
  }
}
```

Show Output

## [Layer merging](#layer-merging)

In order to generate the smallest possible CSS output, Vanilla Extract will merge styles that are assigned to the same layer within the same file, if it can be done without impacting the precedence of the rules.

Notice in this example, while the `themedHeading` style is created before the the `heading` style, it appears later in the stylesheet. This is due to it being assigned to the `theme` layer — which is declared after the `base` layer.

typography.css.ts

```tsx
import { style, layer } from '@vanilla-extract/css';

const base = layer();
const theme = layer();

const text = style({
  '@layer': {
    [base]: {
      fontSize: '1rem'
    }
  }
});
const themedHeading = style({
  '@layer': {
    [theme]: {
      color: 'rebeccapurple'
    }
  }
});
const heading = style({
  '@layer': {
    [base]: {
      fontSize: '2.4rem'
    }
  }
});
```

CSS

```css
@layer typography_base__94ldqt0;
@layer typography_theme__94ldqt1;
@layer typography_base__94ldqt0 {
  .typography_text__94ldqt2 {
    font-size: 1rem;
  }
  .typography_heading__94ldqt4 {
    font-size: 2.4rem;
  }
}
@layer typography_theme__94ldqt1 {
  .typography_themedHeading__94ldqt3 {
    color: rebeccapurple;
  }
}
```

Show Output

[PreviouscreateContainer](/documentation/api/create-container/)

[NextcreateViewTransition](/documentation/api/create-view-transition/)
