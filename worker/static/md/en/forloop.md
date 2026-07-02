## Loop Rendering

### `:for`

- index.html
    ```html
    <body id="app">
        <ul>
            <li :for="(item, index) in ary" :id="item" :index="index">{{ item }} {{ CALC(index + 1) }}</li>
        </ul>
    </body>
    <script>
        const app = new QUI({
            id: "app",
            data: {
                ary: ["test1", "test2", "test3"]
            }
        });
    </script>
    ```
- Result
    ```html
    <body id="app">
        <li id="test1" index="0">test1 1</li>
        <li id="test2" index="1">test2 2</li>
        <li id="test3" index="2">test3 3</li>
    </body>
    ```

***

### Nest loop

- index.html
    ```html
    <body id="app">
    <ul>
        <li :for="(key, val) in obj">
            {{ key }}: {{ val.name }}
            <ul>
                <li :for="item in val.ary">
                    {{ item.name }}
                    <ul>
                        <li :for="(item1, index1) in item.ary1">
                            {{ CALC(index1 + 1) }}. {{ item1.name }} - ${{ item1.price }}
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
    </body>
    <script>
        const app = new QUI({
            id: "app",
            data: {
                obj: {
                    food: {
                        name: "Food",
                        ary: [
                            {
                                name: 'Snacks',
                                ary1: [
                                    { name: 'Potato Chips', price: 10 },
                                    { name: 'Chocolate', price: 8 }
                                ]
                            },
                            {
                                name: 'Beverages',
                                ary1: [
                                    { name: 'Juice', price: 5 },
                                    { name: 'Tea', price: 3 }
                                ]
                            }
                        ]
                    },
                    home: {
                        name: 'Home',
                        ary: [
                            {
                                name: 'Furniture',
                                ary1: [
                                    { name: 'Sofa', price: 300 },
                                    { name: 'Table', price: 150 }
                                ]
                            },
                            {
                                name: 'Decorations',
                                ary1: [
                                    { name: 'Picture Frame', price: 20 },
                                    { name: 'Vase', price: 15 }
                                ]
                            }
                        ]
                    }
                }
            }
        });
    </script>
    ```
- Result
    ```html
    <body id="app">
    <ul>
        <li>food: Food
            <ul>
                <li>Snacks
                    <ul>
                        <li>1. Potato Chips - $10</li>
                        <li>2. Chocolate - $8</li>
                    </ul>
                    </li>
                <li>Beverages
                    <ul>
                        <li>1. Juice - $5</li>
                        <li>2. Tea - $3</li>
                    </ul>
                </li>
            </ul>
        </li>
        <li>home: Home
            <ul>
                <li>Furniture
                    <ul>
                        <li>1. Sofa - $300</li>
                        <li>2. Table - $150</li>
                    </ul>
                </li>
                <li>Decorations
                    <ul>
                        <li>1. Picture Frame - $20</li>
                        <li>2. Vase - $15</li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
    </body>
    ```