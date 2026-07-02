## Data Fetching

```html
<body id="app">
    <input type="text" :model="test">
    <button @click="get">Test</button>
</body>
<script>
    const app = new QUI({
        id: "app",
        data: {
            // Value bound to the input
            test: 123
        },
        event: {
            get: _ => {
                // Show an alert with the value of test on button click
                alert(app.data.test);
            },
            set: _ => {
                let dom = document.createElement("button");
                // Assign the button click event to the get function
                dom.onclick = app.event.get;
                app.body.append(dom);
            }
        }
    });
</script>
```