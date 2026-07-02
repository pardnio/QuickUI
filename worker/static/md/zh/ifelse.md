# QuickUI 條件渲染

> [!NOTE]
> 通過使用 `:if`、`:else-if`、`:elif` 和 `:else` 屬性，可以實現 `if-else` 邏輯的條件性 DOM 結構控制。

## 基本指令

- **`:if="條件表達式"`** - 當條件為真時渲染元素
- **`[:else-if|:elif]="條件表達式"`** - 當前面的條件為假且當前條件為真時渲染元素
- **`:else`** - 當所有前面的條件都為假時渲染元素

## 條件表達式

- 布林值（`true` 或 `false`）
- 直接引用資料屬性（如 `isVisible`）
- 比較表達式（如 `count > 0`、`status == "active"`）
- 函數返回值（如 `isAdmin`）

## 基本範例

以下範例展示了如何使用條件渲染指令顯示不同級別的標題：

```html
<body id="app">
    <h1 :if="heading == 1">{{ title }} {{ heading }}</h1>
    <h2 :else-if="isH2">{{ title }} {{ heading }}</h2>
    <h3 :elif="heading == 3">{{ title }} {{ heading }}</h3>
    <h4 :else>{{ title }} {{ heading }}</h4>
</body>
<script>
const app = new QUI({
    id: "app",
    data: {
        heading: [Number|null],
        isH2: [Boolean|null],
        title: "test"
    }
});
</script>
```

## 渲染結果

### 當 `heading = 1` 時

```html
<body id="app">
    <h1>test 1</h1>
</body>
```

### 當 `heading = null && isH2 = true` 時

```html
<body id="app">
    <h2>test </h2>
</body>
```

### 當 `heading = 3 && isH2 = null` 時

```html
<body id="app">
    <h3>test 3</h3>
</body>
```

### 當 `heading = null && isH2 = null` 時

```html
<body id="app">
    <h4>test </h4>
</body>
```

## 條件判斷邏輯

1. **真值判斷**：
   - 數字非零為真，零為假
   - 非空字串為真，空字串為假
   - `true` 為真，`false` 為假
   - 物件和陣列為真
   - `null` 和 `undefined` 為假

2. **比較運算符**：
   - `==`：等於（值相等）
   - `===`：嚴格等於（值和類型都相等）
   - `!=`：不等於
   - `!==`：嚴格不等於
   - `>`：大於
   - `>=`：大於等於
   - `<`：小於
   - `<=`：小於等於

3. **特殊值比較**：
   - `== null`：檢查值是否為 `null`
   - `== undefined`：檢查值是否為 `undefined`
   - `== empty`：檢查字串是否為空

## 多條件判斷

```html
<div :if="status == 'success'">操作成功</div>
<div :else-if="status == 'error'">操作失敗</div>
<div :elif="status == 'loading'">正在處理...</div>
<div :else>未知狀態</div>
```

## 條件渲染與迴圈渲染結合

與迴圈渲染結合使用，實現更複雜的渲染邏輯：

```html
<ul>
    <li :for="item in items" :if="item.visible">{{ item.name }}</li>
</ul>
```

或是在迴圈內部使用條件渲染：

```html
<ul>
    <li :for="item in items">
        <span :if="item.isNew" class="badge">New!</span>
        {{ item.name }}
    </li>
</ul>
```

## 條件渲染與表單元素

根據不同情況顯示不同的輸入方式：

```html
<form>
    <input type="text" :if="inputType == 'text'" :model="value">
    <textarea :else-if="inputType == 'textarea'" :model="value"></textarea>
    <select :else :model="value">
        <option :for="option in options" :value="option.value">{{ option.text }}</option>
    </select>
</form>
```

## 工作原理

1. 識別帶有 `:if`、`:else-if`、`:elif` 和 `:else` 指令的元素
2. 按照元素在 DOM 中的順序評估條件
3. 保留第一個條件為真的元素，移除其餘相關條件元素
4. 資料變更時重新評估條件，更新 DOM 結構

## 最佳實踐

1. **簡單的條件表達式**：
   - 保持條件表達式簡單，複雜邏輯應在資料計算中預處理

2. **連續的條件元素**：
   - 確保 `:if`、`:else-if`、`:elif` 和 `:else` 元素是連續的兄弟元素

3. **條件分組**：
   - 需要條件性渲染多個元素時，可使用容器元素包裹

   ```html
   <div :if="isLoggedIn">
        <h2>歡迎回來</h2>
        <p>上次登入: {{ lastLoginDate }}</p>
        <button @click="logout">登出</button>
   </div>
   <div :else>
        <h2>請登入</h2>
        <button @click="login">登入</button>
   </div>
   ```

4. **預設狀態**：
   - 始終提供一個 `:else` 分支處理所有其他情況

## 技術限制

- 條件渲染會移除不符合條件的元素，而非僅隱藏它們
- 當條件變更時，元素會被重新創建，不會保留之前的狀態
- 條件渲染會觸發元素的完全重繪，可能影響性能
- 條件表達式中不支援複雜的邏輯運算（如 AND、OR 組合）

## 應用場景

- 根據用戶角色顯示不同的界面元素
- 基於表單狀態顯示不同的輸入欄位
- 根據資料載入狀態展示載入中、成功或錯誤提示
- 根據列表是否為空顯示不同的內容
- 實現多步驟流程中的不同步驟顯示