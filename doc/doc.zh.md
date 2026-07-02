# QuickUI - 技術文件

> 返回 [README](./README.zh.md)

## 前置需求

- 現代瀏覽器（支援 ES6+、`Proxy`、`MutationObserver`）
- Node.js ≥ 18（僅開發建置時需要）

## 安裝

### 透過 npm

```bash
npm i @pardnchiu/quickui
```

### 透過 CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@pardnchiu/quickui@latest/dist/QuickUI.js"></script>
```

### ESM 模組

```javascript
import { QUI } from "@pardnchiu/quickui/dist/QuickUI.esm.js";
```

### 從原始碼建置

```bash
git clone https://github.com/pardnio/QuickUI.git
cd QuickUI
npm install
npm run build:once
```

## 使用方式

### 基礎用法

建立一個 QuickUI 實例並綁定資料：

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
      description: "一個輕量化前端框架",
    },
  });
</script>
```

### 條件渲染

使用 `:if`、`:else-if`、`:else` 控制元素顯示：

```html
<div id="app">
  <p :if="status == active">啟用中</p>
  <p :else-if="status == pending">等待中</p>
  <p :else>已停用</p>
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

### 迴圈渲染

使用 `:for` 遍歷陣列或物件：

```html
<div id="app">
  <!-- 陣列遍歷 -->
  <ul>
    <li :for="item in items">{{ item }}</li>
  </ul>

  <!-- 物件遍歷（含索引） -->
  <ul>
    <li :for="(key, value) in user">{{ key }}: {{ value }}</li>
  </ul>
</div>

<script>
  const app = new QUI({
    id: "app",
    data: {
      items: ["項目 A", "項目 B", "項目 C"],
      user: { name: "Pardn", role: "Developer" },
    },
  });
</script>
```

### 事件綁定

使用 `@event` 語法綁定 DOM 事件：

```html
<div id="app">
  <button @click="handleClick">點擊</button>
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

### 雙向綁定

使用 `:model` 實現表單元素與資料的即時同步：

```html
<div id="app">
  <input type="text" :model="username" />
  <p>你好，{{ username }}</p>
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

### i18n 多語系

透過 JSON 語系檔與 `i18n.key` 語法切換語言：

```html
<div id="app">
  <h1>{{ i18n.title }}</h1>
  <button @click="switchLang">切換語言</button>
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

### 插入區塊

使用 `<temp :path="...">` 動態載入並插入外部 HTML 檔案：

```html
<temp :path="/components/header.html"></temp>
```

### 懶加載

使用 `:lazyload` 延遲載入圖片，圖片進入視窗才會實際載入：

```html
<img :lazyload="imageUrl" />
```

### 生命週期

透過 `when` 定義生命週期鉤子：

```html
<script>
  const app = new QUI({
    id: "app",
    data: {},
    when: {
      beforeRender: () => {
        console.log("渲染前");
      },
      rendered: () => {
        console.log("渲染完成");
      },
      beforeUpdate: () => {
        console.log("更新前");
      },
      updated: () => {
        console.log("更新完成");
      },
      beforeDestroy: () => {
        console.log("銷毀前");
      },
      destroyed: () => {
        console.log("已銷毀");
      },
    },
  });
</script>
```

## API 參考

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

### Constructor 參數

| 參數 | 型別 | 必要 | 說明 |
|------|------|------|------|
| `id` | `string` | 條件性 | 綁定的 DOM 元素 ID，與 `render` 二擇一 |
| `render` | `() => string` | 條件性 | 自訂渲染函式，回傳 HTML 字串 |
| `data` | `Record<string, any>` | 否 | 響應式資料物件 |
| `event` | `Record<string, Function>` | 否 | 事件處理函式集合 |
| `i18n` | `Record<string, string \| object>` | 否 | 多語系定義，值為 JSON 路徑或物件 |
| `i18nLang` | `string` | 否 | 預設語系，預設為 `"zh"` |
| `once` | `boolean` | 否 | 設為 `true` 時資料不建立 Proxy（靜態渲染） |
| `option.svg` | `boolean` | 否 | 啟用 SVG 監聽器，預設 `true` |
| `option.lazyload` | `boolean` | 否 | 啟用圖片延遲載入，預設 `true` |
| `when` | `object` | 否 | 生命週期鉤子集合 |

### 實例方法

| 方法 | 簽章 | 說明 |
|------|------|------|
| `lang` | `lang(lang: string): void` | 切換當前語系 |
| `fragment` | `fragment(): Promise<DocumentFragment>` | 取得渲染後的 DOM Fragment |

### 模板語法

| 語法 | 說明 | 範例 |
|------|------|------|
| `{{ value }}` | 文字插值 | `{{ title }}` |
| `:html` | 原始 HTML 插入 | `:html="content"` |
| `:for` | 迴圈渲染 | `item in items`、`(key, value) in obj` |
| `:if` | 條件渲染 | `:if="show"`、`:if="count > 0"` |
| `:else-if` / `:elif` | 條件分支 | `:else-if="status == pending"` |
| `:else` | 預設分支 | `:else` |
| `:model` | 雙向資料綁定 | `:model="username"` |
| `:path` | 載入外部 HTML | `:path="/components/header.html"` |
| `:lazyload` | 圖片延遲載入 | `:lazyload="image_url"` |
| `:hide` | 條件隱藏 | `:hide="isHidden"` |
| `:[CSS 屬性]` | 直接綁定樣式屬性 | `:background-color="color"` |
| `@event` / `qe-event` | 事件綁定 | `@click="handleClick"` |
| `:src` | 動態來源 | `:src="imageUrl"` |
| `:href` | 動態連結 | `:href="linkUrl"` |

### 內建函式

| 函式 | 語法 | 說明 |
|------|------|------|
| `LENGTH()` | `{{ LENGTH(items) }}` | 取得陣列或物件的長度 |
| `CALC()` | `{{ CALC(price * 1.05) }}` | 支援 `+`、`-`、`*`、`/`、`%` 的數值運算 |
| `UPPER()` | `{{ UPPER(name) }}` | 轉大寫 |
| `LOWER()` | `{{ LOWER(name) }}` | 轉小寫 |
| `DATE()` | `{{ DATE(timestamp, YYYY-MM-DD) }}` | 依格式字串將 UNIX 時間戳記格式化 |

### 比較運算子

| 運算子 | 說明 | 範例 |
|--------|------|------|
| `==` / `===` | 等於 | `:if="status == active"` |
| `!=` / `!==` | 不等於 | `:if="status != disabled"` |
| `>` | 大於 | `:if="count > 0"` |
| `<` | 小於 | `:if="count < 10"` |
| `>=` | 大於等於 | `:if="count >= 5"` |
| `<=` | 小於等於 | `:if="count <= 100"` |

### 特殊比較值

| 值 | 說明 | 範例 |
|------|------|------|
| `null` | 判斷是否為 null | `:if="value == null"` |
| `true` | 判斷布林真值 | `:if="isActive == true"` |
| `false` | 判斷布林假值 | `:if="isActive == false"` |
| `empty` | 判斷是否為空字串 | `:if="name == empty"` |

***

©️ 2024 [邱敬幃 Pardn Chiu](https://www.linkedin.com/in/pardnchiu)
