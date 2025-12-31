# [globalLayer](#globallayer)

Creates a globally scoped [layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer).

> 🚧  Ensure your target browsers [support layers](https://caniuse.com/css-cascade-layers). Vanilla Extract supports the [layers syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) but does not polyfill the feature in unsupported browsers.

layers.css.ts

```tsx
import { globalLayer } from '@vanilla-extract/css';

globalLayer('reset');
```

CSS

```css
@layer reset;
```

Show Output

Useful for orchestrating the order of layers within the stylesheet, for example:

layers.css.ts

```tsx
import { globalLayer } from '@vanilla-extract/css';

globalLayer('reset');
globalLayer('framework');
globalLayer('app');
```

CSS

```css
@layer reset;
@layer framework;
@layer app;
```

Show Output

## [Nesting layers](#nesting-layers)

To facilitate organisation of styles, [layer nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer#nesting_layers) is supported by providing a `parent` layer name via the options object. This will generate the shorthand syntax, i.e. `parent.child`, while also making the relationship between layers explicit.

layers.css.ts

```tsx
import { globalLayer } from '@vanilla-extract/css';

globalLayer('reset');
globalLayer('framework');
globalLayer({ parent: 'framework' }, 'typography');
```

CSS

```css
@layer reset;
@layer framework;
@layer framework.typography;
```

Show Output

## [Assigning styles](#assigning-styles)

Styles can be assigned to a layer by name, using the `@layer` key in the style object.

In this example, we first import the `layers.css.ts` stylesheet, setting up the order of the layers, then create a style within the `reset` layer.

reset.css.ts

layers.css.ts

```tsx
import { style } from '@vanilla-extract/css';
import './layers.css.ts';

export const noMargin = style({
  '@layer': {
    reset: {
      margin: 0
    }
  }
});
```

CSS

```css
@layer reset;
@layer reset {
  .reset_noMargin__1m3l8q90 {
    margin: 0;
  }
}
```

Show Output

Best practice would be to expose the layer references from the `layers.css.ts` stylesheet, and use those when creating styles.

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
@layer reset;
@layer reset {
  .reset_noMargin__1m3l8q90 {
    margin: 0;
  }
}
```

Show Output

This is particularly useful when using the nested layers feature, as the parent and child names are computed.

In our example, the name of the typography layer becomes `framework.typography`:

text.css.ts

layers.css.ts

```tsx
import { style } from '@vanilla-extract/css';
import { typography } from './layers.css.ts';

export const standard = style({
  '@layer': {
    [typography]: {
      fontSize: '1rem'
    }
  }
});
```

CSS

```css
@layer framework.typography;
@layer framework.typography {
  .text_standard__fih47p0 {
    font-size: 1rem;
  }
}
```

Show Output

## [Layer merging](#layer-merging)

In order to generate the smallest possible CSS output, Vanilla Extract will merge styles that are assigned to the same layer within the same file, if it can be done without impacting the precedence of the rules.

Notice in this example, while the `themedHeading` style is created before the the `heading` style, it appears later in the stylesheet. This is due to it being assigned to the `theme` layer — which is declared after the `base` layer.

typography.css.ts

```tsx
import { style, globalLayer } from '@vanilla-extract/css';

const base = globalLayer('base');
const theme = globalLayer('theme');

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
@layer base;
@layer theme;
@layer base {
  .typography_text__94ldqt0 {
    font-size: 1rem;
  }
  .typography_heading__94ldqt2 {
    font-size: 2.4rem;
  }
}
@layer theme {
  .typography_themedHeading__94ldqt1 {
    color: rebeccapurple;
  }
}
```

Show Output

[PreviousglobalKeyframes](/documentation/global-api/global-keyframes/)

[NextSprinkles](/documentation/packages/sprinkles/)
