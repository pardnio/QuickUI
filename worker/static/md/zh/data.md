# QuickUI 資料獲取

> [!NOTE]
> 可以通過 `實例變數名稱.data` 直接訪問和修改資料，同時也可以在事件處理函數和動態創建的元素中使用這些資料。<br>
> 以下實例變數名稱皆以 `app` 做範例。

## 語法

### 獲取資料

通過 `app.data.屬性名稱` 的方式獲取資料模型中的值：

```javascript
// 獲取資料模型中的 test 屬性值
const value = app.data.test;
```

### 修改資料

通過直接賦值的方式修改資料模型：

```javascript
// 修改資料模型中的 test 屬性值
app.data.test = "新值";
```

當資料模型被修改時，所有綁定了該資料的 UI 元素將自動更新。

## 範例

以下範例展示了如何在事件處理函數中獲取資料以及如何在動態創建的元素中使用這些資料：

```html
<body id="app">
    <input type="text" :model="test">
    <button @click="get">測試</button>
</body>
<script>
const app = new QUI({
    id: "app",
    data: {
        // 給 input 綁定的值
        test: 123
    },
    event: {
        get: _ => {
            // 點擊時彈出內容為 test 值的通知
            alert(app.data.test);
        },
        set: _ => {
            let dom = document.createElement("button");
            // 按鈕點按事件設置為 get 函式
            dom.onclick = app.event.get;
            app.body.append(dom);
        }
    }
});
</script>
```

## 資料獲取場景

### 在事件處理函數中

在 `event` 定義的事件處理函數中，可以直接通過 `app.data` 獲取資料：

```javascript
event: {
    handleClick: function() {
        // 獲取並使用資料
        console.log("當前值：", app.data.propertyName);
    }
}
```

### 在動態創建的元素中

當動態創建 DOM 元素時，可以將事件和資料與這些元素關聯：

```javascript
// 創建新元素並設置事件
function createNewElement() {
    const button = document.createElement("button");
    button.textContent = "顯示資料";
    button.onclick = _ => alert(app.data.someValue);
    app.body.appendChild(button);
};
```

### 在外部函數中

也可以在外部函數中被引用和使用：

```javascript
// 在外部的函數中使用
function externalFunction() {
    // 可以訪問全局變數 app
    if (app.data.condition) {
        // 執行相應操作
    };
};
```

## 資料獲取與響應式系統

當通過 `app.data` 修改資料時，會自動追蹤變更並更新相關的 UI 元素：

- 所有通過 `:model` 綁定的表單元素會反映新的值
- 所有使用 `{{ 資料屬性 }}` 語法的文本插值會更新
- 所有使用 `:[屬性]="資料屬性"` 綁定的屬性會更新

## 最佳實踐

- 保持資料模型結構扁平化，避免過深的嵌套
- 在初始化時預先定義所有可能用到的資料屬性
- 使用 `:model` 進行雙向綁定，而不是手動同步資料和 UI
- 對於複雜的資料操作，考慮在資料變更前後使用生命週期鉤子

## 技術細節

- 資料獲取是基於 JavaScript 的物件引用，使用 `Proxy` 實現資料變更的追蹤
- 資料模型支持任何有效的 JavaScript 值類型，包括基本類型、陣列和物件
- 當資料變更時，會調度一個更新隊列，在下一個動畫幀中批量更新 UI