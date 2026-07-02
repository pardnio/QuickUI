## Lifecycle

```html
<body id="app"></body>
<script>
    const app = new QUI({
        id: "app",
        when: {
            before_render: function () {
                // Stop rendering
                // retuen false 
            },
            rendered: function () {
                // Rendered
            },
            before_update: function () {
                // Stop updating
                // retuen false 
            },
            updated: function () {
                // Updated
            },
            before_destroy: function () {
                // Stop destruction
                // retuen false 
            },
            destroyed: function () {
                // Destroyed
            }
        }
    });
</script>
```