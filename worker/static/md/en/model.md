## Model Rendering

- index.html
    ```HTML
    <body>
        <section id="test"></section>
    </body>
    <script>
        document.addEventListener("DOMContentLoaded", async () => {
            const test = await new QUI({
                // id: "test"
                data: {
                    test1: "text test 1",
                    test2: "text test 2",
                    test3: "text test 3",
                },
                event: {
                    test: e => {
                        alert("test");
                    }
                },
                render: _ => `
                    section
                    "{{ test1 }}"
                    div#main-card.primary.highlighted (q-title: "test1" 
                        q-content: "12312312"
                        qe-click: "test"
                        style: "background: red;"
                    ) ["{{ test2 }}"
                        "<br>"
                        "{{ test3 }}"
                    ]`
            }).fragment();

            document.getElementById("test").appendChild(test)

        });
    </script>
    ```
- result
    ```HTML
    <body>
        <section id="test">
            <section></section>
            text test 1
            <div id="main-card" class="primary highlighted" style="background: red;" title="text test 1" content="12312312">
            text test 2<br>text test 3
            </div>
        </section>
    </body>
    ```