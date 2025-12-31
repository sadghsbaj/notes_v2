# [createContainer](#createcontainer)

Creates a single scoped container name for use with [CSS Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries). This avoids potential naming collisions with other containers.

> 🚧  Ensure your target browsers [support container queries](https://caniuse.com/css-container-queries). Vanilla-extract supports the [container query syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries) but does not polyfill the feature in unsupported browsers.

sidebar.css.ts

navigation.css.ts

```tsx
import {
  style,
  createContainer
} from '@vanilla-extract/css';

export const sidebarContainer = createContainer();

export const sidebar = style({
  containerName: sidebarContainer,
  containerType: 'inline-size'
});
```

CSS

```css
.sidebar_sidebar__1xig7mo1 {
  container-name: sidebar_sidebarContainer__1xig7mo0;
  container-type: inline-size;
}
```

Show Output

[Previouskeyframes](/documentation/api/keyframes/)

[Nextlayer](/documentation/api/layer/)
