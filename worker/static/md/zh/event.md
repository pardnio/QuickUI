# QuickUI 事件偵測

> [!NOTE]
> 通過 `@事件名稱` 或 `qe-事件名稱` 的語法，可以將元素的事件直接連結到實例中定義的處理函數。

## 語法

```html
<元素 @事件名稱="處理函數名稱"></元素>
```

或使用替代語法：

```html
<元素 qe-事件名稱="處理函數名稱"></元素>
```

## 支持

支持所有標準的 DOM 事件，包括但不限於：

- 滑鼠：`click`、`dblclick`、`mousedown`、`mouseup`、`mousemove`、`mouseenter`、`mouseleave`
- 鍵盤：`keydown`、`keyup`、`keypress`
- 表單：`submit`、`change`、`input`、`focus`、`blur`
- 文檔：`load`、`resize`、`scroll`
- 觸控：`touchstart`、`touchend`、`touchmove`

## 範例

```html
<body id="app">
    <button @click="test">test</button>
</body>
<script>
const app = new QUI({
    id: "app",
    event: {
        test: e => {
            alert(e.target.innerText + " clicked");
        }
    }
});
</script>
```

點擊按鈕時，將彈出一個提示框，顯示 "test clicked"。

## 事件處理函數

事件處理函數定義在實例的 `event` 對象中。每個處理函數都會自動接收原生的事件對象（Event）作為參數，這讓開發者可以：

- 訪問事件的標準屬性（如 `type`、`target`、`currentTarget`）
- 使用事件方法（如 `preventDefault()`、`stopPropagation()`）
- 獲取事件相關的數據（如鍵盤按鍵代碼、滑鼠坐標）

### 事件處理函數中的 `this`

在事件處理函數中，`this` 關鍵字指向的是當前的事件處理函數本身。如果需要訪問實例及其資料和方法，請使用已定義的實例變數（如 `app`）。

### 使用箭頭函數

如果使用箭頭函數定義事件處理函數，則無法通過 `this` 訪問處理函數本身，但可以保持對外層作用域的引用：

```javascript
event: {
    test: e => {
        console.log("事件目標：", e.target);
        console.log("當前資料：", app.data.someValue);
    }
}
```

## 事件解綁

未提供直接的解綁事件處理函式語法，可以通過標準的 DOM API 來實現：

```javascript
// 移除事件監聽器
element.removeEventListener("click", app.event.test);
```

## 事件修飾符

未支援事件修飾符（如 `.prevent`、`.stop`），需要在事件處理函數中手動調用相應的方法：

```javascript
test: e => {
    // 阻止默認行為
    e.preventDefault();
    
    // 阻止事件冒泡
    e.stopPropagation();
    
    // 事件處理邏輯
    alert(e.target.innerText + " clicked");
}
```

## 最佳實踐

- 為提高代碼可讀性，事件處理函數名稱應清晰表達其功能
- 複雜的事件處理邏輯應抽取為獨立函數，保持事件處理函數簡潔
- 對於需要共享的事件處理邏輯，可以在多個事件處理函數中調用同一個輔助函數
- 在處理表單提交等事件時，記得使用 `e.preventDefault()` 阻止默認行為