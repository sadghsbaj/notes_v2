# [createVar](#createvar)

Creates a single scoped CSS Variable reference.

accent.css.ts

```tsx
import { createVar, style } from '@vanilla-extract/css';

export const accentVar = createVar();
```

CSS

No CSS created

Show Output

As you can see, no CSS is generated when you create a variable, it is only a reference that can be set later on.

## [Setting the variable](#setting-the-variable)

The variable reference created above can be set using the [“vars” key](/documentation/styling/#css-variables).

accent.css.ts

```tsx
import { createVar, style } from '@vanilla-extract/css';

export const accentVar = createVar();

export const blue = style({
  vars: {
    [accentVar]: 'blue'
  }
});

export const pink = style({
  vars: {
    [accentVar]: 'pink'
  }
});
```

CSS

```css
.accent_blue__l3kgsb1 {
  --accentVar__l3kgsb0: blue;
}
.accent_pink__l3kgsb2 {
  --accentVar__l3kgsb0: pink;
}
```

Show Output

Keep in mind the value of the variable can be changed in another class or even in a media query. For example, let’s change the value when the user prefers a dark color-scheme:

accent.css.ts

```tsx
import { createVar, style } from '@vanilla-extract/css';

export const accentVar = createVar();

export const blue = style({
  vars: {
    [accentVar]: 'blue'
  },
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: {
        [accentVar]: 'lightblue'
      }
    }
  }
});

export const pink = style({
  vars: {
    [accentVar]: 'pink'
  },
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: {
        [accentVar]: 'lightpink'
      }
    }
  }
});
```

CSS

```css
.accent_blue__l3kgsb1 {
  --accentVar__l3kgsb0: blue;
}
.accent_pink__l3kgsb2 {
  --accentVar__l3kgsb0: pink;
}
@media (prefers-color-scheme: dark) {
  .accent_blue__l3kgsb1 {
    --accentVar__l3kgsb0: lightblue;
  }
  .accent_pink__l3kgsb2 {
    --accentVar__l3kgsb0: lightpink;
  }
}
```

Show Output

## [Using the variable](#using-the-variable)

The variable reference can then be passed as the value for any CSS property.

style.css.ts

accent.css.ts

```tsx
import { createVar, style } from '@vanilla-extract/css';
import { accentVar } from './accent.css.ts';

export const accentText = style({
  color: accentVar
});
```

CSS

```css
.style_accentText__1p33h4l0 {
  color: var(--accentVar__l3kgsb0);
}
```

Show Output

## [Assigning variables dynamically](#assigning-variables-dynamically)

CSS variables can also be assigned dynamically using APIs in [the `@vanilla-extract/dynamic` package](/documentation/packages/dynamic).

## [@property rules](#property-rules)

[@property](https://developer.mozilla.org/en-US/docs/Web/CSS/@property) rules can also be created using `createVar`. CSS variables with @property rules are used in the same way as regular CSS variables:

accent.css.ts

```tsx
import { createVar, style } from '@vanilla-extract/css';

export const accentVar = createVar({
  syntax: '<color>',
  inherits: false,
  initialValue: 'blue'
});

export const pink = style({
  vars: {
    [accentVar]: 'pink'
  }
});
```

CSS

```css
@property --accentVar__l3kgsb0 {
  syntax: "<color>";
  inherits: false;
  initial-value: blue;
}
.accent_pink__l3kgsb1 {
  --accentVar__l3kgsb0: pink;
}
```

Show Output

[PreviousstyleVariants](/documentation/api/style-variants/)

[NextfallbackVar](/documentation/api/fallback-var/)
