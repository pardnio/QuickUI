## Lazyload

### `:lazyload`

- index.html
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
                lazyload: true // Enable image lazy loading: true|false (default: true)
            }
        });
    </script>
    ```
- result
    ```html
    <body id="app">
        <img src="test.jpg">
    </body>
    ```

***

### `SVG` replacement
- test.svg
    ```XML
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="18" y1="6" x2="6" y2="18" stroke="black" stroke-width="2" stroke-linecap="round"/>
    <line x1="6" y1="6" x2="18" y2="18" stroke="black" stroke-width="2" stroke-linecap="round"/>
    </svg>
    ```
- index.html
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
                svg: true  // Enable SVG file transformation: true|false (default: true)
            }
        });
    </script>
    ```
- result
    ```html
    <body id="app">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="18" y1="6" x2="6" y2="18" stroke="black" stroke-width="2" stroke-linecap="round">
            <line x1="6" y1="6" x2="18" y2="18" stroke="black" stroke-width="2" stroke-linecap="round">
        </svg>
    </body>
    ```