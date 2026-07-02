# QuickUI 雙向綁定

> [!NOTE] 
> 將表單元素與資料模型同步。當使用者與表單元素進行互動時，相應的資料會自動更新，而當資料變更時，相關 UI 元素也會即時反映這些變化。

## 語法

```html
<input type="text" :model="屬性名稱">
```

## 範例

展示了密碼輸入框的雙向綁定實現：

```html
<body id="app">
    <input type="password" :model="password">
    <button @click="show">test</button>
</body>

<script>
const app = new QUI({
    id: "app",
    data: {
        password: "",
    },
    event: {
        show: e => {
            alert("Password: " + app.data.password);
        }
    }
});
</script>
```

## 支持

- 文本輸入框（`<input type="text">`）
- 密碼輸入框（`<input type="password">`）
- 文本區域（`<textarea>`）
- 複選框（`<input type="checkbox">`）
- 單選按鈕（`<input type="radio">`）
- 下拉選單（`<select>`）

## 實現

1. 監聽表單元素的 `keyup` 和 `change` 事件
2. 當事件觸發時，自動更新 `data` 中對應的屬性值
3. 當 `data` 中的屬性值變化時，自動更新表單元素的顯示

## 注意事項

- 對於 `checkbox` 和 `radio` 類型的輸入框，綁定的值會是勾選的元素的 `value` 值
- 若多個 `checkbox` 擁有相同的 `name` 屬性，結果會以逗號分隔的字串形式保存
- 確保在初始化時提供相應的資料屬性，以避免未定義錯誤