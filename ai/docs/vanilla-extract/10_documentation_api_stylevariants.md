# [styleVariants](#stylevariants)

Creates a collection of named style rules.

This is useful for mapping component props to styles, for example: `<button className={styles.background[props.variant]}>`

styles.css.ts

app.tsx

```tsx
import { styleVariants } from '@vanilla-extract/css';

export const background = styleVariants({
  primary: { background: 'blue' },
  secondary: { background: 'aqua' }
});
```

CSS

```css
.styles_background_primary__1hiof570 {
  background: blue;
}
.styles_background_secondary__1hiof571 {
  background: aqua;
}
```

Show Output

## [Style composition](#style-composition)

Variant styles can also be composed into a single rule by providing an array of styles.

> ✨  Curious about style composition? Make sure you’ve read the [style composition overview](/documentation/style-composition) first.

styles.css.ts

```tsx
import { style, styleVariants } from '@vanilla-extract/css';

const base = style({ padding: 12 });

export const variant = styleVariants({
  primary: [base, { background: 'blue' }],
  secondary: [base, { background: 'aqua' }]
});
```

CSS

```css
.styles_base__1hiof570 {
  padding: 12px;
}
.styles_variant_primary__1hiof571 {
  background: blue;
}
.styles_variant_secondary__1hiof572 {
  background: aqua;
}
```

Show Output

## [Mapping variants](#mapping-variants)

To make generating sets of style variants easier, a mapping function can be provided as the second argument.

For example, we can iterate over the `palette` below, without having to define the style rule explicitly for each entry.

styles.css.ts

```tsx
import { style, styleVariants } from '@vanilla-extract/css';

const base = style({ padding: 12 });

const palette = {
  primary: 'blue',
  secondary: 'aqua'
};

export const variant = styleVariants(
  palette,
  (paletteColor) => [base, { background: paletteColor }]
);
```

CSS

```css
.styles_base__1hiof570 {
  padding: 12px;
}
.styles_variant_primary__1hiof571 {
  background: blue;
}
.styles_variant_secondary__1hiof572 {
  background: aqua;
}
```

Show Output

[Previousstyle](/documentation/api/style/)

[NextcreateVar](/documentation/api/create-var/)
