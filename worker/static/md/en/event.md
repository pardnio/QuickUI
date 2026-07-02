## Event Detection

```html
<body id="app">
    <button @click="test">test</button>
</body>
<script>
    const app = new QUI({
        id: "app",
        event: {
            test: function(e){
                alert(e.target.innerText + " clicked");
            }
        }
    });
</script>
```