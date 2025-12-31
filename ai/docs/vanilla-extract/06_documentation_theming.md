# [Theming](#theming)

Themes are often thought of as global, application wide concepts. While vanilla-extract themes are great for that, they can also be used for more focussed, lower level use-cases. For example, a component being rendered in different color schemes.

Theming in vanilla-extract is really just a set of helpers on top of the scoped CSS variable creation provided by [createVar](/documentation/api/create-var).

To understand how it works, let’s take a look at an example.

theme.css.ts

```tsx
import { createTheme } from '@vanilla-extract/css';

export const [themeClass, vars] = createTheme({
  color: {
    brand: 'blue'
  },
  font: {
    body: 'arial'
  }
});
```

CSS

```css
.theme_themeClass__z05zdf0 {
  --color-brand__z05zdf1: blue;
  --font-body__z05zdf2: arial;
}
```

Show Output

Here we’ve called [createTheme](/documentation/api/create-theme/) with our theme implementation. Based on this, vanilla-extract will return two things:

-   **A class name:** a container class for the provided theme variables.
-   **A theme contract:** a typed data-structure of CSS variables, matching the shape of the provided theme implementation.

After processing this file, the resulting compiled JS will look something like this:

theme.js

`// Example result of the compiled JS import './theme.css';  export const vars = {   color: {     brand: 'var(--color-brand__l520oi1)'   },   font: {     body: 'var(--font-body__l520oi2)'   } };  export const themeClass = 'theme_themeClass__l520oi0';`

To create an alternative version of this theme, call [createTheme](/documentation/api/create-theme/) again. But this time pass the existing theme contract (i.e. `vars`), as well as the new values.

theme.css.ts

```tsx
import { createTheme } from '@vanilla-extract/css';

export const [themeClass, vars] = createTheme({
  color: {
    brand: 'blue'
  },
  font: {
    body: 'arial'
  }
});

export const otherThemeClass = createTheme(vars, {
  color: {
    brand: 'red'
  },
  font: {
    body: 'helvetica'
  }
});
```

CSS

```css
.theme_themeClass__z05zdf0 {
  --color-brand__z05zdf1: blue;
  --font-body__z05zdf2: arial;
}
.theme_otherThemeClass__z05zdf3 {
  --color-brand__z05zdf1: red;
  --font-body__z05zdf2: helvetica;
}
```

Show Output

By passing in an existing theme contract, instead of creating new CSS variables the existing ones are reused, but assigned to new values within a new CSS class.

On top of this, vanilla-extract knows the type of the existing theme contract and requires you implement it completely and correctly.

After processing the updated file, the resulting compiled JS will look something like this:

theme.js

`// Example result of the compiled JS import './theme.css';  export const vars = {   color: {     brand: 'var(--color-brand__l520oi1)'   },   font: {     body: 'var(--font-body__l520oi2)'   } };  export const themeClass = 'theme_themeClass__l520oi0';  export const otherThemeClass =   'theme_otherThemeClass__l520oi3';`

As can be observed, the only addition here is the reference to the new theme class name.

## [Code Splitting Themes](#code-splitting-themes)

While [createTheme](/documentation/api/create-theme/) makes getting started with a theme really easy, it has some trade-offs. It couples the definition of our theme contract to a specific theme implementation. It also means all your alternative themes must import the original theme to access the theme contract. This causes you to unintentionally import the original theme’s CSS as well, making it impossible to CSS code-split your themes.

This is where [createThemeContract](/documentation/api/create-theme/) comes in. Remember before when we said themes are comprised of a theme contract and a CSS class implementing the theme? Well [createThemeContract](/documentation/api/create-theme/) lets us define the contract without generating any CSS!

Implementing the above scenario with [createThemeContract](/documentation/api/create-theme/) would look something like the following:

contract.css.ts

```tsx
import { createThemeContract } from '@vanilla-extract/css';

export const vars = createThemeContract({
  color: {
    brand: ''
  },
  font: {
    body: ''
  }
});
```

CSS

No CSS created

Show Output

Based on this contract individual themes can now be created. Each theme will need to populate the contract in its entirety.

blueTheme.css.ts

redTheme.css.ts

contract.css.ts

```tsx
import { createTheme } from '@vanilla-extract/css';
import { vars } from './contract.css.ts';

export const blueThemeClass = createTheme(vars, {
  color: {
    brand: 'blue'
  },
  font: {
    body: 'arial'
  }
});
```

CSS

```css
.blueTheme_blueThemeClass__1gbye8p0 {
  --color-brand__dh589d0: blue;
  --font-body__dh589d1: arial;
}
```

Show Output

> 🧠  When creating a theme contract, the values of the input are ignored so you can pass an empty string, null, or real values. Whatever makes sense to you.

Now we have two themes implementing the same contract, but importing either one will only import their respective CSS!

## [Dynamic Theming](#dynamic-theming)

Sometimes theme values aren’t known until runtime. Theme contracts are a perfect fit for this situation as they are just collections of CSS variables. This means they can easily be set as inline styles while still retaining type safety.

We can use the [assignInlineVars](/documentation/packages/dynamic/#assigninlinevars) API from the [tiny](https://bundlephobia.com/package/@vanilla-extract/dynamic) `@vanilla-extract/dynamic` package to apply our theme contract at runtime.

> This example uses React, but [assignInlineVars](/documentation/packages/dynamic/#assigninlinevars) will work with any framework or vanilla JS.

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

This pattern opens up a lot of interesting possibilities. Type-safe runtime theming without the need for runtime creation and injection of CSS.

[PreviousStyling](/documentation/styling/)

[NextComposition](/documentation/style-composition/)
