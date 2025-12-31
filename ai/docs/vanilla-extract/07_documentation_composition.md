# [Style Composition](#style-composition)

Style composition is a special feature of vanilla-extract that makes it easy to get maximum re-use from your styles. It allows you to pass an array of class names and/or [styles](/documentation/styling/) but continue to treat them as if they are a single class name.

styles.css.ts

```tsx
import { style } from '@vanilla-extract/css';

const base = style({ padding: 12 });

const primary = style([base, { background: 'blue' }]);

const secondary = style([base, { background: 'aqua' }]);
```

CSS

```css
.styles_base__1hiof570 {
  padding: 12px;
}
.styles_primary__1hiof571 {
  background: blue;
}
.styles_secondary__1hiof572 {
  background: aqua;
}
```

Show Output

Let’s look at how this works in practice.

When you create a style you receive a class name back in return.

styles.css.ts

```tsx
import { style } from '@vanilla-extract/css';

// base = 'styles_base__8uideo0'
const base = style({ padding: 12 });
```

CSS

```css
.styles_base__1hiof570 {
  padding: 12px;
}
```

Show Output

However, when using style composition you will receive multiple classes in a single string, separated by a single space character, often referred to as a classlist.

styles.css.ts

```tsx
import { style } from '@vanilla-extract/css';

// base = 'styles_base__8uideo0'
const base = style({ padding: 12 });

// primary = 'styles_base__8uideo0 styles_primary__8uideo1'
const primary = style([base, { background: 'blue' }]);
```

CSS

```css
.styles_base__1hiof570 {
  padding: 12px;
}
.styles_primary__1hiof571 {
  background: blue;
}
```

Show Output

This doesn’t affect usage when assigning to the class property on DOM elements as they already accept a classlist. However, what if we want to use our style inside another styles selector?

styles.css.ts

```tsx
import { style } from '@vanilla-extract/css';

const base = style({ padding: 12 });

const primary = style([base, { background: 'blue' }]);

const text = style({
  selectors: {
    [`${primary} &`]: {
      color: 'white'
    }
  }
});
```

CSS

```css
.styles_base__1hiof570 {
  padding: 12px;
}
.styles_primary__1hiof571 {
  background: blue;
}
.styles_primary__1hiof571 .styles_text__1hiof572 {
  color: white;
}
```

Show Output

When selectors are processed internally, the composed classes are removed, only leaving behind a single unique identifier class. This allows you to treat them as if they were a single class within vanilla-extract selectors.

To ensure that this behaviour works as expected, when multiple pre-existing classes are composed, a new identifier is created and added to the classlist.

styles.css.ts

```tsx
import { style, globalStyle } from '@vanilla-extract/css';

const background = style({ background: 'mintcream' });
const padding = style({ padding: 12 });

// container = 'styles_container__8uideo2'
export const container = style([background, padding]);

globalStyle(`${container} *`, {
  boxSizing: 'border-box'
});
```

CSS

```css
.styles_background__1hiof570 {
  background: mintcream;
}
.styles_padding__1hiof571 {
  padding: 12px;
}
.styles_container__1hiof572 * {
  box-sizing: border-box;
}
```

Show Output

[PreviousTheming](/documentation/theming/)

[NextTest Environments](/documentation/test-environments/)
