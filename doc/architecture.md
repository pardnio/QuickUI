# QuickUI - Architecture

> Back to [README](../README.md)

## Overview

```mermaid
graph TB
    A[HTML Template / render function] --> B[Template Parser]
    B --> C[vDOM Build]
    C --> D[Diff / Patch]
    E[Reactive Data - Proxy] -->|Change Detection| D
    D -->|Minimal Ops| F[Real DOM]
    G[i18n Locale Loading] --> C
    H[Lifecycle Hooks] -.timing control.-> C
    H -.timing control.-> D
    I[Lazyload / SVG Listener] --> F
```

## Module: Template Parser

Parses HTML strings or DOM elements into a structured element model (tag / id / class / attributes / children).

```mermaid
graph TB
    subgraph TemplateParser
        A[htmlParser] --> B[ElementModel]
        C[createElement] --> D[Element]
        E[getElementAttribute] --> B
        F[getElementIndex] --> B
    end
    Input[HTML string / DOM element] --> A
    B --> Output[vDOM Build]
```

## Module: vDOM

The `vDOM` class converts a DOM element into a lightweight object representation (tag / props / children / data) that the diff algorithm compares between renders.

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
    vDOM --> Patch : produces diff
```

## Module: QUI Core (Diff / Patch / Render Scheduling)

```mermaid
graph TB
    subgraph QUICore
        A["#updateVdom()"] --> B["#renderChange()"]
        B --> C[Compare old/new vDOM]
        C --> D["#applyPatch()"]
        D --> E["#patchDoCreate / #patchDoReplace / #patchDoAppend / #patchDoRemove"]
        D --> F["#patchProp() / #setAttribute()"]
        D --> G["#getNodeByPath()"]
    end
    Reactive[Reactive Data change] --> A
    Lifecycle[Lifecycle.render / update] --> A
    E --> RealDOM[Real DOM]
    F --> RealDOM
```

## Module: Reactive Data

Recursively wraps the data object with a `Proxy`, intercepting property reads/writes and invoking a change callback that `Lifecycle.update` schedules into `#updateVdom`.

```mermaid
graph TB
    subgraph ReactiveData
        A[createReactiveObject] -->|get/set intercept| B[Proxy Handler]
        B -->|nested object| A
        B -->|change callback| C[callback]
    end
    C --> Lifecycle["Lifecycle#update()"]
```

## Module: Lifecycle

Manages the callbacks for the six lifecycle stages and wraps the timing of render, update, and destroy.

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

## Module: Listener (Lazyload / SVG)

```mermaid
graph TB
    subgraph Listener
        A[setLazyloadListener] --> B[IntersectionObserver]
        C[setSvgListener] --> D[MutationObserver]
    end
    B -->|enters viewport| E[loads img src]
    D -->|DOM change| F[replaces SVG attributes]
```

## Module: Built-in Functions

The set of utility functions available in template `{{ }}` interpolation and attribute bindings.

```mermaid
graph TB
    subgraph BuiltinFunctions
        A[calc] --> B["CALC()"]
        C[dateFormat] --> D["DATE()"]
        E[getCamelString] --> F[Attribute name conversion]
        G[removeEmptyTextNode] --> H[DOM cleanup]
        I[getUniqueID] --> J[Anonymous container ID]
    end
```

## Data Flow

The complete request flow from initialization to a rendered update:

```mermaid
sequenceDiagram
    participant App as User Code
    participant QUI as QUI Instance
    participant I18n as i18n Loader
    participant Reactive as Reactive Data
    participant Lifecycle as Lifecycle
    participant VDOM as vDOM Diff/Patch
    participant DOM as Real DOM

    App->>QUI: new QUI(options)
    QUI->>I18n: #geti18nData(body)
    I18n-->>QUI: locale data
    QUI->>Reactive: createReactiveObject(data)
    QUI->>Lifecycle: render(callback)
    Lifecycle->>VDOM: #updateVdom()
    VDOM->>VDOM: #renderChange() compares old/new vDOM
    VDOM->>DOM: #applyPatch() applies minimal diff
    Lifecycle-->>App: rendered

    App->>Reactive: mutate data property
    Reactive->>Lifecycle: trigger update callback
    Lifecycle->>VDOM: #updateVdom()
    VDOM->>DOM: #applyPatch()
    Lifecycle-->>App: updated
```

## State Machine

State transitions of a QUI instance across its lifecycle stages:

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Rendering: new QUI()
    Rendering --> Rendered: beforeRender → rendered
    Rendered --> Updating: data change
    Updating --> Rendered: beforeUpdate → updated
    Rendered --> Destroying: manual destroy
    Destroying --> Destroyed: beforeDestroy → destroyed
    Destroyed --> [*]
```

***

©️ 2024 [邱敬幃 Pardn Chiu](https://www.linkedin.com/in/pardnchiu)
