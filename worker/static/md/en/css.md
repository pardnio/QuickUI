## CSS Settings

> [!NOTE]
> Supports simple settings using `:[CSS property]`, directly binding data to style attributes.

- index.html
    ```html
    <body id="app">
        <button :width="width" :backdround-color="color">test</button>
    </body>
    <script>
        const app = new QUI({
            id: "app",
            data: {
                width: "100px",
                color: "red"
            }
        });
    </script>
    ```
- Result:
    ```html
    <body id="app">
        <button style="width: 100px; backdround-color: red;">test</button>
    </body>
    ```