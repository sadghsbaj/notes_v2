# [Styling](#styling)

All the styling APIs in Vanilla Extract take a style object as input. Describing styles as a JavaScript object enables much better use of TypeScript through your styling code, as the styles are typed data-structures like the rest of your application code. It also brings type-safety and autocomplete to CSS authoring (via [csstype](https://github.com/frenic/csstype)).

## [CSS Properties](#css-properties)

At the top-level of the style object, CSS properties can be set just like when writing a regular CSS class. The only difference is all properties use `camelCase` rather than `kebab-case`.

app.css.ts

```tsx
import { style, globalStyle } from '@vanilla-extract/css';

export const myStyle = style({
  display: 'flex',
  paddingTop: '3px'
});

globalStyle('body', {
  margin: 0
});
```

CSS

```css
.app_myStyle__sznanj0 {
  display: flex;
  padding-top: 3px;
}
body {
  margin: 0;
}
```

Show Output

### [Unitless Properties](#unitless-properties)

Some properties accept numbers as values. Excluding [unitless properties](https://github.com/vanilla-extract-css/vanilla-extract/blob/6068246343ceb58a04006f4ce9d9ff7ecc7a6c09/packages/css/src/transformCss.ts#L25), these values are assumed to be a pixel and `px` is automatically appended to the value.

styles.css.ts

```tsx
import { style } from '@vanilla-extract/css';

export const myStyle = style({
  // cast to pixels
  padding: 10,
  marginTop: 25,

  // unitless properties
  flexGrow: 1,
  opacity: 0.5
});
```

CSS

```css
.styles_myStyle__1hiof570 {
  padding: 10px;
  margin-top: 25px;
  flex-grow: 1;
  opacity: 0.5;
}
```

Show Output

### [Vendor Prefixes](#vendor-prefixes)

If you want to target a vendor specific property (e.g. `-webkit-tap-highlight-color`), you can do so using `PascalCase` and removing the beginning `-`.

styles.css.ts

```tsx
import { style } from '@vanilla-extract/css';

export const myStyle = style({
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'
});
```

CSS

```css
.styles_myStyle__1hiof570 {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
```

Show Output

## [CSS Variables](#css-variables)

In regular CSS, variables (or CSS custom properties) are able to be set alongside the other properties within the rule. In Vanilla Extract, CSS variables must be nested within the `vars` key — providing more accurate static typing for the other CSS properties.

styles.css.ts

```tsx
import { style } from '@vanilla-extract/css';

const myStyle = style({
  vars: {
    '--my-global-variable': 'purple'
  }
});
```

CSS

```css
.styles_myStyle__1hiof570 {
  --my-global-variable: purple;
}
```

Show Output

The `vars` key also accepts scoped CSS variables, created via the [createVar](/documentation/api/create-var/) API.

styles.css.ts

```tsx
import { style, createVar } from '@vanilla-extract/css';

const myVar = createVar();

const myStyle = style({
  vars: {
    [myVar]: 'purple'
  }
});
```

CSS

```css
.styles_myStyle__1hiof571 {
  --myVar__1hiof570: purple;
}
```

Show Output

## [Media Queries](#media-queries)

Unlike in regular CSS, Vanilla Extract lets you embed media queries **within** your style definitions using the `@media` key. This allows you to easily co-locate the responsive rules of a style into a single data-structure.

styles.css.ts

```tsx
import { style } from '@vanilla-extract/css';

const myStyle = style({
  '@media': {
    'screen and (min-width: 768px)': {
      padding: 10
    },
    '(prefers-reduced-motion)': {
      transitionProperty: 'color'
    }
  }
});
```

CSS

```css
@media screen and (min-width: 768px) {
  .styles_myStyle__1hiof570 {
    padding: 10px;
  }
}
@media (prefers-reduced-motion) {
  .styles_myStyle__1hiof570 {
    transition-property: color;
  }
}
```

Show Output

When processing your code into CSS, Vanilla Extract will always render your media queries **at the end of the file**. This means styles inside the `@media` key will always have higher precedence than other styles due to CSS rule order precedence.

> 🧠  When it’s safe to do so, Vanilla Extract will merge your `@media`, `@supports`, and `@container` condition blocks together to create the smallest possible CSS output.

## [Selectors](#selectors)

There are two methods of specifying selectors for a given style, simple pseudo selectors that can be used alongside all other CSS properties, and the `selectors` option which allows construction of more complex rules.

> 🧠  All selectors are not available for `globalStyle`. This API accepts a selector as its first parameter (e.g. `ul li:first-of-type, a > span`), merging selectors may produce unexpected results.

### [Simple Pseudo Selectors](#simple-pseudo-selectors)

Simple pseudo selectors are those that don’t take any parameters and therefore can be easily detected and statically typed. These can be used at the top level alongside the other [CSS properties](/documentation/styling/#css-properties) and can only contain [CSS Properties](/documentation/styling/#css-properties) and [CSS Variables](/documentation/styling/#css-variables).

styles.css.ts

```tsx
import { style } from '@vanilla-extract/css';

const myStyle = style({
  ':hover': {
    color: 'pink'
  },
  ':first-of-type': {
    color: 'blue'
  },
  '::before': {
    content: ''
  }
});
```

CSS

```css
.styles_myStyle__1hiof570:hover {
  color: pink;
}
.styles_myStyle__1hiof570:first-of-type {
  color: blue;
}
.styles_myStyle__1hiof570::before {
  content: "";
}
```

Show Output

### [Complex Selectors](#complex-selectors)

More complex rules can be written using the `selectors` key.

To improve maintainability, each style block can only target a single element. To enforce this, all selectors must target the `&` character which is a reference to the current element.

styles.css.ts

```tsx
import { style } from '@vanilla-extract/css';

const link = style({
  selectors: {
    '&:hover:not(:active)': {
      border: '2px solid aquamarine'
    },
    'nav li > &': {
      textDecoration: 'underline'
    }
  }
});
```

CSS

```css
.styles_link__1hiof570:hover:not(:active) {
  border: 2px solid aquamarine;
}
nav li > .styles_link__1hiof570 {
  text-decoration: underline;
}
```

Show Output

Selectors can also reference other scoped class names.

styles.css.ts

```tsx
import { style } from '@vanilla-extract/css';

export const parent = style({});

export const child = style({
  selectors: {
    [`${parent}:focus &`]: {
      background: '#fafafa'
    }
  }
});
```

CSS

```css
.styles_parent__1hiof570:focus .styles_child__1hiof571 {
  background: #fafafa;
}
```

Show Output

Invalid selectors are those attempting to target an element other than the current class.

styles.css.ts

``import { style } from '@vanilla-extract/css';  const invalid = style({   selectors: {     // ❌ ERROR: Targetting `a[href]`     '& a[href]': {...},      // ❌ ERROR: Targetting `.otherClass`     '& ~ div > .otherClass': {...}   } });``

If you want to target another scoped class then it should be defined within the style block of that class instead.

styles.css.ts

``import { style } from '@vanilla-extract/css';  // Invalid example: export const child = style({}); export const parent = style({   selectors: {     // ❌ ERROR: Targetting `child` from `parent`     [`& ${child}`]: {...}   } });  // Valid example: export const parent = style({}); export const child = style({   selectors: {     [`${parent} &`]: {...}   } });``

If you need to globally target child nodes within the current element (e.g. `'& a[href]'`), you should use [globalStyle](/documentation/global-api/global-style) instead.

styles.css.ts

```tsx
import { style, globalStyle } from '@vanilla-extract/css';

export const parent = style({});

globalStyle(`${parent} a[href]`, {
  color: 'pink'
});
```

CSS

```css
.styles_parent__1hiof570 a[href] {
  color: pink;
}
```

Show Output

### [Circular Selectors](#circular-selectors)

If your selectors are dependent on each other you can use [getters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) to define them:

styles.css.ts

```tsx
import { style } from '@vanilla-extract/css';

export const child = style({
  background: 'blue',
  get selectors() {
    return {
      [`${parent} &`]: {
        color: 'red'
      }
    };
  }
});

export const parent = style({
  background: 'yellow',
  selectors: {
    [`&:has(${child})`]: {
      padding: 10
    }
  }
});
```

CSS

```css
.styles_child__1hiof570 {
  background: blue;
}
.styles_parent__1hiof571 .styles_child__1hiof570 {
  color: red;
}
.styles_parent__1hiof571 {
  background: yellow;
}
.styles_parent__1hiof571:has(.styles_child__1hiof570) {
  padding: 10px;
}
```

Show Output

## [Container Queries](#container-queries)

Container queries work the same as [media queries](/documentation/styling/#media-queries) and are nested inside the `@container` key.

> 🚧  Ensure your target browsers [support container queries](https://caniuse.com/css-container-queries). Vanilla Extract supports the [container query syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries) but does not polyfill the feature in unsupported browsers.

styles.css.ts

```tsx
import { style } from '@vanilla-extract/css';

const myStyle = style({
  '@container': {
    '(min-width: 768px)': {
      padding: 10
    }
  }
});
```

CSS

```css
@container (min-width: 768px) {
  .styles_myStyle__1hiof570 {
    padding: 10px;
  }
}
```

Show Output

You can also create scoped containers using [createContainer](/documentation/api/create-container/).

styles.css.ts

```tsx
import {
  style,
  createContainer
} from '@vanilla-extract/css';

const sidebar = createContainer();

const myStyle = style({
  containerName: sidebar,
  '@container': {
    [`${sidebar} (min-width: 768px)`]: {
      padding: 10
    }
  }
});
```

CSS

```css
.styles_myStyle__1hiof571 {
  container-name: styles_sidebar__1hiof570;
}
@container styles_sidebar__1hiof570 (min-width: 768px) {
  .styles_myStyle__1hiof571 {
    padding: 10px;
  }
}
```

Show Output

## [Layers](#layers)

As with media queries above, Vanilla Extract lets you assign styles to [layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) by using the `@layer` key **within** your style definition.

> 🚧  Ensure your target browsers [support layers](https://caniuse.com/css-cascade-layers). Vanilla Extract supports the [layers syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) but does not polyfill the feature in unsupported browsers.

styles.css.ts

```tsx
import { style } from '@vanilla-extract/css';

const text = style({
  '@layer': {
    typography: {
      fontSize: '1rem'
    }
  }
});
```

CSS

```css
@layer typography;
@layer typography {
  .styles_text__1hiof570 {
    font-size: 1rem;
  }
}
```

Show Output

The `@layer` key also accepts a scoped layer reference, created via the [layer](/documentation/api/layer/) API.

styles.css.ts

```tsx
import { style, layer } from '@vanilla-extract/css';

const typography = layer();

const text = style({
  '@layer': {
    [typography]: {
      fontSize: '1rem'
    }
  }
});
```

CSS

```css
@layer styles_typography__1hiof570;
@layer styles_typography__1hiof570 {
  .styles_text__1hiof571 {
    font-size: 1rem;
  }
}
```

Show Output

To learn more about managing layers, check out the API documentation for [layer](/documentation/api/layer/) and [globalLayer](/documentation/global-api/global-layer/).

## [Supports Queries](#supports-queries)

Supports queries work the same as [Media queries](/documentation/styling/#media-queries) and are nested inside the `@supports` key.

styles.css.ts

```tsx
import { style } from '@vanilla-extract/css';

const myStyle = style({
  '@supports': {
    '(display: grid)': {
      display: 'grid'
    }
  }
});
```

CSS

```css
@supports (display: grid) {
  .styles_myStyle__1hiof570 {
    display: grid;
  }
}
```

Show Output

## [Fallback Styles](#fallback-styles)

When using CSS property values that don’t exist in some browsers, you’ll often declare the property twice and the older browser will ignore the value it doesn’t understand. This isn’t possible using JS objects as you can’t declare the same key twice. So instead, we use an array to define fallback values.

styles.css.ts

```tsx
import { style } from '@vanilla-extract/css';

export const myStyle = style({
  // In Firefox and IE the "overflow: overlay" will be
  // ignored and the "overflow: auto" will be applied
  overflow: ['auto', 'overlay']
});
```

CSS

```css
.styles_myStyle__1hiof570 {
  overflow: auto;
  overflow: overlay;
}
```

Show Output

[PreviousGetting Started](/documentation/getting-started/)

[NextTheming](/documentation/theming/)
