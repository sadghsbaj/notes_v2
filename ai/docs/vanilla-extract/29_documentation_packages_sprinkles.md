# [Sprinkles](#sprinkles)

A zero-runtime atomic CSS framework for vanilla-extract.

Generate a static set of custom utility classes and compose them either statically at build time, or dynamically at runtime, without the usual style generation overhead of CSS-in-JS.

Basically, it’s like building your own zero-runtime, type-safe version of [Tailwind](https://tailwindcss.com), [Styled System](https://github.com/styled-system/styled-system), etc.

> 💡 Sprinkles is an optional package built on top of vanilla-extract using its [function serialization API.](/documentation/api/add-function-serializer) It doesn’t have privileged access to vanilla-extract internals so you’re also free to build alternative implementations, e.g. [Rainbow Sprinkles.](https://github.com/wayfair/rainbow-sprinkles)

## [Setup](#setup)

`npm install @vanilla-extract/sprinkles`

Create a `sprinkles.css.ts` file, then configure and export your `sprinkles` function.

> 💡 This is just an example! Feel free to customise properties, values and conditions to match your requirements.

sprinkles.css.ts

```tsx
import {
  defineProperties,
  createSprinkles
} from '@vanilla-extract/sprinkles';

const space = {
  none: 0,
  small: '4px',
  medium: '8px',
  large: '16px'
  // etc.
};

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { '@media': 'screen and (min-width: 768px)' },
    desktop: { '@media': 'screen and (min-width: 1024px)' }
  },
  defaultCondition: 'mobile',
  properties: {
    display: ['none', 'flex', 'block', 'inline'],
    flexDirection: ['row', 'column'],
    justifyContent: [
      'stretch',
      'flex-start',
      'center',
      'flex-end',
      'space-around',
      'space-between'
    ],
    alignItems: [
      'stretch',
      'flex-start',
      'center',
      'flex-end'
    ],
    paddingTop: space,
    paddingBottom: space,
    paddingLeft: space,
    paddingRight: space
    // etc.
  },
  shorthands: {
    padding: [
      'paddingTop',
      'paddingBottom',
      'paddingLeft',
      'paddingRight'
    ],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    placeItems: ['justifyContent', 'alignItems']
  }
});

const colors = {
  'blue-50': '#eff6ff',
  'blue-100': '#dbeafe',
  'blue-200': '#bfdbfe',
  'gray-700': '#374151',
  'gray-800': '#1f2937',
  'gray-900': '#111827'
  // etc.
};

const colorProperties = defineProperties({
  conditions: {
    lightMode: {},
    darkMode: { '@media': '(prefers-color-scheme: dark)' }
  },
  defaultCondition: 'lightMode',
  properties: {
    color: colors,
    background: colors
    // etc.
  }
});

export const sprinkles = createSprinkles(
  responsiveProperties,
  colorProperties
);

// It's a good idea to export the Sprinkles type too
export type Sprinkles = Parameters<typeof sprinkles>[0];
```

CSS

```css
.sprinkles_display_none_mobile__i8ksq0 {
  display: none;
}
.sprinkles_display_flex_mobile__i8ksq3 {
  display: flex;
}
.sprinkles_display_block_mobile__i8ksq6 {
  display: block;
}
.sprinkles_display_inline_mobile__i8ksq9 {
  display: inline;
}
.sprinkles_flexDirection_row_mobile__i8ksqc {
  flex-direction: row;
}
.sprinkles_flexDirection_column_mobile__i8ksqf {
  flex-direction: column;
}
.sprinkles_justifyContent_stretch_mobile__i8ksqi {
  justify-content: stretch;
}
.sprinkles_justifyContent_flex-start_mobile__i8ksql {
  justify-content: flex-start;
}
.sprinkles_justifyContent_center_mobile__i8ksqo {
  justify-content: center;
}
.sprinkles_justifyContent_flex-end_mobile__i8ksqr {
  justify-content: flex-end;
}
.sprinkles_justifyContent_space-around_mobile__i8ksqu {
  justify-content: space-around;
}
.sprinkles_justifyContent_space-between_mobile__i8ksqx {
  justify-content: space-between;
}
.sprinkles_alignItems_stretch_mobile__i8ksq10 {
  align-items: stretch;
}
.sprinkles_alignItems_flex-start_mobile__i8ksq13 {
  align-items: flex-start;
}
.sprinkles_alignItems_center_mobile__i8ksq16 {
  align-items: center;
}
.sprinkles_alignItems_flex-end_mobile__i8ksq19 {
  align-items: flex-end;
}
.sprinkles_paddingTop_none_mobile__i8ksq1c {
  padding-top: 0;
}
.sprinkles_paddingTop_small_mobile__i8ksq1f {
  padding-top: 4px;
}
.sprinkles_paddingTop_medium_mobile__i8ksq1i {
  padding-top: 8px;
}
.sprinkles_paddingTop_large_mobile__i8ksq1l {
  padding-top: 16px;
}
.sprinkles_paddingBottom_none_mobile__i8ksq1o {
  padding-bottom: 0;
}
.sprinkles_paddingBottom_small_mobile__i8ksq1r {
  padding-bottom: 4px;
}
.sprinkles_paddingBottom_medium_mobile__i8ksq1u {
  padding-bottom: 8px;
}
.sprinkles_paddingBottom_large_mobile__i8ksq1x {
  padding-bottom: 16px;
}
.sprinkles_paddingLeft_none_mobile__i8ksq20 {
  padding-left: 0;
}
.sprinkles_paddingLeft_small_mobile__i8ksq23 {
  padding-left: 4px;
}
.sprinkles_paddingLeft_medium_mobile__i8ksq26 {
  padding-left: 8px;
}
.sprinkles_paddingLeft_large_mobile__i8ksq29 {
  padding-left: 16px;
}
.sprinkles_paddingRight_none_mobile__i8ksq2c {
  padding-right: 0;
}
.sprinkles_paddingRight_small_mobile__i8ksq2f {
  padding-right: 4px;
}
.sprinkles_paddingRight_medium_mobile__i8ksq2i {
  padding-right: 8px;
}
.sprinkles_paddingRight_large_mobile__i8ksq2l {
  padding-right: 16px;
}
.sprinkles_color_blue-50_lightMode__i8ksq2o {
  color: #eff6ff;
}
.sprinkles_color_blue-100_lightMode__i8ksq2q {
  color: #dbeafe;
}
.sprinkles_color_blue-200_lightMode__i8ksq2s {
  color: #bfdbfe;
}
.sprinkles_color_gray-700_lightMode__i8ksq2u {
  color: #374151;
}
.sprinkles_color_gray-800_lightMode__i8ksq2w {
  color: #1f2937;
}
.sprinkles_color_gray-900_lightMode__i8ksq2y {
  color: #111827;
}
.sprinkles_background_blue-50_lightMode__i8ksq30 {
  background: #eff6ff;
}
.sprinkles_background_blue-100_lightMode__i8ksq32 {
  background: #dbeafe;
}
.sprinkles_background_blue-200_lightMode__i8ksq34 {
  background: #bfdbfe;
}
.sprinkles_background_gray-700_lightMode__i8ksq36 {
  background: #374151;
}
.sprinkles_background_gray-800_lightMode__i8ksq38 {
  background: #1f2937;
}
.sprinkles_background_gray-900_lightMode__i8ksq3a {
  background: #111827;
}
@media screen and (min-width: 768px) {
  .sprinkles_display_none_tablet__i8ksq1 {
    display: none;
  }
  .sprinkles_display_flex_tablet__i8ksq4 {
    display: flex;
  }
  .sprinkles_display_block_tablet__i8ksq7 {
    display: block;
  }
  .sprinkles_display_inline_tablet__i8ksqa {
    display: inline;
  }
  .sprinkles_flexDirection_row_tablet__i8ksqd {
    flex-direction: row;
  }
  .sprinkles_flexDirection_column_tablet__i8ksqg {
    flex-direction: column;
  }
  .sprinkles_justifyContent_stretch_tablet__i8ksqj {
    justify-content: stretch;
  }
  .sprinkles_justifyContent_flex-start_tablet__i8ksqm {
    justify-content: flex-start;
  }
  .sprinkles_justifyContent_center_tablet__i8ksqp {
    justify-content: center;
  }
  .sprinkles_justifyContent_flex-end_tablet__i8ksqs {
    justify-content: flex-end;
  }
  .sprinkles_justifyContent_space-around_tablet__i8ksqv {
    justify-content: space-around;
  }
  .sprinkles_justifyContent_space-between_tablet__i8ksqy {
    justify-content: space-between;
  }
  .sprinkles_alignItems_stretch_tablet__i8ksq11 {
    align-items: stretch;
  }
  .sprinkles_alignItems_flex-start_tablet__i8ksq14 {
    align-items: flex-start;
  }
  .sprinkles_alignItems_center_tablet__i8ksq17 {
    align-items: center;
  }
  .sprinkles_alignItems_flex-end_tablet__i8ksq1a {
    align-items: flex-end;
  }
  .sprinkles_paddingTop_none_tablet__i8ksq1d {
    padding-top: 0;
  }
  .sprinkles_paddingTop_small_tablet__i8ksq1g {
    padding-top: 4px;
  }
  .sprinkles_paddingTop_medium_tablet__i8ksq1j {
    padding-top: 8px;
  }
  .sprinkles_paddingTop_large_tablet__i8ksq1m {
    padding-top: 16px;
  }
  .sprinkles_paddingBottom_none_tablet__i8ksq1p {
    padding-bottom: 0;
  }
  .sprinkles_paddingBottom_small_tablet__i8ksq1s {
    padding-bottom: 4px;
  }
  .sprinkles_paddingBottom_medium_tablet__i8ksq1v {
    padding-bottom: 8px;
  }
  .sprinkles_paddingBottom_large_tablet__i8ksq1y {
    padding-bottom: 16px;
  }
  .sprinkles_paddingLeft_none_tablet__i8ksq21 {
    padding-left: 0;
  }
  .sprinkles_paddingLeft_small_tablet__i8ksq24 {
    padding-left: 4px;
  }
  .sprinkles_paddingLeft_medium_tablet__i8ksq27 {
    padding-left: 8px;
  }
  .sprinkles_paddingLeft_large_tablet__i8ksq2a {
    padding-left: 16px;
  }
  .sprinkles_paddingRight_none_tablet__i8ksq2d {
    padding-right: 0;
  }
  .sprinkles_paddingRight_small_tablet__i8ksq2g {
    padding-right: 4px;
  }
  .sprinkles_paddingRight_medium_tablet__i8ksq2j {
    padding-right: 8px;
  }
  .sprinkles_paddingRight_large_tablet__i8ksq2m {
    padding-right: 16px;
  }
}
@media screen and (min-width: 1024px) {
  .sprinkles_display_none_desktop__i8ksq2 {
    display: none;
  }
  .sprinkles_display_flex_desktop__i8ksq5 {
    display: flex;
  }
  .sprinkles_display_block_desktop__i8ksq8 {
    display: block;
  }
  .sprinkles_display_inline_desktop__i8ksqb {
    display: inline;
  }
  .sprinkles_flexDirection_row_desktop__i8ksqe {
    flex-direction: row;
  }
  .sprinkles_flexDirection_column_desktop__i8ksqh {
    flex-direction: column;
  }
  .sprinkles_justifyContent_stretch_desktop__i8ksqk {
    justify-content: stretch;
  }
  .sprinkles_justifyContent_flex-start_desktop__i8ksqn {
    justify-content: flex-start;
  }
  .sprinkles_justifyContent_center_desktop__i8ksqq {
    justify-content: center;
  }
  .sprinkles_justifyContent_flex-end_desktop__i8ksqt {
    justify-content: flex-end;
  }
  .sprinkles_justifyContent_space-around_desktop__i8ksqw {
    justify-content: space-around;
  }
  .sprinkles_justifyContent_space-between_desktop__i8ksqz {
    justify-content: space-between;
  }
  .sprinkles_alignItems_stretch_desktop__i8ksq12 {
    align-items: stretch;
  }
  .sprinkles_alignItems_flex-start_desktop__i8ksq15 {
    align-items: flex-start;
  }
  .sprinkles_alignItems_center_desktop__i8ksq18 {
    align-items: center;
  }
  .sprinkles_alignItems_flex-end_desktop__i8ksq1b {
    align-items: flex-end;
  }
  .sprinkles_paddingTop_none_desktop__i8ksq1e {
    padding-top: 0;
  }
  .sprinkles_paddingTop_small_desktop__i8ksq1h {
    padding-top: 4px;
  }
  .sprinkles_paddingTop_medium_desktop__i8ksq1k {
    padding-top: 8px;
  }
  .sprinkles_paddingTop_large_desktop__i8ksq1n {
    padding-top: 16px;
  }
  .sprinkles_paddingBottom_none_desktop__i8ksq1q {
    padding-bottom: 0;
  }
  .sprinkles_paddingBottom_small_desktop__i8ksq1t {
    padding-bottom: 4px;
  }
  .sprinkles_paddingBottom_medium_desktop__i8ksq1w {
    padding-bottom: 8px;
  }
  .sprinkles_paddingBottom_large_desktop__i8ksq1z {
    padding-bottom: 16px;
  }
  .sprinkles_paddingLeft_none_desktop__i8ksq22 {
    padding-left: 0;
  }
  .sprinkles_paddingLeft_small_desktop__i8ksq25 {
    padding-left: 4px;
  }
  .sprinkles_paddingLeft_medium_desktop__i8ksq28 {
    padding-left: 8px;
  }
  .sprinkles_paddingLeft_large_desktop__i8ksq2b {
    padding-left: 16px;
  }
  .sprinkles_paddingRight_none_desktop__i8ksq2e {
    padding-right: 0;
  }
  .sprinkles_paddingRight_small_desktop__i8ksq2h {
    padding-right: 4px;
  }
  .sprinkles_paddingRight_medium_desktop__i8ksq2k {
    padding-right: 8px;
  }
  .sprinkles_paddingRight_large_desktop__i8ksq2n {
    padding-right: 16px;
  }
}
@media (prefers-color-scheme: dark) {
  .sprinkles_color_blue-50_darkMode__i8ksq2p {
    color: #eff6ff;
  }
  .sprinkles_color_blue-100_darkMode__i8ksq2r {
    color: #dbeafe;
  }
  .sprinkles_color_blue-200_darkMode__i8ksq2t {
    color: #bfdbfe;
  }
  .sprinkles_color_gray-700_darkMode__i8ksq2v {
    color: #374151;
  }
  .sprinkles_color_gray-800_darkMode__i8ksq2x {
    color: #1f2937;
  }
  .sprinkles_color_gray-900_darkMode__i8ksq2z {
    color: #111827;
  }
  .sprinkles_background_blue-50_darkMode__i8ksq31 {
    background: #eff6ff;
  }
  .sprinkles_background_blue-100_darkMode__i8ksq33 {
    background: #dbeafe;
  }
  .sprinkles_background_blue-200_darkMode__i8ksq35 {
    background: #bfdbfe;
  }
  .sprinkles_background_gray-700_darkMode__i8ksq37 {
    background: #374151;
  }
  .sprinkles_background_gray-800_darkMode__i8ksq39 {
    background: #1f2937;
  }
  .sprinkles_background_gray-900_darkMode__i8ksq3b {
    background: #111827;
  }
}
```

Show Output

## [Usage](#usage)

You can use your `sprinkles` function in `.css.ts` files for zero-runtime usage.

styles.css.ts

`import { sprinkles } from './sprinkles.css.ts';  export const container = sprinkles({   display: 'flex',   paddingX: 'small',    // Conditional sprinkles:   flexDirection: {     mobile: 'column',     desktop: 'row'   },   background: {     lightMode: 'blue-50',     darkMode: 'gray-700'   } });`

If you want, you can even use your `sprinkles` function at runtime! 🏃‍♂️

app.ts

``import { sprinkles } from './sprinkles.css.ts';  const flexDirection =   Math.random() > 0.5 ? 'column' : 'row';  document.write(`   <section class="${sprinkles({     display: 'flex',     flexDirection   })}">     ...   </section> `);``

> 💡 Although you don’t need to use this library at runtime, it’s designed to be as small and performant as possible. The runtime is only used to look up pre-existing class names. All styles are still generated at build time!

Within `.css.ts` files, combine with any custom styles by providing an array to vanilla-extract’s [style](/documentation/api/style) function.

styles.css.ts

`import { style } from '@vanilla-extract/css'; import { sprinkles } from './sprinkles.css.ts';  export const container = style([   sprinkles({     display: 'flex',     padding: 'small'   }),   {     ':hover': {       outline: '2px solid currentColor'     }   } ]);`

Sprinkles uses this internally, which means that a class list returned by `sprinkles` can be treated as if it were a single class within vanilla-extract selectors.

styles.css.ts

``import { globalStyle } from '@vanilla-extract/css'; import { sprinkles } from './sprinkles.css.ts';  export const container = sprinkles({   padding: 'small' });  globalStyle(`${container} *`, {   boxSizing: 'border-box' });``

## [defineProperties](#defineproperties)

Defines a collection of utility classes with [properties](/documentation/packages/sprinkles/#properties), [conditions](/documentation/packages/sprinkles/#conditions) and [shorthands.](/documentation/packages/sprinkles/#shorthands)

If you need to scope different conditions to different properties (e.g. some properties support breakpoints, some support light mode and dark mode, some are unconditional), you can provide as many collections of properties to [createSprinkles](/documentation/packages/sprinkles/#createsprinkles) as you like.

sprinkles.css.ts

`import {   defineProperties,   createSprinkles } from '@vanilla-extract/sprinkles';  const space = {   none: 0,   small: '4px',   medium: '8px',   large: '16px' };  const colors = {   blue50: '#eff6ff',   blue100: '#dbeafe',   blue200: '#bfdbfe'   // etc. };  const responsiveProperties = defineProperties({   conditions: {     mobile: {},     tablet: { '@media': 'screen and (min-width: 768px)' },     desktop: { '@media': 'screen and (min-width: 1024px)' }   },   defaultCondition: 'mobile',   properties: {     display: ['none', 'block', 'flex'],     flexDirection: ['row', 'column'],     padding: space     // etc.   } });  const colorProperties = defineProperties({   conditions: {     lightMode: {       '@media': '(prefers-color-scheme: light)'     },     darkMode: { '@media': '(prefers-color-scheme: dark)' }   },   defaultCondition: false,   properties: {     color: colors,     background: colors   }   // etc. });  export const sprinkles = createSprinkles(   responsiveProperties,   colorProperties );`

> 💡 If you want a good color palette to work with, you might want to consider importing [tailwindcss/colors](https://tailwindcss.com/docs/customizing-colors#color-palette-reference).

### [properties](#properties)

Define which CSS properties and values should be available.

For simple mappings (i.e. valid CSS values), values can be provided as an array.

sprinkles.css.ts

`import { defineProperties } from '@vanilla-extract/sprinkles';  const responsiveProperties = defineProperties({   properties: {     display: ['none', 'block', 'flex'],     flexDirection: ['row', 'column'],     alignItems: [       'stretch',       'flex-start',       'center',       'flex-end'     ],     justifyContent: [       'stretch',       'flex-start',       'center',       'flex-end'     ]     // etc.   } });`

For semantic mappings (e.g. space scales, color palettes), values can be provided as an object.

sprinkles.css.ts

`import { defineProperties } from '@vanilla-extract/sprinkles';  const responsiveProperties = defineProperties({   properties: {     gap: {       none: 0,       small: 4,       medium: 8,       large: 16     }     // etc.   } });`

You can also use [vanilla-extract themes](/documentation/theming) to configure themed values.

sprinkles.css.ts

`import { defineProperties } from '@vanilla-extract/sprinkles'; import { vars } from './vars.css.ts';  const responsiveProperties = defineProperties({   properties: {     gap: vars.space     // etc.   } });`

For more complicated scenarios, values can even be entire style objects. This works especially well when combined with CSS Variables.

> 💡 Styles are created in the order that they were defined in your config. Properties that are less specific should be higher in the list.

sprinkles.css.ts

``import { createVar } from '@vanilla-extract/css'; import { defineProperties } from '@vanilla-extract/sprinkles';  const alpha = createVar();  const responsiveProperties = defineProperties({   properties: {     background: {       red: {         vars: { [alpha]: '1' },         background: `rgba(255, 0, 0, ${alpha})`       }     },     backgroundOpacity: {       1: { vars: { [alpha]: '1' } },       0.1: { vars: { [alpha]: '0.1' } }     }     // etc.   } });``

### [shorthands](#shorthands)

Maps custom shorthand properties to multiple underlying CSS properties. This is useful for mapping values like `padding`/`paddingX`/`paddingY` to their underlying longhand values.

> 💡 Shorthands are evaluated in the order that they were defined in your configuration. Shorthands that are less specific should be higher in the list, e.g. `padding` should come before `paddingX`/`paddingY`.

sprinkles.css.ts

`import { defineProperties } from '@vanilla-extract/sprinkles'; import { vars } from './vars.css.ts';  const responsiveProperties = defineProperties({   properties: {     paddingTop: vars.space,     paddingBottom: vars.space,     paddingLeft: vars.space,     paddingRight: vars.space   },   shorthands: {     padding: [       'paddingTop',       'paddingBottom',       'paddingLeft',       'paddingRight'     ],     paddingX: ['paddingLeft', 'paddingRight'],     paddingY: ['paddingTop', 'paddingBottom']   } });`

### [conditions](#conditions)

Define a set of media/feature/container queries for the provided properties.

For example, properties can be scoped to media queries.

sprinkles.css.ts

`import { defineProperties } from '@vanilla-extract/sprinkles';  const responsiveProperties = defineProperties({   conditions: {     mobile: {},     tablet: { '@media': 'screen and (min-width: 768px)' },     desktop: { '@media': 'screen and (min-width: 1024px)' }   },   defaultCondition: 'mobile'   // etc. });`

Properties can also be scoped to selectors.

sprinkles.css.ts

`import { defineProperties } from '@vanilla-extract/sprinkles';  const properties = defineProperties({   conditions: {     default: {},     hover: { selector: '&:hover' },     focus: { selector: '&:focus' }   },   defaultCondition: 'default'   // etc. });`

Properties can also be scoped to container queries.

> 🚧  Ensure your target browsers [support container queries](https://caniuse.com/css-container-queries). Vanilla-extract supports the [container query syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries) but does not polyfill the feature in unsupported browsers.

sprinkles.css.ts

``import {   createContainer,   style } from '@vanilla-extract/css'; import { defineProperties } from '@vanilla-extract/sprinkles';  const containerName = createContainer();  export const container = style({   containerName,   containerType: 'size' });  const containerProperties = defineProperties({   conditions: {     small: {},     medium: {       '@container': `${containerName} (min-width: 768px)`     },     large: {       '@container': `${containerName} (min-width: 1024px)`     }   },   defaultCondition: 'small'   // etc. });``

### [defaultCondition](#defaultcondition)

Defines which condition(s) should be used when a non-conditional value is requested, e.g. `sprinkles({ display: 'flex' })`.

If you’re using mobile-first responsive conditions, this should be your lowest breakpoint.

sprinkles.css.ts

`import { defineProperties } from '@vanilla-extract/sprinkles';  const responsiveProperties = defineProperties({   conditions: {     mobile: {},     tablet: { '@media': 'screen and (min-width: 768px)' },     desktop: { '@media': 'screen and (min-width: 1024px)' }   },   defaultCondition: 'mobile'   // etc. });`

If your conditions are mutually exclusive (e.g. light mode and dark mode), you can provide an array of default conditions. For example, the following configuration would automatically expand `sprinkles({ background: 'white' })` to the equivalent of `sprinkles({ background: { lightMode: 'white', darkMode: 'white' }})`.

sprinkles.css.ts

`import { defineProperties } from '@vanilla-extract/sprinkles';  const responsiveProperties = defineProperties({   conditions: {     lightMode: {       '@media': '(prefers-color-scheme: light)'     },     darkMode: { '@media': '(prefers-color-scheme: dark)' }   },   defaultCondition: ['lightMode', 'darkMode']   // etc. });`

You can also set `defaultCondition` to `false`, which forces you to be explicit about which conditions you’re targeting.

sprinkles.css.ts

`import { defineProperties } from '@vanilla-extract/sprinkles';  const responsiveProperties = defineProperties({   conditions: {     lightMode: {       '@media': '(prefers-color-scheme: light)'     },     darkMode: { '@media': '(prefers-color-scheme: dark)' }   },   defaultCondition: false   // etc. });`

### [responsiveArray](#responsivearray)

Providing an array of condition names enables the responsive array notation (e.g. `['column', 'row']`) by defining the order of conditions.

sprinkles.css.ts

`import { defineProperties } from '@vanilla-extract/sprinkles';  const responsiveProperties = defineProperties({   conditions: {     mobile: {},     tablet: { '@media': 'screen and (min-width: 768px)' },     desktop: { '@media': 'screen and (min-width: 1024px)' }   },   defaultCondition: 'mobile',   responsiveArray: ['mobile', 'tablet', 'desktop']   // etc. });`

### [@layer](#layer)

Optionally defines a layer to assign styles to for a given set of properties.

> 🚧  Ensure your target browsers [support layers](https://caniuse.com/css-cascade-layers). Vanilla Extract supports the [layers syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) but does not polyfill the feature in unsupported browsers.

sprinkles.css.ts

`import { defineProperties } from '@vanilla-extract/sprinkles'; import { layer } from '@vanilla-extract/css';  export const sprinklesLayer = layer();  const properties = defineProperties({   '@layer': sprinklesLayer   // etc. });`

## [createSprinkles](#createsprinkles)

Creates a type-safe function for accessing your [defined properties](/documentation/packages/sprinkles/#defineProperties). You can provide as many collections of properties as you like.

> 🚧  Ensure properties are defined as variables before passing them into `createSprinkles`. Calling `defineProperties` inside a `createSprinkles` call will cause types to be inferred incorrectly, resulting in a type-unsafe sprinkles function.

sprinkles.css.ts

`import {   defineProperties,   createSprinkles } from '@vanilla-extract/sprinkles';  const responsiveProperties = defineProperties({   /* ... */ }); const unconditionalProperties = defineProperties({   /* ... */ }); const colorProperties = defineProperties({   /* ... */ });  export const sprinkles = createSprinkles(   responsiveProperties,   unconditionalProperties,   colorProperties );`

The sprinkles function also exposes a static `properties` key that lets you check whether a given property can be handled by the function.

`sprinkles.properties.has('paddingX'); // -> boolean`

> 💡 This is useful when building a Box component with sprinkles available at the top level (e.g. `<Box padding="small">`) since you’ll need some way to filter sprinkle props from non-sprinkle props.

## [createMapValueFn](#createmapvaluefn)

Creates a function for mapping over conditional values.

> 💡 This is useful for converting high-level prop values to low-level sprinkles, e.g. converting left/right to flex-start/end.

This function should be created and exported from your `sprinkles.css.ts` file using the conditions from your defined properties.

You can name the generated function whatever you like, typically based on the name of your conditions.

sprinkles.css.ts

`import {   defineProperties,   createSprinkles,   createMapValueFn } from '@vanilla-extract/sprinkles';  const responsiveProperties = defineProperties({   /* ... */ });  export const sprinkles = createSprinkles(   responsiveProperties ); export const mapResponsiveValue = createMapValueFn(   responsiveProperties );`

You can then import the generated function in your app code.

app.ts

`import { mapResponsiveValue } from './sprinkles.css.ts';  const alignToFlexAlign = {   left: 'flex-start',   center: 'center',   right: 'flex-end',   stretch: 'stretch' } as const;  mapResponsiveValue(   'left',   (value) => alignToFlexAlign[value] ); // -> 'flex-start'  mapResponsiveValue(   {     mobile: 'center',     desktop: 'left'   } as const,   (value) => alignToFlexAlign[value] ); // -> { mobile: 'center', desktop: 'flex-start' }  mapResponsiveValue(   ['center', null, 'left'] as const,   (value) => alignToFlexAlign[value] ); // -> { mobile: 'center', desktop: 'flex-start' }`

> 💡 You can generate a custom conditional value type with the [ConditionalValue](/documentation/packages/sprinkles/#conditionalvalue) type.

## [createNormalizeValueFn](#createnormalizevaluefn)

Creates a function for normalizing conditional values into a consistent object structure. Any primitive values or responsive arrays will be converted to conditional objects.

This function should be created and exported from your `sprinkles.css.ts` file using the conditions from your defined properties.

> 💡 You can name the generated function whatever you like, typically based on the name of your conditions.

sprinkles.css.ts

`import {   defineProperties,   createSprinkles,   createNormalizeValueFn } from '@vanilla-extract/sprinkles';  const responsiveProperties = defineProperties({   /* ... */ });  export const sprinkles = createSprinkles(   responsiveProperties ); export const normalizeResponsiveValue =   createNormalizeValueFn(responsiveProperties);`

You can then import the generated function in your app code.

app.ts

`import { normalizeResponsiveValue } from './sprinkles.css.ts';  normalizeResponsiveValue('block'); // -> { mobile: 'block' }  normalizeResponsiveValue(['none', null, 'block']); // -> { mobile: 'none', desktop: 'block' }  normalizeResponsiveValue({   mobile: 'none',   desktop: 'block' }); // -> { mobile: 'none', desktop: 'block' }`

## [ConditionalValue](#conditionalvalue)

Creates a custom conditional value type.

> 💡 This is useful for typing high-level prop values that are [mapped to low-level sprinkles](/documentation/packages/sprinkles/#createmapvaluefn), e.g. supporting left/right prop values that map to flex-start/end.

This type should be created and exported from your `sprinkles.css.ts` file using the conditions from your defined properties.

> 💡 You can name the generated type whatever you like, typically based on the name of your conditions.

sprinkles.css.ts

`import {   defineProperties,   ConditionalValue } from '@vanilla-extract/sprinkles';  const responsiveProperties = defineProperties({   /* ... */ });  export type ResponsiveValue<Value extends string | number> =   ConditionalValue<typeof responsiveProperties, Value>;`

You can then import the generated type in your app code.

app.ts

`import { ResponsiveValue } from './sprinkles.css.ts';  type ResponsiveAlign = ResponsiveValue<   'left' | 'center' | 'right' >;  const a: ResponsiveAlign = 'left'; const b: ResponsiveAlign = {   mobile: 'center',   desktop: 'left' }; const c: ResponsiveAlign = ['center', null, 'left'];`

## [RequiredConditionalValue](#requiredconditionalvalue)

Same as [ConditionalValue](/documentation/packages/sprinkles/#conditionalvalue) except the default condition is required. For example, if your default condition was `'mobile'`, then a conditional value of `{ desktop: '...' }` would be a type error.

sprinkles.css.ts

`import {   defineProperties,   RequiredConditionalValue } from '@vanilla-extract/sprinkles';  const responsiveProperties = defineProperties({   defaultCondition: 'mobile'   // etc. });  export type RequiredResponsiveValue<   Value extends string | number > = RequiredConditionalValue<   typeof responsiveProperties,   Value >;`

You can then import the generated type in your app code.

app.ts

`import { RequiredResponsiveValue } from './sprinkles.css.ts';  type ResponsiveAlign = RequiredResponsiveValue<   'left' | 'center' | 'right' >;  const a: ResponsiveAlign = 'left'; const b: ResponsiveAlign = {   mobile: 'center',   desktop: 'left' }; const c: ResponsiveAlign = ['center', null, 'left'];  // Type errors: const d: ResponsiveAlign = [null, 'center']; const e: ResponsiveAlign = { desktop: 'center' };`

[PreviousglobalLayer](/documentation/global-api/global-layer/)

[NextRecipes](/documentation/packages/recipes/)
