# QuickUI 文字替換

> [!NOTE]
> 提供兩種主要的文字替換方式：`{{ }}` 語法和 `:html` 屬性。將動態資料渲染到 DOM 結構中。

## `{{ }}` 語法

插值表達式使用雙大括號語法 `{{ }}` 將資料屬性插入到 HTML 內容中，並自動進行文字轉義處理，確保安全顯示。

### 基本語法

```html
<標籤>{{ 變數名稱 }}</標籤>
```

### 使用範例

#### HTML 代碼

```html
<body id="app">
    <h1>{{ title }}</h1>
</body>
<script>
    const app = new QUI({
        id: "app",
        data: {
            title: "test"
        }
    });
</script>
```

#### 渲染結果

```html
<body id="app">
    <h1>test</h1>
</body>
```

### 特點

- 自動對資料進行 HTML 轉義，防止 XSS 攻擊
- 當資料變更時，會自動更新對應的 DOM 內容
- 可在文本中混合使用多個插值表達式

## `:html` 指令

`:html` 指令用於設置元素的 `innerHTML` 內容，允許插入原始 HTML 代碼，適用於需要渲染 HTML 標記的場景。

### 基本語法

```html
<標籤 :html="變數名稱"></標籤>
```

### 使用範例

#### HTML 代碼

```html
<body id="app">
    <section :html="html"></section>
</body>
<script>
    const app = new QUI({
        id: "app",
        data: {
            html: "<b>innerHtml</b>"
        }
    });
</script>
```

#### 渲染結果

```html
<body id="app">
    <section>
        <b>innerHtml</b>
    </section>
</body>
```

### 特點

- 可插入原始 HTML 代碼，不進行轉義處理
- 適合用於渲染富文本內容
- 支援複雜的 HTML 結構
- 當資料變更時，整個內容會被重新渲染

## 高級功能

### 計算表達式

插值表達式支援基本的計算功能：

```html
<div>{{ CALC(price * quantity) }}</div>
```

### 字串操作

支援字串大小寫轉換：

```html
<div>{{ UPPER(username) }}</div>
<div>{{ LOWER(username) }}</div>
```

### 日期格式化

支援日期時間格式化：

```html
<div>{{ DATE(timestamp, yyyy/MM/DD HH:mm:ss) }}</div>
```

### 長度獲取

可獲取陣列或字串的長度：

```html
<div>商品數量：{{ LENGTH(products) }}</div>
```

## 注意事項

- 使用 `:html` 指令時，需確保內容安全性，避免注入惡意代碼
- 對於需要在屬性中綁定資料的場景，應使用相應的屬性綁定指令
- 當資料結構較為複雜時，建議使用計算屬性或方法進行預處理
- 更新資料時，QuickUI 會自動重新渲染相應的 DOM 元素