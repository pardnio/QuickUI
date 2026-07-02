# QuickUI 懶加載與 SVG 替換

> [!NOTE]
> 提供懶加載（Lazy Loading）功能，能夠延遲載入圖片資源，有效提升頁面載入速度並減少初始資料傳輸量。當圖片進入視窗時，系統才會自動載入圖片資源。

## 懶加載功能

### `:lazyload` 指令

使用 `:lazyload` 指令將圖片元素設定為懶加載模式。

#### 基本語法

```html
<img :lazyload="圖片路徑變數">
```

#### 完整範例

##### HTML 代碼

```html
<body id="app">
    <img :lazyload="image">
</body>
<script>
    const app = new QUI({
        id: "app",
        data: {
            image: "test.jpg"
        },
        option: {
            lazyload: true // 圖片延遲加載: true|false (預設: true)
        }
    });
</script>
```

##### 渲染結果

當圖片進入視窗後，`:lazyload` 屬性會被移除，並將圖片路徑設定到 `src` 屬性中：

```html
<body id="app">
    <img src="test.jpg">
</body>
```

### 配置選項

在 QUI 初始化時，可透過 `option` 對象配置懶加載功能：

```javascript
option: {
    lazyload: true // 啟用懶加載功能 (預設值為 true)
}
```

### 懶加載效果

- 懶加載圖片會顯示預設的載入動畫，直到圖片完成載入
- 支援自動設定圖片載入失敗後的備用圖片
- 可透過 `:effect="circle"` 屬性設定圓形加載動畫

## SVG 替換功能

QuickUI 提供 SVG 替換功能，能夠動態載入外部 SVG 文件並將其轉換為內聯 SVG 元素，便於樣式控制與動畫實現。

### `<temp-svg>` 元素與 `:src` 指令

使用 `<temp-svg>` 元素結合 `:src` 指令來載入外部 SVG 文件。

#### 基本語法

```html
<temp-svg :src="SVG路徑變數"></temp-svg>
```

#### 完整範例

##### SVG 文件內容 (test.svg)

```xml
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="18" y1="6" x2="6" y2="18" stroke="black" stroke-width="2" stroke-linecap="round"/>
<line x1="6" y1="6" x2="18" y2="18" stroke="black" stroke-width="2" stroke-linecap="round"/>
</svg>
```

##### HTML 代碼

```html
<body id="app">
    <temp-svg :src="svg"></temp-svg>
</body>
<script>
    const app = new QUI({
        id: "app",
        data: {
            svg: "test.svg",
        },
        option: {
            svg: true       // SVG 檔案轉換: true|false (預設: true)
        }
    });
</script>
```

##### 渲染結果

載入完成後，`<temp-svg>` 元素會被替換為 SVG 內容：

```html
<body id="app">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="18" y1="6" x2="6" y2="18" stroke="black" stroke-width="2" stroke-linecap="round">
        <line x1="6" y1="6" x2="18" y2="18" stroke="black" stroke-width="2" stroke-linecap="round">
    </svg>
</body>
```

### 配置選項

在 QUI 初始化時，可透過 `option` 對象配置 SVG 替換功能：

```javascript
option: {
    svg: true // 啟用 SVG 替換功能 (預設值為 true)
}
```

### SVG 替換的優勢

- 轉換為內聯 SVG 後可直接應用 CSS 樣式控制
- 支援 SVG 元素的事件綁定
- 可結合 QuickUI 的資料綁定功能動態更新 SVG 內容
- 內聯 SVG 不會產生額外的 HTTP 請求，提升頁面載入效能

## 注意事項

- 懶加載功能需要瀏覽器支援 IntersectionObserver API
- SVG 替換功能僅支援同源的 SVG 文件，跨域請求需要配置適當的 CORS 標頭
- 大量使用懶加載或 SVG 替換功能可能會影響初始渲染性能，請根據實際需求合理使用