# QuickUI 插入區塊

> [!NOTE]
> 動態載入和插入外部 HTML 檔案的內容到當前頁面中。模組化網頁結構，將不同的 HTML 區塊分離成獨立檔案。

## 語法

`:path` 指令需與 `<temp>` 標籤配合使用，語法如下：

```html
<temp :path="檔案路徑"></temp>
```

自動將指定路徑的 HTML 檔案內容載入並替換整個 `<temp>` 元素。

## 範例

### test.html
```html
<h1>path heading</h1>
<p>path content</p>
```

### index.html
```html
<body id="app">
    <temp :path="./test.html"></temp>
</body>
<script>
const app = new QUI({
    id: "app"
});
</script>
```

### 渲染結果
```html
<body id="app">
    <!-- 直接插入 PATH 內容 -->
    <h1>path heading</h1>
    <p>path content</p>
</body>
```

## 實現

1. 使用 `fetch` 發送請求獲取指定路徑的 HTML 內容
2. 解析並創建對應的 DOM 節點
3. 使用解析後的 DOM 節點替換原始的 `<temp>` 元素
4. 如果請求失敗或檔案不存在，`<temp>` 元素將保留在頁面中且不會有任何變化

## 注意事項

> [!NOTE]
> 本地測試時請確保測試時已禁用瀏覽器中的本地文件限制或使用實時服務器。

- 在本地環境測試時，由於瀏覽器的安全限制，直接打開 HTML 檔案可能無法正常加載外部 HTML 內容
- 推薦使用本地服務器（如 Live Server、http-server 等）進行開發和測試
- 相對路徑基於當前頁面的位置，使用時需注意檔案結構
- 所有載入的內容將在頁面初始化過程中替換，不會產生額外的閃爍

## 應用場景

- 將重複使用的 UI 組件（如頁首、頁尾、導航欄）抽取為獨立檔案
- 在多頁應用中共享相同的 HTML 片段
- 實現簡單的模板複用，減少重複代碼
- 將複雜的頁面結構分解為更小的、更易管理的檔案