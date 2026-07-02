# QuickUI 生命週期

> [!NOTE]
> 提供了完整的生命週期鉤子函數，讓開發者能夠在應用程式不同階段執行特定的邏輯。這些鉤子函數讓您能夠在適當的時機對應用程式進行控制，例如在元素渲染前進行資料準備，或在更新後執行額外操作。

## 生命週期鉤子

QuickUI 應用程式有六個主要的生命週期鉤子：

1. `beforeRender` - 元素渲染前
2. `rendered` - 元素渲染後
3. `beforeUpdate` - 更新前
4. `updated` - 更新後
5. `beforeDestroy` - 銷毀前
6. `destroyed` - 銷毀後

## 用法

在 QUI 實例化時，通過 `when` 或 `lifecycle` 物件定義生命週期鉤子函數。

### 基本語法

```javascript
const app = new QUI({
    id: "app",
    when: {
        beforeRender: function() { /* ... */ },
        rendered: function() { /* ... */ },
        // ...
    }
});
```

### 完整範例

```html
<body id="app"></body>
<script>
const app = new QUI({
    id: "app",
    when: {
        beforeRender: function() {
            // 在元素渲染前執行
            // 返回 false 可阻止渲染
            // return false;
        },
        rendered: function() {
            console.log("已掛載");
        },
        beforeUpdate: function() {
            // 在資料更新前執行
            // 返回 false 可阻止更新
            // return false;
        },
        updated: function() {
            console.log("已更新");
        },
        beforeDestroy: function() {
            // 在元素銷毀前執行
            // 返回 false 可阻止銷毀
            // return false;
        },
        destroyed: function() {
            console.log("已銷毀");
        }
    }
});
</script>
```

## 生命週期詳解

### beforeRender

- **觸發時機**：應用程式初始化後，DOM 渲染前
- **用途**：執行初始化邏輯，準備資料，設定環境
- **特性**：返回 `false` 可阻止渲染過程
- **參數**：無

### rendered

- **觸發時機**：DOM 首次渲染完成後
- **用途**：執行需要操作 DOM 的初始化邏輯，如綁定事件、設定第三方庫
- **特性**：接收一個參數，表示渲染所需的時間（秒）
- **參數**：`time` - 渲染耗時，單位為秒

### beforeUpdate

- **觸發時機**：資料更新時，DOM 重新渲染前
- **用途**：在 DOM 更新前處理資料或進行預處理
- **特性**：返回 `false` 可阻止此次更新
- **參數**：無

### updated

- **觸發時機**：DOM 重新渲染完成後
- **用途**：執行需要在 DOM 更新後進行的操作
- **特性**：接收一個參數，表示更新所需的時間（秒）
- **參數**：`time` - 更新耗時，單位為秒

### beforeDestroy

- **觸發時機**：組件銷毀前
- **用途**：清理資源，如移除事件監聽器、取消請求等
- **特性**：返回 `false` 可阻止銷毀過程
- **參數**：無

### destroyed

- **觸發時機**：組件銷毀完成後
- **用途**：執行最終的清理邏輯或通知
- **特性**：接收一個參數，表示銷毀所需的時間（秒）
- **參數**：`time` - 銷毀耗時，單位為秒

## 使用建議

- 使用 `beforeRender` 進行資料初始化和預處理
- 在 `rendered` 中執行需要 DOM 元素的操作，如設定第三方庫
- 利用 `beforeUpdate` 檢查更新條件，必要時阻止不必要的更新
- 在 `updated` 中處理更新後的 DOM 調整
- 使用 `beforeDestroy` 和 `destroyed` 進行資源清理，避免記憶體洩漏