// import { viewer } from "https://cdn.jsdelivr.net/npm/@pardnchiu/nanomd@1.6.0/dist/PDMarkdownKit.module.js";

// document.addEventListener("DOMContentLoaded", async _ => {
//     let pre = "";

//     await fetch('./README.md')
//         .then(response => response.text())
//         .then(data => {
//             pre = data;
//         })
//         .catch(error => {
//             console.error(error);
//         });

//     const app = new PD({
//         id: "app",
//         next: _ => {
//             const dom = new viewer({
//                 id: "PDMDViewer",
//                 emptyContent: pre,
//                 sync: {
//                     delay: 50
//                 }
//             });

//             document.body._child([
//                 dom.body._style({
//                     maxWidth: 1024 + "px"
//                 })._scroll(e => {
//                     const _this = e.target;
//                     "nav".$.$$_class(_this.scrollTop > 0, "min");
//                 })
//             ]);

//             dom.init();
//         }
//     });
// });

import { QUI } from "../../dist/QuickUI.esm.js"

const app = new QUI({
    id: "app",
    data: {
        heading: 1,
        isH2: null,
        html: "<b>test</b>",
        title: "test",
        ary: ["test1", "test2", "test3"],
        array: [1, 2, 3, 4],
        num: 1,
        test1: "upper",
        test2: "LOWER",
        now: Math.floor(Date.now() / 1000),
        string: "test",
        src: "https://img.shields.io/badge/read-English%20Version-ffffff",
        obj: {
            home: {
                name: 'Home',
                click: "click1",
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
            },
            food: {
                name: "Food",
                click: "click2",
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
        }
    },
    event: {
        click: _ => {
            alert("good");
        },
        click1: _ => {
            alert("good1");
        },
        click2: _ => {
            alert("good2");
        },
        input: _ => {
            console.log(app.data)
        }
    },
    before_render: _ => {
        console.log("準備渲染")
        // return false;
    },
    rendered: _ => {
        // setTimeout(_ => {

        //     app.data.heading = 3
        // }, 1000)
        // setTimeout(_ => {

        //     app.data.isH2 = true
        //     app.data.obj.home.ary[0].name = "Test"

        // }, 2000)
        console.log("已渲染")
    },
    before_update: _ => {
        console.log("準備更新")
        // alert(true)
        // return false;
    },
    updated: _ => {
        console.log("已更新")
    }
});