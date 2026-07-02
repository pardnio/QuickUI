> Starting from version `0.6.0`, `PDQuickUI` has been renamed to `QuickUI`<br>
> The functionality remains the same, but with a more concise and memorable name.

## Install from npm

```bash
npm i @pardnchiu/quickui
```

## Include from CDN

### Directly include `QuickUI`
```html
<!-- Version 0.6.0 and above -->
<script src="https://cdn.jsdelivr.net/npm/@pardnchiu/quickui@[VERSION]/dist/QuickUI.js"></script>

<!-- Version 0.5.4 and below -->
<script src="https://cdn.jsdelivr.net/npm/pdquickui@[VERSION]/dist/PDQuickUI.js"></script>
```

### Module Version
```javascript
// Version 0.6.0 and above
import { QUI } from "https://cdn.jsdelivr.net/npm/@pardnchiu/quickui@[VERSION]/dist/QuickUI.esm.js";

// Version 0.5.4 and below
import { QUI } from "https://cdn.jsdelivr.net/npm/pdquickui@[VERSION]/dist/PDQuickUI.module.js";
```

## Usage

### Initialize `QUI`
```Javascript
const app = new QUI({
    id: "", // Specify rendering element
    data: {
        // Custom DATA
    },
    event: {
        // Custom EVENT
    },
    when: {
        before_render: function () {
            // Stop rendering
        },
        rendered: function () {
            // Rendered
        },
        before_update: function () {
            // Stop updating
        },
        updated: function () {
            // Updated
        },
        before_destroy: function () {
            // Stop destruction
        },
        destroyed: function () {
            // Destroyed
        }
    }
});
```
