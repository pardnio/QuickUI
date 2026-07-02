# QuickUI - 架構

> 返回 [README](./README.zh.md)

## 概覽

```mermaid
graph TB
    A[HTML 模板 / render 函式] --> B[模板解析器]
    B --> C[vDOM 建構]
    C --> D[Diff / Patch]
    E[Reactive Data - Proxy] -->|變更偵測| D
    D -->|最小化操作| F[實際 DOM]
    G[i18n 語系載入] --> C
    H[Lifecycle 鉤子] -.控制時機.-> C
    H -.控制時機.-> D
    I[Lazyload / SVG Listener] --> F
```

## 模組：模板解析器

負責將 HTML 字串或 DOM 元素解析為結構化的元素模型（tag / id / class / attributes / children）。

```mermaid
graph TB
    subgraph 模板解析器
        A[htmlParser] --> B[ElementModel]
        C[createElement] --> D[Element]
        E[getElementAttribute] --> B
        F[getElementIndex] --> B
    end
    Input[HTML 字串 / DOM 元素] --> A
    B --> Output[vDOM 建構]
```

## 模組：vDOM

`vDOM` 類別將 DOM 元素轉換為輕量物件表示（tag / props / children / data），供 Diff 演算法比對前後差異。

```mermaid
classDiagram
    class vDOM {
        +string tag
        +Record~string,string~ props
        +Array~vDOM|string~ children
        +any data
        +constructor(element)
    }
    class Patch {
        <<type>>
        CREATE
        APPEND
        REPLACE
        TEXT
        PROP
        REMOVE
    }
    vDOM --> Patch : 產生差異
```

## 模組：QUI 核心（Diff / Patch / 渲染排程）

```mermaid
graph TB
    subgraph QUI核心
        A["#updateVdom()"] --> B["#renderChange()"]
        B --> C[新舊 vDOM 比對]
        C --> D["#applyPatch()"]
        D --> E["#patchDoCreate / #patchDoReplace / #patchDoAppend / #patchDoRemove"]
        D --> F["#patchProp() / #setAttribute()"]
        D --> G["#getNodeByPath()"]
    end
    Reactive[Reactive Data 變更] --> A
    Lifecycle[Lifecycle.render / update] --> A
    E --> RealDOM[實際 DOM]
    F --> RealDOM
```

## 模組：Reactive Data

透過 `Proxy` 遞迴代理資料物件，屬性讀寫時攔截並回呼變更事件，交由 `Lifecycle.update` 排程觸發 `#updateVdom`。

```mermaid
graph TB
    subgraph ReactiveData
        A[createReactiveObject] -->|get/set 攔截| B[Proxy Handler]
        B -->|巢狀物件| A
        B -->|變更回呼| C[callback]
    end
    C --> Lifecycle["Lifecycle#update()"]
```

## 模組：Lifecycle

管理六個生命週期階段的回呼函數，並包裝渲染／更新／銷毀的執行時機。

```mermaid
graph TB
    subgraph Lifecycle
        A[render] --> B[beforeRenderCallback]
        A --> C[renderedCallback]
        D[update] --> E[beforeUpdateCallback]
        D --> F[updatedCallback]
        G[destroy] --> H[beforeDestroyCallback]
        G --> I[destroyedCallback]
    end
```

## 模組：Listener（Lazyload / SVG）

```mermaid
graph TB
    subgraph Listener
        A[setLazyloadListener] --> B[IntersectionObserver]
        C[setSvgListener] --> D[MutationObserver]
    end
    B -->|進入視窗| E[載入 img src]
    D -->|DOM 變化| F[替換 SVG 屬性]
```

## 模組：內建函式

供模板 `{{ }}` 插值與屬性綁定使用的工具函式集合。

```mermaid
graph TB
    subgraph 內建函式
        A[calc] --> B["CALC()"]
        C[dateFormat] --> D["DATE()"]
        E[getCamelString] --> F[屬性名稱轉換]
        G[removeEmptyTextNode] --> H[DOM 清理]
        I[getUniqueID] --> J[匿名容器 ID]
    end
```

## 資料流

從初始化到畫面更新的完整請求流程：

```mermaid
sequenceDiagram
    participant App as 使用者程式
    participant QUI as QUI 實例
    participant I18n as i18n 載入
    participant Reactive as Reactive Data
    participant Lifecycle as Lifecycle
    participant VDOM as vDOM Diff/Patch
    participant DOM as 實際 DOM

    App->>QUI: new QUI(options)
    QUI->>I18n: #geti18nData(body)
    I18n-->>QUI: 語系資料
    QUI->>Reactive: createReactiveObject(data)
    QUI->>Lifecycle: render(callback)
    Lifecycle->>VDOM: #updateVdom()
    VDOM->>VDOM: #renderChange() 新舊 vDOM 比對
    VDOM->>DOM: #applyPatch() 套用最小差異
    Lifecycle-->>App: rendered

    App->>Reactive: 修改 data 屬性
    Reactive->>Lifecycle: 觸發 update callback
    Lifecycle->>VDOM: #updateVdom()
    VDOM->>DOM: #applyPatch()
    Lifecycle-->>App: updated
```

## 狀態機

QUI 實例在生命週期各階段間的狀態轉換：

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Rendering: new QUI()
    Rendering --> Rendered: beforeRender → rendered
    Rendered --> Updating: 資料變更
    Updating --> Rendered: beforeUpdate → updated
    Rendered --> Destroying: 手動銷毀
    Destroying --> Destroyed: beforeDestroy → destroyed
    Destroyed --> [*]
```

***

©️ 2024 [邱敬幃 Pardn Chiu](https://www.linkedin.com/in/pardnchiu)
