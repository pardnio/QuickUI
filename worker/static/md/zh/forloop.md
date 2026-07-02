# QuickUI 迴圈渲染

> [!NOTE]
> 透過 `:for` 指令可以根據陣列或物件資料動態生成 DOM 元素，處理重複性內容，無需手動操作 DOM 元素。

## 語法

### 陣列迴圈

```html
<元素 :for="(item, index) in 陣列"></元素>
```

- `item`：代表陣列中的每個元素
- `index`：（可選）代表當前元素在陣列中的索引

### 物件迴圈

```html
<元素 :for="(key, value) in 物件"></元素>
```

- `key`：代表物件的屬性名稱（可自訂變數名稱）
- `value`：代表物件的屬性值（可自訂變數名稱）

## 基本範例

### index.html
```html
<body id="app">
    <ul>
        <li :for="(item, index) in ary" :id="item" :index="index">{{ item }} {{ CALC(index + 1) }}</li>
    </ul>
</body>
<script>
const app = new QUI({
    id: "app",
    data: {
        ary: ["test1", "test2", "test3"]
    }
});
</script>
```

### 渲染結果
```html
<body id="app">
    <li id="test1" index="0">test1 1</li>
    <li id="test2" index="1">test2 2</li>
    <li id="test3" index="2">test3 3</li>
</body>
```

## 巢狀迴圈

支援多層巢狀迴圈，可以遍歷複雜的資料結構：

### index.html
```html
<body id="app">
    <ul>
        <li :for="(key, val) in obj">
            {{ key }}: {{ val.name }}
            <ul>
                <li :for="item in val.ary">
                    {{ item.name }}
                    <ul>
                        <li :for="(item1, index1) in item.ary1">
                            {{ CALC(index1 + 1) }}. {{ item1.name }} - ${{ item1.price }}
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</body>
<script>
const app = new QUI({
  id: "app",
    data: {
        obj: {
            food: {
                name: "Food",
                ary: [
                    {
                        name: 'Snacks',
                        ary1: [
                            { name: 'Potato Chips', price: 10 },
                            { name: 'Chocolate', price: 8 }
                        ]
                    },
                    {
                        name: 'Beverages',
                        ary1: [
                            { name: 'Juice', price: 5 },
                            { name: 'Tea', price: 3 }
                        ]
                    }
                ]
            },
            home: {
                name: 'Home',
                ary: [
                    {
                        name: 'Furniture',
                        ary1: [
                            { name: 'Sofa', price: 300 },
                            { name: 'Table', price: 150 }
                        ]
                    },
                    {
                        name: 'Decorations',
                        ary1: [
                            { name: 'Picture Frame', price: 20 },
                            { name: 'Vase', price: 15 }
                        ]
                    }
                ]
            }
        }
    }
});
</script>
```

### 渲染結果
```html
<body id="app">
    <ul>
        <li>food: Food
            <ul>
                <li>Snacks
                    <ul>
                        <li>1. Potato Chips - $10</li>
                        <li>2. Chocolate - $8</li>
                    </ul>
                </li>
                <li>Beverages
                    <ul>
                        <li>1. Juice - $5</li>
                        <li>2. Tea - $3</li>
                    </ul>
                </li>
            </ul>
        </li>
        <li>home: Home
            <ul>
                <li>Furniture
                    <ul>
                        <li>1. Sofa - $300</li>
                        <li>2. Table - $150</li>
                    </ul>
                </li>
                <li>Decorations
                    <ul>
                        <li>1. Picture Frame - $20</li>
                        <li>2. Vase - $15</li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</body>
```

## 迴圈中的資料綁定

- 使用 `{{ item }}` 顯示當前項目
- 使用 `{{ index }}` 顯示當前索引
- 使用 `:屬性="item"` 將當前項目綁定到元素屬性
- 使用 `{{ CALC(index + 1) }}` 進行簡單的數學運算

## 動態更新

當資料模型中的陣列或物件發生變更時，迴圈渲染的元素會自動更新：

- 新增項目：將在適當位置新增對應的 DOM 元素
- 刪除項目：將移除對應的 DOM 元素
- 修改項目：將更新對應 DOM 元素的內容和屬性

```javascript
// 動態修改陣列，UI 會自動更新
app.data.ary.push("test4");
app.data.ary[0] = "updated";
app.data.ary.splice(1, 1);
```

## 實現

1. 解析帶有 `:for` 指令的元素
2. 識別循環表達式中的循環變數和資料來源
3. 基於資料來源創建 DOM 元素的克隆副本
4. 為每個克隆元素建立獨立的資料上下文
5. 根據資料變更自動更新元素結構

## 最佳實踐

- 對於簡單列表，使用陣列迴圈 `(item, index) in array`
- 對於鍵值對數據，使用物件迴圈 `(key, value) in object`
- 避免在迴圈中使用過於複雜的表達式，可以在資料模型中預處理資料
- 適當使用巢狀迴圈處理層次結構數據，但注意避免過多層次導致性能問題
- 在資料量較大時，考慮使用分頁或虛擬滾動等技術減輕渲染負擔

## 限制與注意事項

- 迴圈變數只在該元素的作用域內有效，無法在外部訪問
- 索引變數 `index` 從 0 開始計數，顯示時可使用 `CALC(index + 1)` 進行調整
- 當涉及巢狀迴圈時，內層迴圈的變數名稱應避免與外層迴圈變數重名
- 目前不支援 `key` 屬性來優化列表更新（與 Vue 或 React 的 key 不同）