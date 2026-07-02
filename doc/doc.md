# QuickUI - Documentation

> Back to [README](../README.md)

## Prerequisites

- A modern browser (ES6+, `Proxy`, `MutationObserver` support)
- Node.js ≥ 18 (only required for building from source)

## Installation

### Via npm

```bash
npm i @pardnchiu/quickui
```

### Via CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@pardnchiu/quickui@latest/dist/QuickUI.js"></script>
```

### ESM

```javascript
import { QUI } from "@pardnchiu/quickui/dist/QuickUI.esm.js";
```

### From Source

```bash
git clone https://github.com/pardnio/QuickUI.git
cd QuickUI
npm install
npm run build:once
```

## Usage

### Basic

Create a QUI instance and bind data:

```html
<div id="app">
  <h1>{{ title }}</h1>
  <p>{{ description }}</p>
</div>

<script>
  const app = new QUI({
    id: "app",
    data: {
      title: "Hello QuickUI",
      description: "A lightweight frontend framework",
    },
  });
</script>
```

### Conditional Rendering

Control element visibility with `:if`, `:else-if`, `:else`:

```html
<div id="app">
  <p :if="status == active">Active</p>
  <p :else-if="status == pending">Pending</p>
  <p :else>Disabled</p>
</div>

<script>
  const app = new QUI({
    id: "app",
    data: {
      status: "active",
    },
  });
</script>
```

### Loop Rendering

Iterate arrays or objects with `:for`:

```html
<div id="app">
  <!-- Array iteration -->
  <ul>
    <li :for="item in items">{{ item }}</li>
  </ul>

  <!-- Object iteration (with key) -->
  <ul>
    <li :for="(key, value) in user">{{ key }}: {{ value }}</li>
  </ul>
</div>

<script>
  const app = new QUI({
    id: "app",
    data: {
      items: ["Item A", "Item B", "Item C"],
      user: { name: "Pardn", role: "Developer" },
    },
  });
</script>
```

### Event Binding

Bind DOM events with the `@event` syntax:

```html
<div id="app">
  <button @click="handleClick">Click</button>
  <input type="text" @input="handleInput" />
</div>

<script>
  const app = new QUI({
    id: "app",
    data: {
      message: "",
    },
    event: {
      handleClick: (e) => {
        console.log("clicked");
      },
      handleInput: (e) => {
        app.data.message = e.target.value;
      },
    },
  });
</script>
```

### Two-way Binding

Keep form elements in sync with data using `:model`:

```html
<div id="app">
  <input type="text" :model="username" />
  <p>Hello, {{ username }}</p>
</div>

<script>
  const app = new QUI({
    id: "app",
    data: {
      username: "",
    },
  });
</script>
```

### i18n

Switch languages via JSON locale files and the `i18n.key` syntax:

```html
<div id="app">
  <h1>{{ i18n.title }}</h1>
  <button @click="switchLang">Switch Language</button>
</div>

<script>
  const app = new QUI({
    id: "app",
    i18n: {
      zh: { title: "歡迎" },
      en: { title: "Welcome" },
    },
    i18nLang: "zh",
    data: {},
    event: {
      switchLang: () => {
        app.lang("en");
      },
    },
  });
</script>
```

### Block Insertion

Dynamically load and insert an external HTML file with `<temp :path="...">`:

```html
<temp :path="/components/header.html"></temp>
```

### Lazy Loading

Defer image loading until it enters the viewport with `:lazyload`:

```html
<img :lazyload="imageUrl" />
```

### Lifecycle

Define lifecycle hooks with `when`:

```html
<script>
  const app = new QUI({
    id: "app",
    data: {},
    when: {
      beforeRender: () => {
        console.log("before render");
      },
      rendered: () => {
        console.log("rendered");
      },
      beforeUpdate: () => {
        console.log("before update");
      },
      updated: () => {
        console.log("updated");
      },
      beforeDestroy: () => {
        console.log("before destroy");
      },
      destroyed: () => {
        console.log("destroyed");
      },
    },
  });
