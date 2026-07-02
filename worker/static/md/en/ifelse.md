## Conditional Rendering

- index.html
    ```html
    <body id="app">
        <h1 :if="heading == 1">{{ title }} {{ heading }}</h1>
        <h2 :else-if="isH2">{{ title }} {{ heading }}</h2>
        <h3 :else-if="heading == 3">{{ title }} {{ heading }}</h3>
        <h4 :else>{{ title }} {{ heading }}</h4>
    </body>
    <script>
        const app = new QUI({
            id: "app",
            data: {
                heading: [Number|null],
                isH2: [Boolean|null],
                title: "test"
            }
        });
    </script>
    ```
- Result: `heading = 1`
    ```html
    <body id="app">
        <h1>test 1</h1>
    </body>
    ```
- Result: `heading = null && isH2 = true`
    ```html
    <body id="app">
        <h2>test </h2>
    </body>
    ```
- Result: `heading = 3 && isH2 = null`
    ```html
    <body id="app">
        <h3>test 3</h3>
    </body>
    ```
- Result: `heading = null && isH2 = null`
    ```html
    <body id="app">
        <h4>test </h4>
    </body>
    ```