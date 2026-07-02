## Insert Block

> [!NOTE]
> Ensure to disable local file restrictions in your browser or use a live server when testing.

### `:path`

- test.html
    ```html
    <h1>path heading</h1>
    <p>path content</p>
    ```
- index.html
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
- Result
    ```html
    <body id="app">
        <!-- Directly inserted PATH content -->
        <h1>path heading</h1>
        <p>path content</p>
    </body>
    ```