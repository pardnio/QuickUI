## 預計 `1.*.*` 棄用

> 為確保代碼風格保有一致性與壓縮代碼容量，本專案 1.0.0 開始僅保留駝峰命名的屬性。不再支持蛇形名的屬性。

- 生命週期方法統一移至 `when` 對象中：
    - 移除 `lifecycle` 對象
    - `when` 對象僅保留駝峰命名屬性
    - 移除 QUI 對象中直接定義的生命週期方法
    - 舊寫法：
    ```javascript
    const app = new QUI({
        lifecycle: {
            before_render: _ => {
                console.log("準備渲染")
            },
        },
        before_render: _ => {
            console.log("準備渲染")
        }
    });
    ```
    - 新寫法：
    ```javascript
    const app = new QUI({
        when: {
            beforeRender: _ => {
            console.log("準備渲染")
            },
        }
    });
    ```
- CSS 屬性統一使用標準寫法：
    - 將 `:borderRadius` 改為 `:border-radius`
    - 將 `:bg-color` 改為 `:background-color`