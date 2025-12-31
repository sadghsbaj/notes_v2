# [style](#style)

Creates a style rule with a locally scoped class name.

> 🖌  New to styling with vanilla-extract? Make sure you’ve read the [styling overview](/documentation/styling) first.

This class can then be imported directly into your consuming application code, creating a first-class contract between your CSS and JavaScript.

styles.css.ts

app.ts

```tsx
import { style } from '@vanilla-extract/css';

export const flexContainer = style({
  display: 'flex'
});
```

CSS

```css
.styles_flexContainer__1hiof570 {
  display: flex;
}
```

Show Output

CSS Variables, simple pseudos, selectors and media/feature queries are all supported.

styles.css.ts

```tsx
import { style, createVar } from '@vanilla-extract/css';

const scopedVar = createVar();

export const className = style({
  display: 'flex',
  vars: {
    [scopedVar]: 'green',
    '--global-variable': 'purple'
  },
  ':hover': {
    color: 'red'
  },
  selectors: {
    '&:nth-child(2n)': {
      background: '#fafafa'
    }
  },
  '@media': {
    'screen and (min-width: 768px)': {
      padding: 10
    }
  },
  '@supports': {
    '(display: grid)': {
      display: 'grid'
    }
  }
});
```

CSS

```css
.styles_className__1hiof571 {
  --scopedVar__1hiof570: green;
  --global-variable: purple;
  display: flex;
}
.styles_className__1hiof571:hover {
  color: red;
}
.styles_className__1hiof571:nth-child(2n) {
  background: #fafafa;
}
@media screen and (min-width: 768px) {
  .styles_className__1hiof571 {
    padding: 10px;
  }
}
@supports (display: grid) {
  .styles_className__1hiof571 {
    display: grid;
  }
}
```

Show Output

## [Style composition](#style-composition)

The `style` function allows you to pass an array of class names and/or style objects but continue to treat them as if they are a single class name.

> ✨  Curious about style composition? Make sure you’ve read the [style composition overview](/documentation/style-composition) first.

styles.css.ts

```tsx
import { style } from '@vanilla-extract/css';

const base = style({ padding: 12 });

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

## [Style merging](#style-merging)

When passing an array of style objects they will be deep merged into a single class. This is useful when creating utilities to help construct consistent styles.

styles.css.ts

```tsx
import { style } from '@vanilla-extract/css';

const responsiveStyle = ({ tablet, desktop }) => ({
  '@media': {
    'screen and (min-width: 768px)': tablet,
    'screen and (min-width: 1024px)': desktop
  }
});

const container = style([
  {
    display: 'flex',
    flexDirection: 'column'
  },
  responsiveStyle({
    tablet: { flex: 1, content: 'I will be overridden' },
    desktop: { flexDirection: 'row' }
  }),
  {
    '@media': {
      'screen and (min-width: 768px)': {
        content: 'I win!'
      }
    }
  }
]);
```

CSS

```css
.styles_container__1hiof570 {
  display: flex;
  flex-direction: column;
}
@media screen and (min-width: 768px) {
  .styles_container__1hiof570 {
    content: "I win!";
    flex: 1;
  }
}
@media screen and (min-width: 1024px) {
  .styles_container__1hiof570 {
    flex-direction: row;
  }
}
```

Show Output

[PreviousTest Environments](/documentation/test-environments/)

[NextstyleVariants](/documentation/api/style-variants/)
