# [Dynamic](#dynamic)

A tiny ([< 1kB compressed](https://bundlephobia.com/package/@vanilla-extract/dynamic@2.0.2)) runtime for performing dynamic updates to scoped theme variables.

`npm install @vanilla-extract/dynamic`

## [assignInlineVars](#assigninlinevars)

Allows variables to be assigned dynamically that have been created using vanilla-extract APIs, e.g. `createVar`, `createTheme`, etc.

As these APIs produce variable references that contain the CSS var function, e.g. `var(--brandColor__8uideo0)`, it is necessary to remove the wrapping function when setting its value.

Variables with a value of `null` or `undefined` will be omitted from the resulting inline style.

> 🧠  `null` and `undefined` values can only be passed to `assignInlineVars` if a theme contract is not provided

app.tsx

styles.css.ts

```tsx
import { assignInlineVars } from '@vanilla-extract/dynamic';
import {
  container,
  brandColor,
  textColor
} from './styles.css.ts';

// If `tone` is `undefined`, the following inline style becomes:
// { '--brandColor__8uideo0': 'pink' }

const MyComponent = ({ tone }: { tone?: critical }) => (
  <section
    className={container}
    style={assignInlineVars({
      [brandColor]: 'pink',
      [textColor]: tone === 'critical' ? 'red' : null
    })}
  >
    ...
  </section>
);
```

Even though this function returns an object of inline styles, it implements the `toString` method, returning a valid `style` attribute value so that it can be used in string templates.

app.ts

``import { assignInlineVars } from '@vanilla-extract/dynamic'; import { container, brandColor } from './styles.css.ts';  // The following inline style becomes: // "--brandColor__8uideo0: pink;"  document.write(`   <section     class="${container}"     style="${assignInlineVars({ [brandColor]: 'pink' })}"   >     ...   </section> `);``

### [Assigning theme contracts dynamically](#assigning-theme-contracts-dynamically)

[Theme contracts](/documentation/theming/) can also be assigned dynamically by passing one as the first argument. All variables must be assigned or it’s a type error.

This API makes the concept of dynamic theming much simpler.

app.tsx

theme.css.ts

```tsx
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { container, themeVars } from './theme.css.ts';

interface ContainerProps {
  brandColor: string;
  fontFamily: string;
}
const Container = ({
  brandColor,
  fontFamily
}: ContainerProps) => (
  <section
    className={container}
    style={assignInlineVars(themeVars, {
      color: { brand: brandColor },
      font: { body: fontFamily }
    })}
  >
    ...
  </section>
);

const App = () => (
  <Container brandColor="pink" fontFamily="Arial">
    ...
  </Container>
);
```

## [setElementVars](#setelementvars)

An imperative API, allowing variables created using vanilla-extract APIs, e.g. `createVar`, `createTheme`, etc, to be assigned dynamically on a DOM element.

Variables with a value of `null` or `undefined` will not be assigned a value.

> 🧠  `null` and `undefined` values can only be passed to `setElementVars` if a theme contract is not provided

app.ts

styles.css.ts

```tsx
import { setElementVars } from '@vanilla-extract/dynamic';
import { brandColor, textColor } from './styles.css.ts';

const el = document.getElementById('myElement');

setElementVars(el, {
  [brandColor]: 'pink',
  [textColor]: null
});
```

### [Setting theme contracts dynamically](#setting-theme-contracts-dynamically)

[Theme contracts](/documentation/theming/) can also be set dynamically by passing one as the second argument. All variables must be assigned or it’s a type error.

app.ts

theme.css.ts

```tsx
import { setElementVars } from '@vanilla-extract/dynamic';
import { themeVars } from './theme.css.ts';

const el = document.getElementById('myElement');

setElementVars(el, themeVars, {
  color: { brand: 'pink' },
  font: { body: 'Arial' }
});
```

[PreviousRecipes](/documentation/packages/recipes/)

[NextCSS Utils](/documentation/packages/css-utils/)
