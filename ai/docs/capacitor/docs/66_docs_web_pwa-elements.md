Version: v8

On this page

# PWA Elements

Some Capacitor plugins, such as `Camera` or `Toast`, have web-based UI available when not running natively. For example, calling `Camera.getPhoto()` will load a responsive photo-taking experience when running on the web:

![PWA Elements](/docs/assets/images/pwa-elements-83772729c23c280653593cc5f28d543b.png)

This UI is implemented using web components. Due to the elements being encapsulated by the [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM), these components should not conflict with your own UI.

## Installation[​](#installation "Direct link to Installation")

To enable these controls, you must add `@ionic/pwa-elements` to your app.

A typical installation involves importing the package and registering the elements, or adding a script tag to the `<head>` of the `index.html` for your app:

#### Importing PWA Elements[​](#importing-pwa-elements "Direct link to Importing PWA Elements")

```
npm install @ionic/pwa-elements
```

Then, depending on your framework of choice, import the element loader and call it at the correct time:

##### React[​](#react "Direct link to React")

`main.tsx` or `index.tsx` or `index.js`:

```
import { defineCustomElements } from '@ionic/pwa-elements/loader';// Call the element loader before the render calldefineCustomElements(window);
```

##### Vue[​](#vue "Direct link to Vue")

`main.ts`:

```
// Above the createApp() lineimport { defineCustomElements } from '@ionic/pwa-elements/loader';defineCustomElements(window);
```

##### Angular[​](#angular "Direct link to Angular")

`main.ts`:

```
import { defineCustomElements } from '@ionic/pwa-elements/loader';// Call the element loader before the bootstrapModule/bootstrapApplication calldefineCustomElements(window);if (environment.production) {  enableProdMode();}
```

#### Including through script tag[​](#including-through-script-tag "Direct link to Including through script tag")

PWA Elements can be included through a script tag in your `index.html`. However, keep in mind this will not work for offline scenarios:

```
<script  type="module"  src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.esm.js"></script><script  nomodule  src="https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.js"></script>
```
