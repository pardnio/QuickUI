# QuickUI CSS 設置

> [!NOTE]
> 透過 `:[CSS屬性]` 的方式直接將資料綁定到元素的樣式屬性上。無需手動操作 DOM 元素的 style 屬性。

## 語法

```html
<元素 :[CSS屬性]="資料屬性"></元素>
```

初始化或資料更新時會自動將指定的資料屬性值設定到元素的對應 CSS 樣式上。支援所有標準的 CSS 屬性名稱，並會自動處理 camelCase 與 kebab-case 之間的轉換。

## 範例

展示了如何使用 CSS 設置功能來動態綁定元素的寬度和背景顏色：

### index.html
```html
<body id="app">
    <button :width="width" :background-color="red">test</button>
</body>
<script>
const app = new QUI({
    id: "app",
    data: {
        width: "100px"
    }
});
</script>
```

### 渲染結果
```html
<body id="app">
    <button style="width: 100px; background-color: red;">test</button>
</body>
```

## 支持

支持所有標準的 CSS 屬性，包括但不限於：

- 尺寸：`:width`、`:height`、`:max-width`、`:min-height` 等
- 顏色：`:color`、`:background-color`、`:border-color` 等
- 定位：`:position`、`:top`、`:left`、`:z-index` 等
- 邊框：`:border`、`:border-radius`、`:border-width` 等
- 間距：`:margin`、`:padding`、`:gap` 等
- 顯示：`:display`、`:opacity`、`:visibility` 等
- 字體：`:font-size`、`:font-weight`、`:line-height` 等

## 實現

1. 識別所有以 `:` 開頭的非指令性屬性
2. 判斷是否為 CSS 屬性（根據內部映射表）
3. 獲取對應資料屬性的值
4. 設定元素的 `style.屬性名` 為對應的值

## 動態更新

當資料模型中的值發生變化時，綁定的 CSS 樣式也會自動更新：

```javascript
// 動態更新按鈕樣式
// 按鈕樣式會自動更新為 width: 200px;
app.data.width = "200px";
```

## 注意事項

> [!NOTE]
> 支援 `:[CSS屬性]` 的簡易設定方式，直接將資料綁定到樣式屬性。

- CSS 屬性名稱可以使用 kebab-case（如 `background-color`）或 camelCase（如 `backgroundColor`）
- 當值為 `null`、`undefined` 或空字串時，對應的樣式屬性會被移除
- 數值型屬性會自動添加單位（如 `width: 100` 會被轉換為 `width: 100px`）
- 可以與 `:style` 指令共用，但直接指定的 CSS 屬性會優先於 `:style` 中的同名屬性