</script>
```

## API Reference

### QUI Constructor

```typescript
new QUI(options: {
  id?: string;
  render?: () => string;
  data?: Record<string, any>;
  event?: Record<string, Function>;
  i18n?: Record<string, string | object>;
  i18nLang?: string;
  once?: boolean;
  option?: {
    svg?: boolean;
    lazyload?: boolean;
  };
  when?: {
    beforeRender?: () => void;
    rendered?: () => void;
    beforeUpdate?: () => void;
    updated?: () => void;
    beforeDestroy?: () => void;
    destroyed?: () => void;
  };
})
```

### Constructor Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|--------------|
| `id` | `string` | Conditional | ID of the DOM element to bind, mutually exclusive with `render` |
| `render` | `() => string` | Conditional | Custom render function returning an HTML string |
| `data` | `Record<string, any>` | No | Reactive data object |
| `event` | `Record<string, Function>` | No | Collection of event handler functions |
| `i18n` | `Record<string, string \| object>` | No | Locale definitions, values are JSON paths or objects |
| `i18nLang` | `string` | No | Default locale, defaults to `"zh"` |
| `once` | `boolean` | No | When `true`, data is not wrapped in a Proxy (static render) |
| `option.svg` | `boolean` | No | Enables the SVG listener, defaults to `true` |
| `option.lazyload` | `boolean` | No | Enables lazy image loading, defaults to `true` |
| `when` | `object` | No | Collection of lifecycle hooks |

### Instance Methods

| Method | Signature | Description |
|--------|-----------|--------------|
| `lang` | `lang(lang: string): void` | Switches the current locale |
| `fragment` | `fragment(): Promise<DocumentFragment>` | Returns the rendered DOM fragment |

### Template Syntax

| Syntax | Description | Example |
|--------|--------------|---------|
| `{{ value }}` | Text interpolation | `{{ title }}` |
| `:html` | Raw HTML insertion | `:html="content"` |
| `:for` | Loop rendering | `item in items`, `(key, value) in obj` |
| `:if` | Conditional rendering | `:if="show"`, `:if="count > 0"` |
| `:else-if` / `:elif` | Conditional branch | `:else-if="status == pending"` |
| `:else` | Default branch | `:else` |
| `:model` | Two-way data binding | `:model="username"` |
| `:path` | Load an external HTML file | `:path="/components/header.html"` |
| `:lazyload` | Lazy-load images | `:lazyload="image_url"` |
| `:hide` | Conditional hiding | `:hide="isHidden"` |
| `:[CSS property]` | Bind a style property directly | `:background-color="color"` |
| `@event` / `qe-event` | Event binding | `@click="handleClick"` |
| `:src` | Dynamic source | `:src="imageUrl"` |
| `:href` | Dynamic link | `:href="linkUrl"` |

### Built-in Functions

| Function | Syntax | Description |
|----------|--------|--------------|
| `LENGTH()` | `{{ LENGTH(items) }}` | Returns the length of an array or the key count of an object |
| `CALC()` | `{{ CALC(price * 1.05) }}` | Numeric calculation supporting `+`, `-`, `*`, `/`, `%` |
| `UPPER()` | `{{ UPPER(name) }}` | Converts to uppercase |
| `LOWER()` | `{{ LOWER(name) }}` | Converts to lowercase |
| `DATE()` | `{{ DATE(timestamp, YYYY-MM-DD) }}` | Formats a UNIX timestamp per the given format string |

### Comparison Operators

| Operator | Description | Example |
|----------|--------------|---------|
| `==` / `===` | Equal | `:if="status == active"` |
| `!=` / `!==` | Not equal | `:if="status != disabled"` |
| `>` | Greater than | `:if="count > 0"` |
| `<` | Less than | `:if="count < 10"` |
| `>=` | Greater or equal | `:if="count >= 5"` |
| `<=` | Less or equal | `:if="count <= 100"` |

### Special Comparison Values

| Value | Description | Example |
|-------|--------------|---------|
| `null` | Checks for null | `:if="value == null"` |
| `true` | Checks for truthy boolean | `:if="isActive == true"` |
| `false` | Checks for falsy boolean | `:if="isActive == false"` |
| `empty` | Checks for an empty string | `:if="name == empty"` |

***

©️ 2024 [邱敬幃 Pardn Chiu](https://www.linkedin.com/in/pardnchiu)
