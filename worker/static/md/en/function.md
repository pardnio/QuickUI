## Available Functions

### `LENGTH()`

- index.html
    ```HTML
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
- result
    ```HTML
    <body id="app">
        <p>Total: 4</p>
    </body>
    ```

***

### `CALC()`

- index.html
    ```HTML
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
- result
    ```HTML
    <body id="app">
        <p>calc: 10</p>
    </body>
    ```

***

### `UPPER()` / `LOWER()`

- index.html
    ```HTML
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
- result
    ```HTML
    <body id="app">
        <p>UPPER lower</p>
    </body>
    ```

***

### `DATE(num, format)`

- index.html
    ```HTML
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
- result
    ```HTML
    <body id="app">
        <p>2024-08-17 03:40:47</p>
    </body>
    ```