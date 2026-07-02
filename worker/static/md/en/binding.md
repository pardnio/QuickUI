## Data Binding

```html
<body id="app">
    <input type="password" :model="password">
    <button @click="show">test</button>
</body>
<script>
    const app = new QUI({
        id: "app",
        data: {
            password: null,
        },
        event: {
            show: function(e){
                alert("Password:", app.data.password);
            }
        }
    });
</script>
```