## Overview

### Text & Content
| Attribute | Use Case | Example |
|-----------|----------|---------|
| `{{value}}` | Dynamic text content | `<p>{{ userName }}</p>` displays user's name |
| `:html` | Raw HTML insertion | `<div :html="richContent"></div>` renders formatted content |

### Template Loading
| Attribute | Use Case | Example |
|-----------|----------|---------|
| `:path` | External template loading | `<temp :path="./templates/header.html"></temp>` loads header component |

### List & Iteration
| Attribute | Use Case | Example |
|-----------|----------|---------|
| `:for` | Array/Object iteration | `<li :for="item in items">{{ item.name }}</li>` renders list items |

### Conditional Rendering
| Attribute | Use Case | Example |
|-----------|----------|---------|
| `:if` | Conditional display | `<div :if="isLoggedIn">Welcome!</div>` |
| `:else-if`/`:elif` | Secondary conditions | `<div :elif="isPending">Loading...</div>` |
| `:else` | Fallback content | `<div :else>Please log in</div>` |

### Form Binding
| Attribute | Use Case | Example |
|-----------|----------|---------|
| `:model` | Two-way data binding | `<input :model="userInput">` syncs with data |

### Styling & Animation
| Attribute | Use Case | Example |
|-----------|----------|---------|
| `:animation` | Transition effects | `<div :animation="fade-in">Content</div>` |
| `:[css]` | Dynamic styling | `<div :background-color="bgColor">Styled content</div>` |

### Dynamic Attributes
| Attribute | Use Case | Example |
|-----------|----------|---------|
| `:[attr]` | Dynamic attributes | `<img :src="imageUrl" :alt="imageDesc">` |

### Event Handling
| Attribute | Use Case | Example |
|-----------|----------|---------|
| `@[event]` | Event listeners | `<button @click="handleClick">Click me</button>` |