# QuickUI 模板渲染

> [!NOTE]
> 透過自定義的模板語法可以快速建立動態 HTML 結構。結合 `fragment()` 方法，可以方便地將模板渲染結果附加到現有 DOM 結構中，非常適合建立複雜的 UI 組件。

## 語法

使用專有的簡潔模板語法，主要包含以下元素：

- **標籤定義**：直接使用標籤名稱，如 `div`, `section` 等
- **ID 選擇器**：使用 `#` 指定元素 ID，如 `div#main-card`
- **類別選擇器**：使用 `.` 指定元素類別，可添加多個，如 `div.primary.highlighted`
- **屬性設定**：使用 `()` 包裹的屬性列表，如 `(title: "test")`
- **子元素**：使用 `[]` 包裹的子元素列表
- **文本節點**：使用雙引號 `"` 包裹的文本內容
- **資料綁定**：使用 `{{ }}` 進行資料變數綁定

## `fragment()` 方法

`fragment()` 方法將模板渲染為 DocumentFragment，可以高效地附加到目標 DOM 元素中。

## 完整範例

### HTML 與 JavaScript 代碼

```html
<body>
    <section id="test"></section>
</body>
<script>
    document.addEventListener("DOMContentLoaded", async () => {
        const test = await new QUI({
            // id: "test"
            data: {
                test1: "text test 1",
                test2: "text test 2",
                test3: "text test 3",
            },
            event: {
                test: e => {
                    alert("test");
                }
            },
            render: _ => `
                section
                "{{ test1 }}"
                div#main-card.primary.highlighted (
                    q-title: "test1" 
                    q-content: "12312312"
                    qe-click: "test"
                    style: "background: red;"
                ) [
                    "{{ test2 }}"
                    "<br>"
                    "{{ test3 }}"
                ]`
        }).fragment();

        document.getElementById("test").appendChild(test)
    });
</script>
```

### 渲染結果

```html
<body>
    <section id="test">
        <section></section>
        text test 1
        <div id="main-card" class="primary highlighted" style="background: red;" title="text test 1" content="12312312">
        text test 2<br>text test 3
        </div>
    </section>
</body>
```

## 模板語法詳解

### 元素定義

```
tagName#id.class1.class2
```

- `tagName`: HTML 標籤名稱（必須）
- `#id`: 元素的 ID（可選）
- `.class1.class2`: 元素的類別，可添加多個（可選）

### 屬性設定

```
(attribute1: "value1" attribute2: "value2")
```

屬性以鍵值對形式在括號內定義，可包含標準 HTML 屬性及 QuickUI 特殊屬性：

- 標準 HTML 屬性，如 `style`, `title` 等
- QuickUI 前綴屬性：
  - `q-`: QuickUI 特殊屬性前綴
  - `qe-`: 事件綁定前綴，如 `qe-click` 等同於 `@click`

### 子元素

```
[
    "文本節點"
    childElement1
    childElement2
]
```

子元素列表使用方括號 `[]` 包裹，可包含：
- 文本節點（雙引號包裹）
- 嵌套的元素定義
- HTML 片段（雙引號包裹）

### 資料綁定

```
"{{ 變數名稱 }}"
```

使用雙花括號語法 `{{ }}` 可引用 `data` 對象中的變數進行動態替換。

## 事件綁定

在屬性設定中使用 `qe-` 前綴可綁定事件處理函數：

```
(qe-click: "事件名稱")
```

對應的事件處理函數應在 QUI 初始化時的 `event` 對象中定義。

## 應用場景

- 動態創建 UI 組件
- 單頁應用路由視圖切換
- 列表項目動態生成
- 後台加載的內容展示

## 注意事項

- 模板語法對空格和縮進敏感，請遵循範例中的格式
- `fragment()` 方法是非同步的，需要使用 `await` 關鍵字
- 使用 `fragment()` 方法時可以不需要指定 `id` 參數
- 渲染後的模板會保留原始結構，包括空白和換行符