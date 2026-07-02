## Planned Deprecations for Version `1.*.*`

> To ensure code style consistency and reduce code size, starting from version 1.0.0, this project will only maintain camelCase properties. Snake_case properties will no longer be supported.

- Lifecycle Methods Consolidated into `when` Object:
    - Removing the `lifecycle` object
    - `when` object will only maintain camelCase properties
    - Removing lifecycle methods directly defined in the QUI object
    - Old syntax:
        ```javascript
        const app = new QUI({
            lifecycle: {
                before_render: _ => {
                    console.log("Preparing to render")
                },
            },
            before_render: _ => {
                console.log("Preparing to render")
            }
        });
        ```
    - New syntax:
        ```javascript
        const app = new QUI({
            when: {
                beforeRender: _ => {
                    console.log("Preparing to render")
                },
            }
        });
        ```
- CSS Properties Standardization:
    - Changing `:borderRadius` to `:border-radius`
    - Changing `:bg-color` to `:background-color`