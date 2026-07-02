# QuickUI 可用函式

> [!NOTE]
> 提供了一系列內建函式，讓開發者能夠在模板中直接處理資料，無需在 JavaScript 中預先處理。這些函式可用於文本插值中（使用 `{{ }}` 語法），以及屬性綁定中，大幅提升開發效率與模板靈活性。

## `LENGTH()` 函式

用於獲取陣列長度或物件的鍵數量。

### 語法

```
LENGTH(資料)
```

### 參數

- `資料`：要計算長度的陣列或物件

### 返回值

- 若是陣列：返回陣列的元素數量
- 若是物件：返回物件的屬性數量
- 若是其他類型：返回 `undefined`

### 範例

```html
<body id="app">
    <p>Total: {{ LENGTH(array) }}</p>
</body>
<script>
const app = new QUI({
    id: "app",
    data: {
        array: [1, 2, 3, 4]
    }
});
</script>
```

#### 渲染結果

```html
<body id="app">
    <p>Total: 4</p>
</body>
```

## `CALC()` 函式

用於執行簡單的數學運算，支援加減乘除和取餘運算。

### 語法

```
CALC(表達式)
```

### 參數

- `表達式`：包含數學運算的表達式，支援 `+`、`-`、`*`、`/`、`%` 運算符

### 返回值

- 計算結果的數值

### 範例

```html
<body id="app">
    <p>calc: {{ CALC(num * 10) }}</p>
</body>
<script>
const app = new QUI({
    id: "app",
    data: {
        num: 1
    }
});
</script>
```

#### 渲染結果

```html
<body id="app">
    <p>calc: 10</p>
</body>
```

## `UPPER()` 與 `LOWER()` 函式

這兩個函式用於轉換文字的大小寫。

### `UPPER()` 語法

```
UPPER(文字)
```

將文字轉換為全大寫形式。

### `LOWER()` 語法

```
LOWER(文字)
```

將文字轉換為全小寫形式。

### 參數

- `文字`：要進行轉換的字串

### 返回值

- `UPPER()`：轉換為大寫後的字串
- `LOWER()`：轉換為小寫後的字串

### 範例

```html
<body id="app">
    <p>{{ UPPER(test1) }} {{ LOWER(test2) }}</p>
</body>
<script>
const app = new QUI({
    id: "app",
    data: {
        test1: "upper",
        test2: "LOWER"
    }
});
</script>
```

#### 渲染結果

```html
<body id="app">
    <p>UPPER lower</p>
</body>
```

## `DATE()` 函式

用於格式化時間戳記為人類可讀的日期時間字串。

### 語法

```
DATE(時間戳記, 格式)
```

### 參數

- `時間戳記`：UNIX 時間戳記（秒數，不是毫秒數）
- `格式`：日期時間格式字串

### 格式

| 格式 | 說明 | 範例 |
|---------|------|------|
| YYYY, yyyy | 完整年份 | 2024 |
| YY, yy | 兩位數年份 | 24 |
| MM | 兩位數月份 | 01-12 |
| M | 一位數月份 | 1-12 |
| DD | 兩位數日期 | 01-31 |
| D | 一位數日期 | 1-31 |
| HH | 兩位數 24 小時制 | 00-23 |
| H | 一位數 24 小時制 | 0-23 |
| hh | 兩位數 12 小時制 | 01-12 |
| h | 一位數 12 小時制 | 1-12 |
| mm | 兩位數分鐘 | 00-59 |
| m | 一位數分鐘 | 0-59 |
| ss | 兩位數秒數 | 00-59 |
| s | 一位數秒數 | 0-59 |
| SSS | 三位數毫秒 | 000-999 |
| a | 小寫午別 | am, pm |
| A | 大寫午別 | AM, PM |
| ddd | 星期縮寫 | Sun-Sat |
| dddd | 完整星期名稱 | Sunday-Saturday |

### 範例

```html
<body id="app">
    <p>{{ DATE(now, YYYY-MM-DD hh:mm:ss) }}</p>
</body>
<script>
const app = new QUI({
    id: "app",
    data: {
        now: Math.floor(Date.now() / 1000)
    }
});
</script>
```

#### 渲染結果（執行時間為例）

```html
<body id="app">
    <p>2024-08-17 03:40:47</p>
</body>
```

## 在不同場景中使用函式

### 文本插值

```html
<p>{{ LENGTH(items) }} items found.</p>
```

### 屬性綁定

```html
<div :data-count="LENGTH(items)"></div>
```

### 條件渲染

```html
<div :if="LENGTH(items) > 0">有內容</div>
<div :else>無內容</div>
```

### 迴圈渲染

```html
<li :for="(item, index) in items">{{ CALC(index + 1) }}. {{ item.name }}</li>
```

## 技術細節

- 函式名稱必須大寫（`LENGTH`, `CALC`, `UPPER`, `LOWER`, `DATE`）
- 函式參數區分大小寫
- 函式參數中可以使用資料模型中的變數
- 參數之間使用逗號分隔
- `CALC()` 函式僅支援基本數學運算，不支援複雜的數學表達式或函式
- 函式執行錯誤時通常會返回 `undefined`

## 最佳實踐

- 使用 `LENGTH()` 檢查陣列或物件是否為空
- 使用 `CALC()` 進行簡單的數值計算和索引調整
- 使用 `UPPER()` 和 `LOWER()` 確保文字格式一致性
- 使用 `DATE()` 顯示用戶友好的時間格式
- 對於複雜的資料處理，建議在 JavaScript 中預先處理後再綁定到資料模型