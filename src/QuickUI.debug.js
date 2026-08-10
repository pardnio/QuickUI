"use strict";
const $document = document;
const $String = String;
const $Number = Number;
const $Array = Array;
const $Object = Object;
const $Boolean = Boolean;
const $JSON = JSON;
const $URL = URL;
const $Date = Date;
const $Math = Math;
const $RegExp = RegExp;
const $Promise = Promise;
const $Node = Node;
const $parseInt = parseInt;
const $isNaN = isNaN;
const $structuredClone = structuredClone;
const $setTimeout = setTimeout;
const $IntersectionObserver = IntersectionObserver;
const regexText = /\{\{\s*(((CALC|LENGTH|UPPER|LOWER|DATE)\(\s*[\w\.\s\+\-\*\/\,\s\/\\:]+\s*\))|[\w\.]+)\s*\}\}/i;
// const regexText_ALL = new RegExp(regexText, "gi");
// const REGEX_FUNC = /(CALC|LENGTH|UPPER|LOWER)\(([\w\.]+)\s*([\+\-\*\/\%]+)\s*([\d\.]+)\)/;
// const REGEX_DATE = /DATE\(([\w\.]+)\s*,\s*([^\n]+)\)/;
// const REGEX_FOR_VAL0 = /^\(?\s*([\w]+)(\s*\,|\s+)?/i;           // [VAL0] in val1 / ([VAL0], val1) in val2
// const REGEX_FOR_VAL1 = /\,\s*([\w]+)\s*\)/i;                    // (val0, [VAL1]) in val2
const regexForVal2 = /\s+([\w\.]+)\s*$/i; // (val0, val1) in [VAL2]
const regexCompare = /\s*[\!\>\<\=]+\=*\s*/; // A [==] B / A [>=] B / A [>] B
const regexCalc = /([\w\.]+)\s*([\+\-\*\/\%])\s*([\d\.]+)/; // A [+] B / A [-] B / A [*] B
const regex_css_class = /\.([\w_-]+)?/gi;
const regex_css_id = /\#([\w_-]+)?/i;
const regex_css_tag = /^\w+(?=[\#\.]*)/i;
const tagPath = ":path";
const tagFor = ":for";
const tagIf = ":if";
const tagElseIf = ":else-if";
const tagElif = ":elif";
const tagElse = ":else";
const tagModel = ":model";
const tagHtml = ":html";
const _add = "add";
const _addEventListener = "addEventListener";
const _animation = "animation";
const _anonymous = "anonymous";
const _appendChild = "appendChild";
const _attributes = "attributes";
const _body = "body";
const _charAt = "charAt";
const _childNodes = "childNodes";
const _children = "children";
const _class = "class";
const _classList = "classList";
const _cloneNode = "cloneNode";
const _contains = "contains";
const _createDocumentFragment = "createDocumentFragment";
const _createElement = "createElement";
const _createTextNode = "createTextNode";
const _crossOrigin = "crossOrigin";
const _data = "data";
const _dismiss = "dismiss";
const _display = "display";
const _effect = "effect";
const _ELEMENT_NODE = "ELEMENT_NODE";
const _error = "error";
const _event = "event";
const _filter = "filter";
const _floor = "floor";
const _forEach = "forEach";
const _from = "from";
const _get = "get";
const _getAttribute = "getAttribute";
const _getElementById = "getElementById";
const _has = "has";
const _head = "head";
const _headers = "headers";
const _hide = "hide";
const _href = "href";
const _html = "html";
const _id = "id";
const _Image = "Image";
const _includes = "includes";
const _index = "index";
const _indexOf = "indexOf";
const _innerHTML = "innerHTML";
const _isArray = "isArray";
const _join = "join";
const _key = "key";
const _keys = "keys";
const _lazyload = "lazyload";
const _length = "length";
const _toLowerCase = "toLowerCase";
const _map = "map";
const _mask = "mask";
const _match = "match";
const _minHeight = "minHeight";
const _next = "next";
const _nodeType = "nodeType";
const _now = "now";
const _observe = "observe";
const _option = "option";
const _parentElement = "parentElement";
const _parentNode = "parentNode";
const _parse = "parse";
const _Position = "Position";
const _previousElementSibling = "previousElementSibling";
const _props = "props";
const _push = "push";
const _querySelectorAll = "querySelectorAll";
const _random = "random";
const _remove = "remove";
const _removeAttribute = "removeAttribute";
const _removeChild = "removeChild";
const _render = "render";
const _replace = "replace";
const _replaceChildren = "replaceChildren";
const _script = "script";
const _scrollHeight = "scrollHeight";
const _setAttribute = "setAttribute";
const _set = "set";
const _shift = "shift";
const _show = "show";
const _slice = "slice";
const _splice = "splice";
const _split = "split";
const _src = "src";
const _startsWith = "startsWith";
const _stringify = "stringify";
const _string = "string";
const _style = "style";
const _svg = "svg";
const _tag = "tag";
const _tagName = "tagName";
const _temp = "temp";
const _test = "test";
const _TEXT_NODE = "TEXT_NODE";
const _textContent = "textContent";
const _toString = "toString";
const _toUpperCase = "toUpperCase";
const _trim = "trim";
const _type = "type";
const _unobserve = "unobserve";
const _value = "value";
const _vdom = "vdom";
const copyright = `QuickUI\nGitHub: https://github.com/pardnchiu/QuickUI\nCreator: Pardn Chiu\nLicense: Proprietary`;
const copyright_style = `line-height: 1.75rem; font-size: 0.875rem;`;
const prop_if_else = {
  [tagIf]: null,
  [tagElseIf]: null,
  [tagElif]: null,
  [tagElse]: null,
};
const prop_html = {
  ":id": "id",
  ":src": _src,
  ":alt": "alt",
  ":href": "href",
  tagHtml: "innerHTML",
};
// ! 1.*.* 版本中移除
const prop_css = {
  ":margin": "margin",
  ":padding": "padding",
  ":border": "border",
  ":border-radius": "borderRadius",
  ":outline": "outline",
  ":box-sahdow": "boxShadow",
  ":background-image": "backgroundImage",
  ":background-attachment": "backgroundAttachment",
  ":background-blend-mode": "backgroundBlendMode",
  ":background-clip": "backgroundClip",
  ":background-origin": "backgroundOrigin",
  ":background-position": "backgroundPosition",
  ":background-position-x": "backgroundPositionX",
  ":background-position-y": "backgroundPositionY",
  ":background-repeat": "backgroundRepeat",
  ":background-size": "backgroundSize",
  ":background-color": "backgroundColor",
  ":color": "color",
  // ! 1.*.* 版本移除
  ":bg-image": "backgroundImage",
  ":bg-attachment": "backgroundAttachment",
  ":bg-blend-mode": "backgroundBlendMode",
  ":bg-clip": "backgroundClip",
  ":bg-origin": "backgroundOrigin",
  ":bg-position": "backgroundPosition",
  ":bg-position-x": "backgroundPositionX",
  ":bg-position-y": "backgroundPositionY",
  ":bg-repeat": "backgroundRepeat",
  ":bg-size": "backgroundSize",
  ":bg-color": "backgroundColor",
  ":borderRadius": "borderRadius",
  ":boxSahdow": "boxShadow",
  ":backgroundImage": "backgroundImage",
  ":backgroundAttachment": "backgroundAttachment",
  ":backgroundBlendMode": "backgroundBlendMode",
  ":backgroundClip": "backgroundClip",
  ":backgroundOrigin": "backgroundOrigin",
  ":backgroundPosition": "backgroundPosition",
  ":backgroundPositionX": "backgroundPositionX",
  ":backgroundPositionY": "backgroundPositionY",
  ":backgroundRepeat": "backgroundRepeat",
  ":backgroundSize": "backgroundSize",
  ":backgroundColor": "backgroundColor",
};
const lifecycleAction = {
  beforeRender: "beforeRender",
  beforeUpdate: "beforeUpdate",
  beforeDestroy: "beforeDestroy",
  rendered: "rendered",
  updated: "updated",
  destroyed: "destroyed",
  // ! 1.*.* 移除
  before_render: "before_render",
  before_update: "before_update",
  before_destroy: "before_destroy",
};
const patchAction = {
  create: "CREATE",
  append: "APPEND",
  replace: "REPLACE",
  text: "TEXT",
  prop: "PROP",
  remove: "REMOVE",
};
const error = {
  notExist: {
    domId: "ID: 未提供。",
    dom: "元素: 不存在。",
    vdomModel: "虛擬 DOM: 未初始化。",
    vdomTemp: "虛擬 DOM: 未創建。",
  },
};
function dom_tag(name) {
  return `*[dom-tag='${name}']`;
}
// ! 1.*.* 移除 animation =
$document[_head][_appendChild](
  createElement(
    "style",
    `
*[\\:effect="fade-in"],
*[effect="fade-in"] {
    opacity: 0;
    transition: opacity 0.3s ease-in 0s;
}

*[\\:effect="fade-in"].show,
*[effect="fade-in"].show {
    opacity: 1;
}

*[\\:effect="expand"],
*[effect="expand"] {
    min-height: 0;
    height: 0;
    overflow: hidden;
    transition: min-height 0.3s ease-in 0s;
}

*[\\:effect="expand"].show,
*[effect="expand"].show {
    opacity: 1;
}

*[\\:animation="fade-in"],
*[animation="fade-in"] {
    opacity: 0;
    transition: opacity 0.3s ease-in 0s;
}

*[\\:animation="fade-in"].show,
*[animation="fade-in"].show {
    opacity: 1;
}

*[\\:animation="expand"],
*[animation="expand"] {
    min-height: 0;
    height: 0;
    overflow: hidden;
    transition: min-height 0.3s ease-in 0s;
}

*[\\:animation="expand"].show,
*[animation="expand"].show {
    opacity: 1;
}

*[\\:mask="1=true"],
*[mask="true"],
*[\\:mask="1"],
*[mask="1"] {
    position: relative;
}

*[\\:mask="1=true"]::after,
*[mask="true"]::after,
*[\\:mask="1"]::after,
*[mask="1"]::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to right, #e0e0e0 25%, #f0f0f0, #e0e0e0 75%);
    /* 使用灰色漸層 */
    background-size: 200% 100%;
    /* 背景尺寸兩倍寬度 */
    animation: loading-animation 1.5s infinite alternate;
    /* 來回移動動畫 */
    z-index: 10;
    transition: 0.3s;
}

*[\\:mask="1=true"]::after,
*[mask="true"]::after,
*[\\:mask="1"].show::after,
*[mask="1"].show::after {
    opacity: 0;
}

@keyframes loading-animation {
    0% {
        background-position: -100% 0;
    }

    100% {
        background-position: 100% 0;
    }
}

img[lazyload]:not([lazyload=""]):[effect="circle"] {
    animation: spin 2s ease-in-out infinite;
    width: 1.25rem !important;
    height: 1.25rem !important;
}

img[lazyload]:not([lazyload=""]):not([effect="circle"]) {
    min-width: 1.25rem !important;
    min-height: 1.25rem !important;
    border-radius: 0.625rem !important;
    background: linear-gradient(90deg, #e0e0e0 15%, #f0f0f0, #e0e0e0 85%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes shimmer {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}`,
  ),
);
const svgLoading = `
data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzI1OTVfMzA1OSkiPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE2IDEwQzE2IDExLjc3NyAxNS4yMjc1IDEzLjM3MzYgMTQgMTQuNDcyMkMxMi45Mzg1IDE1LjQyMjMgMTEuNTM2NyAxNiAxMCAxNlYyMEMxMS40MjIyIDIwIDEyLjc3NTEgMTkuNzAzMSAxNCAxOS4xNjc5QzE3LjUzMTggMTcuNjI0OCAyMCAxNC4xMDA2IDIwIDEwQzIwIDUuODk5MzYgMTcuNTMxOCAyLjM3NTIgMTQgMC44MzIwODdDMTIuNzc1MSAwLjI5Njg5NSAxMS40MjIyIDAgMTAgMFY0QzExLjUzNjcgNCAxMi45Mzg1IDQuNTc3NzEgMTQgNS41Mjc3OUMxNS4yMjc1IDYuNjI2NDMgMTYgOC4yMjMgMTYgMTBaIiBmaWxsPSIjMzQ5OERCIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNCAxMEM0IDExLjc3NyA0Ljc3MjUgMTMuMzczNiA2IDE0LjQ3MjJDNy4wNjE1MSAxNS40MjIzIDguNDYzMjkgMTYgMTAgMTZWMjBDOC41Nzc3OSAyMCA3LjIyNDkyIDE5LjcwMzEgNiAxOS4xNjc5QzIuNDY4MTkgMTcuNjI0OCAwIDE0LjEwMDYgMCAxMEMwIDUuODk5MzYgMi40NjgxOSAyLjM3NTIgNiAwLjgzMjA4N0M3LjIyNDkyIDAuMjk2ODk1IDguNTc3NzkgMCAxMCAwVjRDOC40NjMyOSA0IDcuMDYxNTEgNC41Nzc3MSA2IDUuNTI3NzlDNC43NzI1IDYuNjI2NDMgNCA4LjIyMyA0IDEwWiIgZmlsbD0iI0Q5RDlEOSIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzI1OTVfMzA1OSI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K
`;
const gifEmpty = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20px' height='20px'/%3E";
document.addEventListener("DOMContentLoaded", (_) => {
  printLog("log", "%c" + copyright, copyright_style);
});
function calc(value0, operator, value1) {
  value0 = $Number(value0);
  value1 = $Number(value1);
  if ($isNaN(value0) || $isNaN(value1)) {
    return;
  } else if (operator === "+") {
    return value0 + value1;
  } else if (operator === "-") {
    return value0 - value1;
  } else if (operator === "*") {
    return value0 * value1;
  } else if (operator === "/") {
    return value0 / value1;
  } else if (operator === "%") {
    return value0 % value1;
  } else {
    return value0;
  }
}
async function check200(path, isImg = false) {
  // let response: any;
  // 先檢查是否可訪問
  try {
    const check = await fetch(path, {
      method: "HEAD",
      mode: "cors", // 明確指定 CORS mode
    });
    // 如果能走到這一步，代表不是跨域問題
    // 那麼再判斷是否 404
    return await realFetch(path, isImg);
  } catch (err) {
    throw err;
  }
}
// 實際的 fetch 邏輯
async function realFetch(path, isImg) {
  return new Promise(async (cb, rej) => {
    try {
      const response = await fetch(path);
      if (response.ok) {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.startsWith("image")) {
          if (contentType == "image/svg+xml" && !isImg) {
            cb(response);
            return;
          }
          const blob = await response.blob();
          const img = new Image();
          const src = URL.createObjectURL(blob);
          img.src = src;
          img.crossOrigin = "anonymous";
          img.onload = (_) =>
            cb({
              src: src,
              img: img,
            });
          img.onerror = (err) => {
            URL.revokeObjectURL(src);
            throw err;
          };
        } else {
          cb(response);
        }
      } else {
        rej(new Error(`HTTP error`));
      }
    } catch (err) {
      rej(err);
    }
  });
}
function createElement(tag = "", val0, val1) {
  const css_tag = ((tag[_match](regex_css_tag) || [])[0] || "")[_trim]();
  const css_id = ((tag[_match](regex_css_id) || [])[1] || "")[_trim]();
  const css_class = (regex_css_class[_test](tag) ? tag[_match](regex_css_class) || [] : [])[_map]((e) =>
    e[_replace](/^\./, ""),
  );
  // const init = ($document as any)[_init];
  // const Creator = ($document as any)[_Creator];
  if (css_tag[_length] < 1) {
    return;
  }
  let dom;
  let isTemp = false;
  if (tag === "temp") {
    isTemp = true;
    dom = $document[_createDocumentFragment]();
  } else {
    dom = $document[_createElement](css_tag);
  }
  // if (!init || init != location[_href] || !Creator || Creator != _Pardn_Chiu) {
  //     return dom;
  // };
  if (css_id[_length]) {
    dom[_id] = css_id;
  }
  for (let e of css_class) {
    dom[_classList][_add](e);
  }
  if (val0 == null && val1 != null) {
    [val0, val1] = [val1, null];
  }
  let attribute_value;
  let children_value;
  if (val0 != null && val1 != null) {
    [attribute_value, children_value] = [val0, val1];
  } else if (val1 == null) {
    if (typeof val0 === "string" || typeof val0 === "number" || $Array[_isArray](val0)) {
      children_value = val0;
    } else {
      attribute_value = val0;
    }
  } else if (val0 == null) {
    return dom;
  }
  if (typeof attribute_value === "object" && attribute_value != null) {
    for (const e in attribute_value) {
      if (!attribute_value["hasOwnProperty"](e)) {
        continue;
      }
      const value = attribute_value[e];
      if (["value", "innerText", _innerHTML, "textContent", "contentEditable"][_indexOf](e) != -1) {
        dom[e] = value;
      } else if (["color", "backgroundColor", "width", "height", "display", "float"][_indexOf](e) != -1) {
        dom[_style][e] = value;
      } else if (value != null) {
        dom[_setAttribute](e, value);
      }
    }
  }
  if (children_value != null) {
    const is_string = typeof children_value === "string";
    const is_number = typeof children_value === "number";
    const is_array = $Array[_isArray](children_value);
    if (is_string || is_number) {
      const value = children_value;
      const is_img = css_tag === "img";
      const is_source = css_tag === "source";
      if (is_img || is_source) {
        dom[_src] = value;
      } else if (isTemp) {
        dom[_appendChild]($document[_createTextNode](children_value));
      } else {
        dom[_innerHTML] = value;
      }
    } else if (is_array) {
      for (let e of children_value) {
        const is_string = typeof e === "string";
        const is_number = typeof e === "number";
        const is_element = e instanceof Element;
        if (is_string || is_number) {
          dom[_appendChild]($document[_createTextNode]($String(e)));
        } else if (is_element) {
          dom[_appendChild](e);
        }
      }
    }
  }
  return dom;
}
function createReactiveObject(obj, path, callback) {
  // 遞迴代理巢狀物件
  return new Proxy(obj, {
    get(target, property, receiver) {
      const value = Reflect[_get](target, property, receiver);
      const newPath = path ? `${path}.${property[_toString]()}` : property[_toString]();
      // 如果屬性是物件，遞迴代理，讓子項目也能偵測變化
      if (typeof value === "object" && value !== null) {
        return createReactiveObject(value, newPath, callback); // 遞迴代理巢狀物件
      }
      return value;
    },
    set(target, property, newValue, receiver) {
      const oldValue = target[property];
      const result = Reflect[_set](target, property, newValue, receiver);
      const newPath = path ? `${path}.${property[_toString]()}` : property[_toString]();
      // 如果新值不同於舊值，則觸發回調
      if (oldValue !== newValue) {
        callback(newPath, newValue, oldValue);
      }
      return result;
    },
  });
}
function dateFormat(num, format = "yyyy/MM/DD (ddd) HH:mm:ss") {
  const date = new Date(num * 1000);
  const y = $String(date.getFullYear());
  const M = $String(date.getMonth() + 1);
  const D = $String(date.getDate());
  const d = $String(date.getDay());
  const H = $String(date.getHours());
  const m = $String(date.getMinutes());
  const s = $String(date.getSeconds());
  const ms = $String(date.getMilliseconds());
  let map = {
    YYYY: y,
    yyyy: y,
    YY: y[_slice](-2),
    yy: y[_slice](-2),
    Y: y[_slice](-2),
    y: y[_slice](-2),
    M: M,
    MM: ("0" + M)[_slice](-2),
    D: D,
    DD: ("0" + D)[_slice](-2),
    d: d,
    dd: ("0" + d)[_slice](-2),
    H: H,
    HH: ("0" + H)[_slice](-2),
    h: $String($parseInt(H) % 12 || 12),
    hh: ("0" + ($parseInt(H) % 12 || 12))[_slice](-2),
    m: m,
    mm: ("0" + m)[_slice](-2),
    s: s,
    ss: ("0" + s)[_slice](-2),
    SSS: ("00" + ms)[_slice](-3),
    a: $parseInt(H) >= 12 ? "pm" : "am",
    A: $parseInt(H) >= 12 ? "PM" : "AM",
  };
  const isZh = /zh/.test(navigator.language || "");
  const dayMap = isZh
    ? ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
    : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  map.ddd = dayMap[$parseInt(d)][_slice](0, 3);
  map.dddd = dayMap[$parseInt(d)];
  return format.replace(/YYYY|YY|Y|yyyy|yy|y|MM|M|DD|D|HH|H|hh|h|mm|m|ss|s|SSS|a|A|ddd|dddd/g, (e) => map[e]);
}
function getCamelString(text) {
  // 使用正則表達式將連字符轉換為空格
  let spacedStr = text[_toString]()[_replace](/^\:/g, "")[_replace](/-+/g, " ");
  // 將每個單詞的首字母轉換為大寫
  let camelCaseStr = spacedStr[_replace](/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    return index === 0 ? word[_toLowerCase]() : word[_toUpperCase]();
  });
  // 移除空格
  return camelCaseStr[_replace](/\s+/g, "");
}
function getElementAttributes(dom) {
  return [...dom.attributes].reduce((acc, e) => {
    acc[e.name] = e.value.trim();
    return acc;
  }, {});
}
function getElementIndex(dom) {
  if (dom == null || dom[_parentElement] == null) {
    return;
  }
  let index = 0;
  let node = dom;
  while ((node = node[_previousElementSibling]) != null) {
    index++;
  }
  return index;
}
let unique_id_map = new Map();
function getUniqueID(length) {
  const char = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const len = char[_length];
  let result = "";
  do {
    result = $Array[_from]({ length }, (_) => char[_charAt]($Math[_floor]($Math[_random]() * len)))[_join]("");
  } while (unique_id_map[_has](result));
  unique_id_map[_set](result, 1);
  return result;
}
// * 渲染成 HTML
function htmlParser(input) {
  const origin = input[_trim]();
  // [_replace](/\s*([\(\)\{\}\[\]\:,])\s*/g, "$1")
  // .replace(/([A-Za-z0-9])\s*(\")/g, "$1$2")
  // .replace(/(\")\s*([A-Za-z0-9])/g, "$1$2")
  // .replace(/(\")\s*(\")/g, "$1$2");
  const result = parseToObject(origin);
  const element = parseToHTML(result);
  return element;
}
function parseToObject(input) {
  const result = [];
  let i = 0;
  while (i < input[_length]) {
    const htmlTag = parseTagWithIdAndClass(input, i);
    const htmlTagExist = htmlTag != null && htmlTag && htmlTag?.tag[_length];
    if (htmlTagExist) {
      i = htmlTag[_next];
      let model = {
        [_tag]: htmlTag[_tag],
        [_id]: htmlTag[_id],
        [_class]: htmlTag[_class],
        [_attributes]: {},
      };
      if (!htmlTag.config || i >= input.length) {
        result[_push](model);
        continue;
      }
      if (input[i] === "\(") {
        const attribute = parseAttributes(input, i);
        model[_attributes] = attribute[_value];
        i = attribute[_next];
      }
      if (input[i] === "\[") {
        const children = parseChildren(input, i);
        if (children[_value].length > 0) {
          model[_children] = children[_value];
        }
        i = children[_next];
      }
      result[_push](model);
    }
    const text = parseQuotedString(input, i);
    const textExist = text[_value] != null;
    if (textExist) {
      result[_push](text[_value]);
      i = text[_next];
    }
    i++;
  }
  return result;
}
// 將解析後的物件結構轉換成 HTML 字串
function parseToHTML(result) {
  const temp = createElement(_temp);
  if (!$Array[_isArray](result)) {
    return temp;
  }
  for (let e of result) {
    if (result == null) {
      continue;
    }
    const tag =
      e[_tag] + (e[_id] == null ? "" : "#" + e[_id]) + (e[_class] == null ? "" : "." + e[_class][_replace](/\s/g, "."));
    const dom = typeof e === "string" ? $document[_createTextNode](e) : createElement(tag, e[_attributes] || {});
    if (dom == null) {
      continue;
    }
    if (typeof e !== "string") {
      dom[_appendChild](parseToHTML(e[_children]));
      temp[_appendChild](dom);
    } else {
      let elm = $document[_createElement]("section");
      elm.innerHTML = e;
      for (let a of [...elm.childNodes]) {
        if (a.nodeType === Node.TEXT_NODE) {
          const textContent = String(a.nodeValue).trim();
          const dom = $document[_createTextNode](textContent);
          temp[_appendChild](dom);
        } else {
          temp[_appendChild](a);
        }
      }
    }
  }
  return temp;
}
// 修改 parseTagWithIdAndClass 函數來處理兩種語法
function parseTagWithIdAndClass(input, startIndex) {
  let i = startIndex;
  let tag = "";
  let id = "";
  let className = "";
  let classList = [];
  let is_id = false;
  let is_class = false;
  if (input[i] === '"' || i >= input.length) {
    return {
      [_tag]: tag[_trim](),
      [_id]: id || null,
      [_class]: className || null,
      [_next]: i,
      config: false,
    };
  }
  while (i < input.length) {
    if (/[\s\,]/[_test](input[i]) && !/\n/[_test](input[i])) {
      i++;
    }
    if (input[i] == null) {
      return {
        [_tag]: tag[_trim](),
        [_id]: id || null,
        [_class]: className || null,
        [_next]: i,
        config: false,
      };
    } else if (/[a-zA-Z0-9\_\-]/[_test](input[i]) && !is_id && !is_class) {
      tag += input[i];
      i++;
    } else if (input[i] === "#") {
      is_id = true;
      i++;
    } else if (is_id && /[a-zA-Z0-9\_\-]/[_test](input[i])) {
      id += input[i];
      i++;
    } else if (input[i] === ".") {
      is_id = false;
      is_class = true;
      i++;
      let str = "";
      let j = i;
      while (/[a-zA-Z0-9_-]/[_test](input[j])) {
        str += input[j];
        j++;
      }
      is_class = false;
      classList[_push](str);
      className = classList[_join](" ");
      i = j;
    } else if (/[\n\"\(\[]/[_test](input[i])) {
      return {
        [_tag]: tag[_trim](),
        [_id]: id || null,
        [_class]: className || null,
        [_next]: i,
        config: true,
      };
    } else {
      i++;
    }
  }
  return {
    [_tag]: tag[_trim](),
    [_id]: id || null,
    [_class]: className || null,
    [_next]: i,
    config: false,
  };
}
function parseQuotedString(input, startIndex) {
  let i = startIndex;
  let result = "";
  if (input[i] !== '"') {
    return {
      [_value]: result,
      [_next]: i,
    };
  }
  // * 略過第一個 "
  i++;
  while (i < input.length) {
    // * 略過空白
    if (/\s/[_test](input[i])) {
      i++;
    } else if (input[i] !== '"') {
      result += input[i];
      i++;
    } else {
      break;
    }
  }
  // * 略過最後一個 "
  i++;
  return {
    [_value]: result,
    [_next]: i,
  };
}
function parseAttributes(input, startIndex) {
  let i = startIndex;
  let record = {};
  let key = "";
  if (input[i] !== "\(") {
    return {};
  }
  // * 略過第一個 (
  i++;
  while (i < input[_length]) {
    // * 略過空白
    if (/[\s\:]/[_test](input[i])) {
      i++;
    } else if (/\"/[_test](input[i])) {
      const result = parseQuotedString(input, i);
      record[key] = result.value;
      key = "";
      i = result[_next];
    } else if (/[A-Za-z0-9\-\_]/[_test](input[i])) {
      key += input[i];
      i++;
    } else if (input[i] === "\)" && input[i - 1] !== "\\") {
      break;
    } else {
      i++;
    }
  }
  // * 略過最後一個 (
  i++;
  if (/[\s]/[_test](input[i])) {
    i++;
  }
  return {
    [_value]: record,
    [_next]: i,
  };
  // if (!/\s*\(/[_test](input[i])) {
  //     return {};
  // };
  // while (/[\s\()]/[_test](input[i])) {
  //     i++;
  // };
  // while (!/\)/[_test](input[i])) {
  //     if (/\s/[_test](input[i])) {
  //         i++;
  //         continue;
  //     };
  //     if (/[A-Za-z0-9\-\_]/[_test](input[i])) {
  //         key += input[i];
  //     }
  //     else if (input[i] === "\"") {
  //         // i++;
  //         const valueResult = parseQuotedString(input, i);
  //         record[key] = valueResult.value;
  //         // while (/[\s]/[_test](input[i])) {
  //         //     i++;
  //         // };
  //         // const valueResult = parseQuotedString(input, i);
  //         i = valueResult[_next] - 1;
  //         // record[key] = valueResult[_value];
  //         key = "";
  //     };
  //     i++;
  // };
  // return {
  //     [_value]: record,
  //     [_next]: i
  // }
}
function parseChildren(input, startIndex) {
  let i = startIndex;
  let result = [];
  let level = 0;
  let buffer = "";
  if (input[i] !== "\[") {
    return {
      [_value]: result,
      [_next]: i + 1,
    };
  }
  // * 略過第一個 (
  i++;
  while (i < input[_length]) {
    const char = input[i];
    if (char === "[") {
      level++;
      // buffer += char;
    } else if (char === "]") {
      if (level === 0) {
        // if (buffer.trim()) {
        //     result = parseToObject(buffer);
        // };
        break;
      }
      level--;
      // buffer += char;
    }
    // if (char === "\"") {
    //     const r = parseQuotedString(input, i);
    //     result.push(r.value);
    //     i = r[_next];
    // }
    // else {
    const htmlTag = parseTagWithIdAndClass(input, i);
    const htmlTagExist = htmlTag != null && htmlTag && htmlTag?.tag[_length];
    if (htmlTagExist) {
      i = htmlTag[_next];
      let model = {
        [_tag]: htmlTag[_tag],
        [_id]: htmlTag[_id],
        [_class]: htmlTag[_class],
        [_attributes]: {},
      };
      if (!htmlTag.config || i >= input.length) {
        result[_push](model);
        continue;
      }
      if (input[i] === "\(") {
        const attribute = parseAttributes(input, i);
        model[_attributes] = attribute[_value];
        i = attribute[_next];
      }
      if (input[i] === "\[") {
        const children = parseChildren(input, i);
        if (children[_value].length > 0) {
          model[_children] = children[_value];
        }
        i = children[_next];
      }
      result[_push](model);
    }
    const text = parseQuotedString(input, i);
    const textExist = text[_value] != null;
    if (textExist) {
      result[_push](text[_value]);
      i = text[_next];
    }
    // }
    // if (char === "[") {
    //     level++;
    //     // buffer += char;
    // }
    // else if (char === "]") {
    //     if (level === 0) {
    //         // if (buffer.trim()) {
    //         //     result = parseToObject(buffer);
    //         // };
    //         break;
    //     }
    //     level--;
    //     // buffer += char;
    // }
    // else {
    //     // buffer += char;
    // };
    i++;
  }
  // while (/\s/[_test](input[i])) {
  //     i++;
  // };
  // while (input[i] !== "[") {
  //     i++;
  // };
  // i++;
  // while (i < input[_length]) {
  //     const char = input[i];
  //     // if (char === "[" || char === "{") {
  //     if (char === "[") {
  //         level++;
  //         buffer += char;
  //     }
  //     else if (char === "]") {
  //         if (level === 0) {
  //             if (buffer.trim()) {
  //                 result = parseToObject(buffer);
  //             }
  //             break;
  //         }
  //         level--;
  //         buffer += char;
  //     }
  //     // else if (char === "}") {
  //     //     level--;
  //     //     buffer += char;
  //     // }
  //     else {
  //         buffer += char;
  //     }
  //     i++;
  // };
  return {
    [_value]: result,
    [_next]: i,
  };
}
function printLog(type, ...args) {
  const dom = createElement(_script, `console.${type}.apply(void 0, ${$JSON[_stringify](args)});`);
  $document[_body][_appendChild](dom);
  dom[_remove]();
}
function removeEmptyTextNode(element) {
  return $Array[_from](element[_childNodes]).filter(
    (e) =>
      e[_nodeType] === $Node[_ELEMENT_NODE] ||
      (e[_nodeType] === $Node[_TEXT_NODE] && e[_textContent] && e[_textContent][_trim]()[_length] > 0),
  );
}
let lazyloadListener;
let lazyloadObserver;
function setLazyloadListener() {
  if (lazyloadListener != null) {
    return;
  }
  lazyloadObserver = new $IntersectionObserver((entries, _) => {
    const toLoad = [];
    for (let e of entries) {
      const dom = e.target;
      if (!e.isIntersecting) {
        continue;
      }
      lazyloadObserver[_unobserve](dom);
      const src = (dom[_getAttribute](_lazyload) || "")[_trim]();
      if (src[_length] > 0) {
        toLoad.push({ dom, src });
      }
    }
    // 批量處理圖片載入
    Promise.all(
      toLoad.map(({ dom, src }) =>
        check200(src, true)
          .then((res) => {
            dom[_src] = res[_src];
          })
          .catch((err) => {
            if ((err instanceof TypeError && err.message.includes("Load failed")) || err instanceof Event) {
              dom[_src] = src;
            } else {
              dom[_src] = "https://cdn.jsdelivr.net/gh/pardnchiu/PDRenderKit@latest/static/image/404.svg";
            }
          })
          .finally(() => {
            dom[_removeAttribute](_lazyload);
            dom[_removeAttribute](_effect);
          }),
      ),
    );
  });
  const images = document.body.querySelectorAll("img[lazyload]:not([lazyload=''])");
  for (let e of $Array[_from](images)) {
    lazyloadObserver[_observe](e);
  }
}
let svgListener;
let svgObserver;
function setSvgListener() {
  if (svgListener != null) {
    return;
  }
  svgObserver = new $IntersectionObserver(async (entries, _) => {
    for (let e of entries) {
      const dom = e.target;
      if (!e.isIntersecting) {
        continue;
      }
      const src = (dom[_getAttribute](_src) || "")[_trim]();
      if (src[_length] < 1) {
        return;
      }
      await check200(src)
        .then((res) => {
          svgObserver[_unobserve](dom);
          res
            .text()
            .then((txt) => {
              const elm = createElement("div");
              elm[_innerHTML] = txt;
              const svg = elm[_children][0];
              svg.id = dom.id;
              dom.classList[_forEach]((e) => svg.classList.add(e));
              svg.onclick = dom.onclick;
              if (dom[_parentElement] != null) {
                dom[_parentElement].insertBefore(svg, dom);
              }
              dom.remove();
            })
            .catch((err) => {
              dom[_innerHTML] = "☒";
            });
        })
        .catch((err) => {
          dom[_innerHTML] = "☒";
        });
    }
  });
  for (let e of [][_slice].call(document.body.querySelectorAll("temp-svg[src]:not([src=''])") || [])) {
    svgObserver[_observe](e);
  }
}
// 生命週期回調函數
class Lifecycle {
  // 渲染前的回調
  #beforeRenderCallback;
  // 渲染後的回調
  #renderedCallback;
  // 更新前的回調
  #beforeUpdateCallback;
  // 更新後的回調
  #updatedCallback;
  // 銷毀前的回調
  #beforeDestroyCallback;
  // 銷毀後的回調
  #destroyedCallback;
  // 開始時間
  #startAt;
  // 渲染時間
  #renderSec;
  // 更新計時器
  #updateTimer;
  // 構造函數，初始化生命週期回調
  constructor(body = {}) {
    this.#beforeRenderCallback = body[lifecycleAction.before_render] || void 0;
    this.#renderedCallback = body[lifecycleAction.rendered] || void 0;
    this.#beforeUpdateCallback = body[lifecycleAction.before_update] || void 0;
    this.#updatedCallback = body[lifecycleAction.updated] || void 0;
    this.#beforeDestroyCallback = body[lifecycleAction.before_destroy] || void 0;
    this.#destroyedCallback = body[lifecycleAction.destroyed] || void 0;
  }
  // 執行前置動作
  async #beforeAction(cb) {
    return new $Promise((res, _) => {
      res(cb() === false ? false : true);
    });
  }
  // 執行後置動作
  #afterAction(cb, sec) {
    cb(sec);
  }
  // 渲染方法
  async render(cb) {
    // 記錄開始時間
    this.#startAt = $Date.now();
    // 執行渲染前的回調（如果存在）
    if (this.#beforeRenderCallback != null && (await this.#beforeAction(this.#beforeRenderCallback)) === false) {
      return;
    }
    // 執行渲染回調
    await cb();
    // 計算渲染時間
    this.#renderSec = $Date[_now]() - this.#startAt;
    // printLog("log", "渲染耗時:", this.#renderSec / 1000);
    // 執行渲染後的回調（如果存在）
    if (this.#renderedCallback == null) {
      return;
    }
    this.#afterAction(this.#renderedCallback, this.#renderSec / 1000);
  }
  // 更新方法
  async update(cb) {
    // 清除之前的更新計時器
    clearTimeout(this.#updateTimer);
    // 設置新的更新計時器，延遲300毫秒執行
    this.#updateTimer = $setTimeout(async () => {
      // 記錄開始時間
      this.#startAt = $Date.now();
      // 執行更新前的回調（如果存在）
      if (this.#beforeUpdateCallback != null && (await this.#beforeAction(this.#beforeUpdateCallback)) === false) {
        return;
      }
      // 執行更新回調
      await cb();
      // 計算更新時間
      this.#renderSec = $Date[_now]() - this.#startAt;
      // printLog("log", "更新耗時:", this.#renderSec / 1000);
      // 執行更新後的回調（如果存在）
      if (this.#updatedCallback == null) {
        return;
      }
      this.#afterAction(this.#updatedCallback, this.#renderSec / 1000);
    }, 300);
  }
  // 銷毀方法
  async destroy(cb) {
    // 記錄開始時間
    this.#startAt = $Date.now();
    // 執行銷毀前的回調（如果存在）
    if (this.#beforeDestroyCallback != null && (await this.#beforeAction(this.#beforeDestroyCallback)) === false) {
      return;
    }
    // 執行銷毀回調
    await cb();
    // 計算銷毀時間
    this.#renderSec = $Date[_now]() - this.#startAt;
    // printLog("log", "銷毀耗時:", this.#renderSec / 1000);
    // 執行銷毀後的回調（如果存在）
    if (this.#destroyedCallback == null) {
      return;
    }
    // 執行銷毀後的回調（如果存在）
    this.#afterAction(this.#destroyedCallback, this.#renderSec / 1000);
  }
}
class QUI {
  body;
  data = {};
  event = {};
  isScheduled = false;
  lazyloadObserver;
  #isInit = true;
  #vdomModel = null;
  #vdomTemp = null;
  #vdomNow = null;
  #lifecycle = null;
  constructor(body) {
    const id = $String(body[_id] || "")[_trim]();
    let dom;
    // 驗證版權
    if (copyright[_length] != 93) {
      return;
    }
    // * 檢查 DOM ID 是否存在
    if (id[_length] < 1) {
      if (typeof body[_render] == "function") {
        const render = body[_render]();
        dom = $document.createElement("section");
        dom.id = getUniqueID(64);
        dom.className = "QUIFragment";
        dom[_appendChild](htmlParser(render));
      } else {
        printLog(_error, error.notExist.domId);
        return;
      }
    } else {
      dom = $document[_getElementById](id);
    }
    // * 檢查 DOM 元素是否存在
    if (dom == null) {
      printLog(_error, error.notExist.dom);
      return;
    }
    // * 複製原始元素以供渲染使用
    this.#vdomModel = dom[_cloneNode](true);
    this.#vdomNow = new vDOM(this.#vdomModel);
    // * 如果提供了自定義渲染函數
    if (typeof body[_render] == "function") {
      const render = body[_render]();
      const temp = createElement(_temp);
      const domNew = dom[_cloneNode](true);
      temp[_appendChild](htmlParser(render));
      domNew[_replaceChildren](temp);
      this.#vdomModel = domNew;
    }
    this.#geti18nData(body).then((data) => {
      // * 設置組件屬性
      this[_body] = dom;
      this[_data] =
        (body.once ?? false)
          ? data
          : createReactiveObject(data, "", (_) => {
              // * 當數據變化時觸發更新生命週期
              this.#lifecycle?.update(() => this.#updateVdom());
            });
      this[_event] = body[_event] || {};
      // * 處理額外選項
      const option = body[_option] || {};
      // * 如果未禁用，則設置 SVG 監聽器
      if (option[_svg] !== false) {
        setSvgListener();
      }
      // * 如果未禁用，則為圖片設置延遲加載
      if (option[_lazyload] !== false) {
        setLazyloadListener();
        this.lazyloadObserver = lazyloadObserver;
      }
      // * 處理生命週期鉤子
      // TODO: 在 v1.0.0 中移除對 'lifecycle' 和直接生命週期方法的支持
      const when = body["when"] || body["lifecycle"] || body || {};
      this.#lifecycle = new Lifecycle({
        before_render: when[lifecycleAction.before_render] || when[lifecycleAction.beforeRender],
        rendered: when[lifecycleAction.rendered],
        before_update: when[lifecycleAction.before_update] || when[lifecycleAction.beforeUpdate],
        updated: when[lifecycleAction.updated],
        before_destroy: when[lifecycleAction.before_destroy] || when[lifecycleAction.beforeDestroy],
        destroyed: when[lifecycleAction.destroyed],
      });
      // * 執行初始渲染
      this.#lifecycle.render(async () => {
        await this.#updateVdom();
        this.#isInit = false;
      });
    });
  }
  async fragment() {
    await this.#updateVdom();
    let fragment = new DocumentFragment();
    for (let e of [...this[_body].childNodes]) {
      if (e.nodeType === Node.TEXT_NODE) {
        const textContent = String(e.nodeValue).trim();
        fragment.appendChild(document.createTextNode(textContent));
      } else {
        fragment.appendChild(e.cloneNode(true));
      }
    }
    return fragment;
  }
  lang(lang) {
    if (!$Object.hasOwn(this.data.quickui_i18n, lang)) {
      return;
    }
    this.data.quickui_i18nLang = lang;
  }
  async #geti18nData(body = {}) {
    let data = body[_data] || {};
    // 初始化 i18n，檢查是否為物件
    if (typeof body.i18n === "object" && body.i18n != null) {
      const i18n = body.i18n;
      data.quickui_i18n = {};
      for (const [key, value] of Object.entries(i18n)) {
        if (typeof value === "string" && value.trim().length > 0) {
          // 若子項目為字串，透過 fetch 讀取檔案
          try {
            const response = await fetch(value.trim());
            if (!response.ok) {
              throw new Error(`Failed to load i18n file for ${key}`);
            }
            const json = await response.json();
            data.quickui_i18n[key] = json;
          } catch (error) {
            // 若讀取失敗，設置為空記錄
            data.quickui_i18n[key] = {};
          }
        } else {
          // 若子項目非字串，直接設定
          data.quickui_i18n[key] = value;
        }
      }
    } else {
      // 若無效格式，設置為空記錄
      data.quickui_i18n = {};
    }
    // 設置當前語言
    data.quickui_i18nLang = body.i18nLang || "zh";
    return data;
  }
  // * 更新虛擬 DOM
  #updateVdom() {
    return new $Promise(async (cb) => {
      // * 檢查虛擬 DOM 模型是否存在
      if (this.#vdomModel == null) {
        printLog(_error, error.notExist.vdomModel);
        return;
      }
      // * 複製原始模板以創建臨時虛擬 DOM
      this.#vdomTemp = new vDOM(this.#vdomModel);
      // * 檢查臨時虛擬 DOM 是否成功創建
      if (this.#vdomTemp == null) {
        printLog(_error, error.notExist.vdomTemp);
        return;
      }
      // * 深度複製當前數據到臨時虛擬 DOM
      this.#vdomTemp[_data] = $JSON[_parse]($JSON[_stringify](this[_data]));
      // * 更新臨時虛擬 DOM 的子元素
      await this.#vdomTemp.updateChildren();
      // * 將臨時虛擬 DOM 的變更應用到實際 DOM
      this.isScheduled = true;
      requestAnimationFrame(() => {
        this.#renderChange();
        this.isScheduled = false; // 重置排程狀態
        // * 完成更新，調用回調函數
        cb(true);
      });
    });
  }
  // * 渲染元素
  #renderChange() {
    const dom = this[_body];
    // * 檢查目標 DOM 元素是否存在
    if (dom == null) {
      printLog("error", error.notExist.dom);
      return;
    }
    // * 比較新舊虛擬 DOM 元素的差異
    const patches = this.#vdomTemp?.getPatches(this.#vdomNow); //this.#diff(this.#vdomNow, this.#vdomTemp);
    // * 將差異更新應用到實際 DOM 元素
    if ($Array[_isArray](patches)) {
      this.#applyPatch(dom, patches);
    }
    // * 移除所有帶有 `:if` 屬性的元素上的該屬性
    for (let e of dom[_querySelectorAll]("*[\\:if]")) {
      e[_removeAttribute](":if");
    }
    // * 添加 'show' 類別以顯示元素
    dom[_classList][_add](_show);
    // * 處理展開效果
    // TODO: 在未來版本中移除對 'animation' 屬性的支持
    if (dom[_getAttribute](_effect) == "expand" || dom[_getAttribute](_animation) == "expand") {
      dom[_style][_minHeight] = dom[_scrollHeight] + "px";
    }
    // * 延遲移除特定屬性和類別
    // TODO: 在未來版本中移除對 'animation' 屬性的支持
    $setTimeout(() => {
      dom[_removeAttribute](_effect);
      dom[_removeAttribute](_animation);
      dom[_removeAttribute](_mask);
      dom[_classList][_remove]("fade-in");
      dom[_classList][_remove]("loading-block");
      dom[_classList][_remove]("expand");
      dom[_classList][_remove]("show");
    }, 300);
    // * 更新當前虛擬 DOM 為最新狀態
    this.#vdomNow = this.#vdomTemp;
    this.#vdomTemp = null;
  }
  // * 應用差異到 DOM
  #applyPatch(dom, patches) {
    // * 檢查 DOM 元素是否存在
    // * 檢查差異陣列是否有效
    if (dom == null || !$Array[_isArray](patches)) {
      return;
    }
    // * 處理移除操作
    this.#patchDoRemove(dom, patches);
    // * 遍歷所有差異並應用
    for (const patch of patches) {
      const { index } = patch;
      const index_ary = $JSON[_parse]($JSON[_stringify](index || []));
      let append_index;
      // * 特殊處理附加操作的索引
      if (patch.type === patchAction.append) {
        append_index = index_ary?.pop();
      }
      // * 獲取目標節點
      const targetNode = index_ary ? this.#getNodeByPath(dom, index_ary) : dom;
      if (!targetNode) {
        continue;
      }
      // * 創建新元素
      if (patch.type === patchAction.create && _vdom in patch) {
        this.#patchDoCreate(targetNode, patch);
      }
      // * 替換現有元素
      else if (patch.type === patchAction.replace && _vdom in patch && targetNode[_parentNode] != null) {
        this.#patchDoReplace(targetNode, patch);
      }
      // * 附加新元素
      else if (patch.type === patchAction.append && _vdom in patch && append_index != null) {
        this.#patchDoAppend(targetNode, patch, append_index);
      }
      // * 更新元素屬性
      else if (patch.type === patchAction.prop && _key in patch && _value in patch && targetNode instanceof Element) {
        this.#patchProp(targetNode, patch.key, patch.value, patch[_vdom]);
      }
      // * 更新文本內容
      else if (patch.type === patchAction.text && _value in patch && targetNode.nodeType === $Node[_TEXT_NODE]) {
        targetNode[_textContent] = patch.value || "";
      }
    }
  }
  // * 處理移除操作
  #patchDoRemove(dom, patches) {
    const patchesRemove = patches
      .filter((p) => p.type === patchAction.remove)
      .sort((a, b) => {
        // * 比較 `index` 的長度
        const layerLength = (b.index.length || 0) - (a.index.length || 0);
        // * 若長度不同，優先按長度排序
        if (layerLength !== 0) {
          return layerLength;
        }
        // * 若長度相同，按字典順序比較每個位置的數字
        for (let i = 0; i < (a.index.length || 0); i++) {
          if ((a.index[i] || 0) !== (b.index[i] || 0)) {
            // * 按降序比較每個數字
            return (b.index[i] || 0) - (a.index[i] || 0);
          }
        }
        return 0;
      });
    // * 執行移除操作
    for (const patch of patchesRemove) {
      const domChild = this.#getNodeByPath(dom, patch.index);
      if (domChild == null || domChild[_parentNode] == null) {
        continue;
      }
      domChild[_parentNode][_removeChild](domChild);
    }
  }
  // * 處理創建操作
  #patchDoCreate(targetNode, patch) {
    if (patch.type !== patchAction.create || !(_vdom in patch)) {
      return;
    }
    // * 創建新元素或文本節點
    const newElement =
      typeof patch[_vdom] === "string" ? $document[_createTextNode](patch[_vdom]) : this.#createElement(patch[_vdom]);
    if (targetNode[_parentElement] == null) {
      return;
    }
    // * 將新元素添加到目標節點
    targetNode[_parentElement][_appendChild](newElement);
  }
  // * 處理替換操作
  #patchDoReplace(targetNode, patch) {
    if (patch.type !== patchAction.replace || !(_vdom in patch) || targetNode[_parentNode] == null) {
      return;
    }
    // * 創建新元素或文本節點
    const newElement =
      typeof patch[_vdom] === "string" ? $document[_createTextNode](patch[_vdom]) : this.#createElement(patch[_vdom]);
    // * 替換目標節點
    targetNode[_parentNode].replaceChild(newElement, targetNode);
    if (newElement instanceof Text || typeof patch[_vdom] === "string") {
      return;
    }
    // * 設置新元素的屬性
    for (const key in patch[_vdom][_props]) {
      this.#patchProp(newElement, key, patch[_vdom][_props][key] || "", patch[_vdom]);
    }
    // * 更新子元素
    this.#appendChild(patch[_vdom], newElement);
  }
  // * 處理附加操作
  #patchDoAppend(targetNode, patch, append_index) {
    if (patch.type !== patchAction.append || !(_vdom in patch) || append_index == null) {
      return;
    }
    // * 創建新元素或文本節點
    const newElement =
      typeof patch[_vdom] === "string" ? $document[_createTextNode](patch[_vdom]) : this.#createElement(patch[_vdom]);
    const nodeNext = removeEmptyTextNode(targetNode)[append_index];
    // * 將新元素插入到正確的位置
    if (nodeNext == null) {
      targetNode[_appendChild](newElement);
    } else {
      targetNode.insertBefore(newElement, nodeNext);
    }
    if (typeof patch[_vdom] === "string") {
      return;
    }
    // * 設置新元素的屬性
    for (const [key, value] of $Object.entries(patch[_vdom][_props])) {
      this.#patchProp(newElement, key, value || "", patch[_vdom]);
    }
    // * 更新子元素
    this.#appendChild(patch[_vdom], newElement);
  }
  // * 依據 `props` 屬性渲染 attributes
  #patchProp(element, key, value, vdom) {
    let processedValue = value;
    if (value && typeof value === "string" && value.startsWith("i18n.")) {
      const i18nKey = value.replace(/^i18n\./, "");
      const currentLang = this[_data].quickui_i18nLang;
      const translations = this[_data].quickui_i18n[currentLang];
      if (translations && translations[i18nKey]) {
        processedValue = translations[i18nKey];
      }
    }
    // * 值等於 `null`
    // * └── 移除 attributes
    if (processedValue == null) {
      element[_removeAttribute](key);
    }
    // * `props` 屬性由 `:@` / `@` 開頭
    // * └── 設置 event
    else if (key[_startsWith](":@") || key[_startsWith]("@") || key[_startsWith]("qe-")) {
      this.#addEventListener(element, key, processedValue, vdom);
    }
    // * `props` 屬性等於 `:model`
    // * └── 設置數據綁定
    else if (key[_toLowerCase]()[_startsWith](tagModel)) {
      this.#addInputListener(element, key, processedValue);
    }
    // * `props` 屬性由 `:` 開頭
    // * └── 設置 attributes
    else if (key[_startsWith](":") || key[_startsWith]("q-")) {
      this.#setAttribute(element, key, processedValue, vdom);
    }
    // * 直接設置 attributes
    else if (element != null && element.nodeType === 1) {
      element[_setAttribute](key, processedValue);
    }
    if (element && element[_getAttribute] && element[_getAttribute](tagFor)) {
      element[_removeAttribute](tagFor);
    }
  }
  // * 設置 `props` 屬性由 `:@` / `@` 開頭的數據綁定
  #addEventListener(element, key, value, vdom) {
    if (element.nodeType !== 1) {
      return;
    }
    ((_) => {
      if (key[_startsWith]("@") === false && key[_startsWith]("qe-") === false) {
        return;
      }
      const event = key[_replace](/^(\@|qe-)/, "on");
      const val = this.#getDataValue(value, vdom[_data]) || value;
      const action = this[_event][val];
      element[event] = action;
    })();
    // (_ => {
    //     if (key[_startsWith](":@") === false) {
    //         return
    //     };
    //     const event = key[_replace](/^\:\@/, "on");
    //     const for_value = this.#getDataValue(value, vdom[_data]);
    //     const action = this[_event][for_value];
    //     (element as any)[event] = action
    // })();
    element[_removeAttribute](key);
  }
  // * 設置 `props` 屬性等於 `:model`的數據綁定
  #addInputListener(element, key, value) {
    if (element.nodeType !== 1 || value == null || !/(input|select|textarea)/i[_test](element[_tagName])) {
      return;
    }
    const is_input = element instanceof HTMLInputElement;
    const is_textarea = element instanceof HTMLTextAreaElement;
    const is_select = element instanceof HTMLSelectElement;
    const type = element[_getAttribute]("type");
    if (is_input && (type === "checkbox" || type === "radio")) {
      element[_addEventListener]("change", (e) => {
        this[_data][value] = [
          ...$document.body.querySelectorAll("input[name='" + e.target.name + "'][type='" + type + "']:checked"),
        ]
          .map((e) => e.value)
          .join(",");
      });
    } else if (is_select) {
      element[_addEventListener]("change", (e) => {
        this[_data][value] = e.target[_value] || "";
      });
    } else if (is_input || is_textarea) {
      element[_addEventListener]("keyup", (e) => {
        this[_data][value] = e.target[_value] || "";
      });
      element[_addEventListener]("change", (e) => {
        this[_data][value] = e.target[_value] || "";
      });
    }
    element[_removeAttribute](key);
  }
  // * 設置 `props` 屬性由 `:` || `q-` 開頭的 attributes
  #setAttribute(element, key, value, vdom) {
    const keyCheck = key[_toLowerCase]();
    const data_value = this.#getDataValue(value, vdom[_data]) == null ? value : this.#getDataValue(value, vdom[_data]);
    const attr_html = (prop_html[keyCheck] || "")[_trim]();
    const attr_css = (prop_css[keyCheck] || "")[_trim]();
    const camelKey = getCamelString(key);
    if (element.nodeType !== 1) {
      return;
    }
    if ((keyCheck === ":" + _lazyload || keyCheck === "q-" + _lazyload) && value[_trim]()[_length] > 0) {
      if (this.#isInit) {
        const effect = element[_getAttribute](":" + _effect) || element[_getAttribute]("q-" + _effect) || "";
        element.src = effect === "circle" ? svgLoading : gifEmpty;
        lazyloadObserver[_observe](element);
      } else if (element[_getAttribute](_lazyload) != null) {
        element.src = svgLoading;
        lazyloadObserver[_observe](element);
      } else {
        // * 不重複讀取
        element.src = data_value;
        return;
      }
    }
    if ((keyCheck === ":" + _html || keyCheck === "q-" + _html) && value[_trim]()[_length] > 0) {
      element[_innerHTML] = data_value || value;
    } else if (keyCheck === tagFor || keyCheck in prop_if_else) {
    } else if (keyCheck === ":src" && vdom.tag[_toLowerCase]() === "temp-svg" && value[_trim]()[_length] > 0) {
      const new_value = this.#getDataValue(value, vdom[_data]) || value;
      element[_setAttribute](_src, new_value);
      svgObserver[_observe](element);
    } else if (keyCheck in prop_html) {
      element[attr_html] = data_value;
    }
    // ! 1.*.* 移除
    else if (keyCheck in prop_css) {
      element[_style][attr_css] = data_value;
    } else if (
      camelKey in element[_style] &&
      !((key === ":" + _animation || key === "q-" + _animation) && /(fade-in|expand)/[_test](value))
    ) {
      element[_style][camelKey] = data_value;
    } else if (
      (keyCheck === ":" + _hide || keyCheck === "q-" + _hide) &&
      $Boolean($isNaN(+data_value) ? data_value : +data_value)
    ) {
      element[_style][_display] = "none";
    } else {
      element[_setAttribute](`${key[_replace](/^[\:q]\-?/, "")}`, data_value);
    }
    element[_removeAttribute](key);
  }
  // * 依據 `APPEND` 子元素 `props` 屬性渲染 attributes
  #appendChild(vdomChild, elementChild) {
    if (typeof vdomChild == "string") {
      return;
    }
    for (const i in vdomChild.children.filter((e) => typeof e != "string")) {
      if (elementChild == null) {
        continue;
      }
      const vdomChildNest = vdomChild.children[+i];
      const elementChildNest = elementChild.children[+i];
      if (typeof vdomChildNest == "string") {
        continue;
      }
      for (const [key, value] of $Object.entries(vdomChildNest[_props])) {
        this.#patchProp(elementChildNest, key, value || "", vdomChildNest);
      }
      this.#appendChild(vdomChildNest, elementChildNest);
    }
  }
  // * 從數據對象中獲取指定值，並根據不同格式進行處理
  #getDataValue(value, data) {
    // * 如果值為空，則返回
    if (value[_trim]()[_length] < 1) {
      return;
    }
    // * 檢查是否為子字符串格式
    const is_sub = regexText[_test](value);
    let front = "";
    let tail = "";
    if (is_sub) {
      // * 解析子字符串格式
      front = value[_split](regexText)[0] || "";
      tail = value[_split](regexText)[4] || "";
      value = value[_match](regexText)[1];
    }
    // * 檢查是否為長度計算函式
    const is_length = /^LENGTH\(.+\)/[_test](value);
    if (is_length) {
      value = value[_replace](/^LENGTH\(|\)$/g, "");
    }
    // * 檢查是否為計算函式
    const is_calc = /^CALC\(.*\)$/[_test](value);
    let operator = "";
    let num = 0;
    if (is_calc) {
      // * 解析計算函式
      value = value[_replace](/^CALC\(|\)$/g, "");
      const fit = value[_match](regexCalc);
      value = fit[1];
      operator = fit[2];
      num = +fit[3] || 0;
    }
    // * 檢查是否為大寫或小寫轉換函式
    const is_upper = /^UPPER\(.*\)$/[_test](value);
    const is_lower = /^LOWER\(.*\)$/[_test](value);
    if (is_upper || is_lower) {
      value = value[_replace](/^(UPPER|LOWER)\(|\)$/g, "");
    }
    // * 檢查是否為日期函式
    const is_date = /^DATE\([\w\,\-\s\:]*\)$/[_test](value);
    let date_format = "";
    if (is_date) {
      // * 解析日期函式
      value = value[_replace](/^DATE\(|\)$/g, "");
      const fit = value[_match](/(\w+),\s*([^\n]+)/);
      value = fit[1];
      date_format = fit[2];
    }
    // * 從數據對象中獲取目標值
    let keyAry = value[_split](/\./);
    let targetObj = data || this[_data];
    let targetKey = keyAry[0];
    let targetVal = targetObj[targetKey];
    keyAry[_shift]();
    while (keyAry[_length] > 0) {
      targetObj = targetVal || {};
      targetKey = keyAry[0];
      targetVal = targetObj[targetKey];
      keyAry[_shift]();
    }
    // * 如果目標值為空，嘗試從內部 _data 中獲取
    if (targetVal == null) {
      keyAry = value[_split](/\./);
      targetObj = this[_data];
      targetKey = keyAry[0];
      targetVal = targetObj[targetKey];
      keyAry[_shift]();
      while (keyAry[_length] > 0) {
        targetObj = targetVal || {};
        targetKey = keyAry[0];
        targetVal = targetObj[targetKey];
        keyAry[_shift]();
      }
    }
    // * 計算長度
    let len = "";
    if (targetVal != null && targetVal instanceof Object && !$Array[_isArray](targetVal)) {
      len = $String($Object[_keys](targetVal)[_length]);
    } else if (targetVal != null) {
      len = targetVal[_length];
    }
    // * 根據不同格式處理並返回結果
    if (is_sub) {
      if (is_length) {
        return front + len + tail;
      } else if (is_calc) {
        targetVal = calc(targetVal, operator, num);
        if (targetVal == null) {
          return;
        }
      }
      return front + targetVal + tail;
    }
    if (is_length) {
      return len;
    } else if (is_calc) {
      targetVal = calc(targetVal, operator, num);
      if (targetVal == null) {
        return;
      }
    } else if (is_upper) {
      return targetVal[_toUpperCase]();
    } else if (is_lower) {
      return targetVal[_toLowerCase]();
    } else if (is_date) {
      return dateFormat(+targetVal, date_format);
    }
    return targetVal;
  }
  #getNodeByPath(root, path) {
    let currentNode = root;
    let childNodes =
      $Array
        .from(currentNode.childNodes)
        .filter(
          (child) =>
            child.nodeType === $Node[_ELEMENT_NODE] ||
            (child.nodeType === $Node[_TEXT_NODE] && child[_textContent]?.trim() !== ""),
        ) || [];
    for (const index of path) {
      currentNode = childNodes[index];
      if (currentNode == null) {
        continue;
      }
      childNodes =
        $Array
          .from(currentNode.childNodes)
          .filter(
            (child) =>
              child.nodeType === $Node[_ELEMENT_NODE] ||
              (child.nodeType === $Node[_TEXT_NODE] && child[_textContent]?.trim() !== ""),
          ) || [];
    }
    return currentNode;
  }
  #createElement(vdom) {
    const el = $document.createElement(vdom.tag);
    if (vdom[_props]) {
      for (const [key, value] of $Object.entries(vdom[_props])) {
        if (key[_startsWith](":") || key[_startsWith]("q-") || key[_startsWith]("@") || key[_startsWith]("qe-")) {
        } else if (value !== undefined) {
          el[_setAttribute](key, value);
        }
      }
    }
    for (const child of vdom[_children]) {
      if (typeof child === "string") {
        el[_appendChild]($document[_createTextNode](child));
      } else {
        el[_appendChild](this.#createElement(child));
      }
    }
    return el;
  }
}
window.QUI = QUI;
var _a;
class vDOM {
  tag = "";
  props = {};
  children = [];
  data = null;
  constructor(element) {
    // * 檢查是否為 `<script>` 標籤
    if (element[_tagName][_toLowerCase]() === _script) {
      // * 確認 `<head>` 中是否已存在相同的 `<script>`
      let is_exist = false;
      for (const e of $document[_head][_querySelectorAll](_script) || []) {
        if (
          // * `src` 重複
          (element[_src] != null && e[_src] === element[_src]) ||
          // * `textContent` 重複
          (element[_textContent] != null && e[_textContent] === element[_textContent])
        ) {
          is_exist = true;
          break;
        }
      }
      // * 沒有重複，將 `<script>` 元素移動到 `<head>`
      if (!is_exist) {
        $document[_head][_appendChild](element);
      }
      this[_tag] = _script;
    }
    this[_tag] = element[_tagName][_toLowerCase]();
    this[_props] = getElementAttributes(element);
    this[_children] = removeEmptyTextNode(element)[_map]((child) =>
      child.nodeType === Node[_ELEMENT_NODE]
        ? // * 子元素非文字，循環嵌套
          new _a(child)
        : // * 子元素非文字，循環嵌套
          (child[_textContent] || "")[_trim](),
    );
  }
  async updateChildren() {
    // * 渲染虛擬 DOM
    this.#updateChildrenBasedOnFor(this);
    this.#updateChildrenBasedOnIf(this);
    await this.#updateChildrenBasedOnPath(this);
    // * 重新解析由 `:path` 插入的項目
    this.#updateChildrenBasedOnFor(this);
    this.#updateChildrenBasedOnIf(this);
    this.#updateVDOM(this);
  }
  getPatches(vdomOld) {
    return this.#diff(vdomOld, this);
  }
  // * 依據 `:for` 屬性動態生成子節點
  #updateChildrenBasedOnFor(vdom) {
    let index = 0;
    if (typeof vdom == "string" || vdom[_children][_length] < 1) {
      return;
    }
    while (index < vdom[_children][_length]) {
      const child = vdom[_children][index];
      // * 子節點為文字 -> 略過
      if (typeof child == "string" || child == null) {
        index++;
        continue;
      }
      // * 子節點為 vDOM -> 設定 `data`
      else if (child[_data] == null) {
        child[_data] = vdom[_data];
      }
      // * 屬性 `:for` 不存在 -> 略過
      if (!(tagFor in child[_props])) {
        index++;
        continue;
      }
      const valFor = child[_props][tagFor];
      const val0 = (valFor[_match](/^\(?\s*(\w+)/) || [])[1];
      const val1 = (valFor[_match](/\,\s*(\w+)/) || [])[1];
      const val2 = (valFor[_match](regexForVal2) || [])[1];
      let data = this.#getDataValue(val2, vdom[_data]);
      let children = [];
      // * 移除屬性 `:for`
      delete child[_props][tagFor];
      // * val2 是陣列
      if ($Array[_isArray](data)) {
        data = $JSON[_parse]($JSON[_stringify](data));
        for (const childIndex in data) {
          const child_data = $JSON[_parse]($JSON[_stringify](data[+childIndex]));
          let new_child = $structuredClone(child);
          new_child[_data] = $JSON[_parse](
            $JSON[_stringify]({
              [val0]: child_data, // * value
              [val2]: data, // * array
            }),
          );
          if (val1 != null) {
            new_child[_data][val1] = +childIndex; // * index
          }
          children.push(new_child);
        }
        vdom[_children][_splice](index, 1, ...children);
        // * 調整索引以跳過新添加的子節點
        index += children[_length] - 2;
      }
      // * data 存在且為 object
      else if (data != null && typeof data === "object") {
        data = $JSON[_parse]($JSON[_stringify](data));
        for (const key in data) {
          const child_data = $JSON[_parse]($JSON[_stringify](data[key]));
          let new_child = $structuredClone(child);
          new_child[_data] = $JSON[_parse](
            $JSON[_stringify]({
              [val0]: key, // * key
              [val1]: child_data, // * value
              [val2]: data, // * object
            }),
          );
          children.push(new_child);
        }
        vdom[_children][_splice](index, 1, ...children);
        // * 調整索引以跳過新添加的子節點
        index += children[_length] - 2;
      } else {
        index++;
      }
    }
    // * 遞歸處理子節點
    for (let e of vdom[_children]) {
      this.#updateChildrenBasedOnFor(e);
    }
  }
  // * 依據 `:if` 屬性動態生成子節點
  #updateChildrenBasedOnIf(vdom) {
    let index = 0;
    if (typeof vdom == "string" || vdom[_children][_length] < 1) {
      return;
    }
    while (index < vdom[_children][_length]) {
      const child = vdom[_children][index];
      // * 如果子節點是字串
      // * 如果子節點不包含 `:for`
      // * └── 返回
      if (typeof child === "string") {
        index++;
        continue;
      } else if (!(tagIf in child[_props])) {
        delete child[_props][tagElseIf];
        delete child[_props][tagElif];
        delete child[_props][tagElse];
        index++;
        continue;
      }
      // 初始化下一個節點的索引
      let node_next_index = index + 1;
      let node_next = vdom[_children][node_next_index];
      let ary = [index];
      let done = false;
      // 檢查接下來的節點，直到 `done` 為真
      ((_) => {
        if (node_next == null || typeof node_next === "string") {
          done = true;
          return;
        }
        const props = node_next[_props] || {};
        done = (props[tagElseIf] || props[tagElif] || props[tagElse]) == null;
        while (!done) {
          ary[_push](node_next_index);
          node_next_index += 1;
          node_next = vdom[_children][node_next_index];
          if (node_next == null || typeof node_next === "string") {
            done = true;
            continue;
          }
          const props = node_next[_props] || {};
          done = (props[tagElseIf] || props[tagElif] || props[tagElse]) == null;
        }
      })();
      let isFit = false;
      let hasElse = false;
      ((_) => {
        for (let node_index of ary) {
          const node_target = vdom[_children][node_index];
          // 如果目標節點不存在或是字串，直接返回
          if (node_target == null || typeof node_target == "string") {
            return;
          }
          // 取得目標節點的條件屬性值
          const attr_value =
            node_target[_props][tagIf] || node_target[_props][tagElseIf] || node_target[_props][tagElif];
          const is_else = node_target[_props][tagElse] != null;
          if (is_else) {
            hasElse = true;
          }
          // 如果條件已經成立或當前是`else`，則將此節點標記為無效
          if (isFit) {
            return;
          } else if (is_else) {
            vdom[_children][_splice](index, ary.length, node_target);
          } else if (attr_value != null) {
            // 分析條件運算
            const val0 = attr_value[_split](regexCompare)[0];
            const val1 = attr_value[_split](regexCompare)[1];
            const compare = ((attr_value[_match](regexCompare) || [])[0] || "")[_trim]();
            const value = this.#getDataValue(val0, node_target[_data]);
            // 如果操作符不存在，直接判斷布林值
            if (val1 == null && compare[_length] < 1) {
              isFit = $Boolean(value);
            }
            // 如果比較運算子為 `>`，比較數值大小
            else if (compare === ">") {
              isFit = ($Number(value) || 0) > ($Number(val1) || 0);
            }
            // 如果比較運算子為 `<`
            else if (compare === "<") {
              isFit = ($Number(value) || 0) < ($Number(val1) || 0);
            }
            // 如果比較運算子為 `>=`
            else if (compare === ">=" || compare === ">==") {
              isFit = ($Number(value) || 0) >= ($Number(val1) || 0);
            }
            // 如果比較運算子為 `<=`
            else if (compare === "<=" || compare === "<==") {
              isFit = ($Number(value) || 0) <= ($Number(val1) || 0);
            }
            // 如果比較運算子為 `==`
            else if (compare === "==" || compare === "===") {
              // 如果比較值為 `null`，判斷是否為 `null`
              if (val1 == "null") {
                isFit = value == null;
              } else if (val1 == "true") {
                isFit = $Boolean(value);
              } else if (val1 == "false") {
                isFit = !$Boolean(value);
              } else if (val1 == "empty") {
                isFit = $String(value || "")[_length] < 1;
              }
              // 數值不為null -> 判斷是否符合
              else {
                isFit = $String(value || "") == $String(val1);
              }
            }
            // 如果比較運算子為 `!=`
            else if (compare === "!=" || compare === "!==") {
              // 如果比較值為 `null`，判斷是否不為 `null`
              if (val1 == "null") {
                isFit = value != null;
              } else if (val1 == "true") {
                isFit = !$Boolean(value);
              } else if (val1 == "false") {
                isFit = $Boolean(value);
              } else if (val1 == "empty") {
                isFit = $String(value || "")[_length] > 0;
              }
              // 如果數值不為 `null`，判斷是否不符合
              else {
                isFit = $String(value || "") != $String(val1);
              }
            }
            if (isFit) {
              delete node_target[_props][tagIf];
              vdom[_children][_splice](index, ary.length, node_target);
              return;
            }
          }
        }
      })();
      if (!isFit) {
        if (hasElse) {
          index++;
        } else {
          vdom[_children][_splice](index, ary.length);
        }
      }
    }
    for (let e of vdom[_children]) {
      this.#updateChildrenBasedOnIf(e);
    }
  }
  // * 依據 `:path` 屬性插入子節點
  async #updateChildrenBasedOnPath(vdom) {
    let index = 0;
    if (typeof vdom == "string" || vdom[_children][_length] < 1) {
      return;
    }
    while (index < vdom[_children][_length]) {
      const child = vdom[_children][index];
      // * 子節點為文字
      // * 子節點不包含屬性 `:path`
      // * 子節點標籤不為 `temp`
      // * └── 略過
      if (typeof child === "string") {
        index++;
        continue;
      }
      if (!(tagPath in child[_props]) || child.tag != "temp") {
        index++;
        continue;
      }
      const valPath = child[_props][tagPath];
      // * 如果 `data` 不存在
      // * └── 直接取值
      const val = this.#getDataValue(valPath, vdom[_data]) || valPath;
      delete child[_props][tagPath];
      await fetch(val).then(async (r) => {
        const text = await r.text();
        const dom = createElement("div", text).cloneNode(true);
        const vdomNew = new _a(dom);
        vdom[_children][_splice](index, 1, ...vdomNew[_children]);
        index += vdomNew[_children][_length] - 2;
      });
      index++;
    }
    for (let e of vdom[_children]) {
      await this.#updateChildrenBasedOnPath(e);
    }
  }
  // * 新增翻譯方法
  translate(key) {
    const lang = this.data.quickui_i18nLang;
    if (!this.data.quickui_i18n[lang]) {
      return key; // 如果沒有對應的語言資料，返回原始鍵值
    }
    const path = key.split(".");
    let value = this.data.quickui_i18n[lang];
    for (const segment of path) {
      value = value[segment];
      if (value === undefined) break;
    }
    return value !== undefined ? value : key; // 如果找不到對應值，返回原始鍵值
  }
  // * 取代內文 `{{ value }}`
  #updateVDOM(vdom) {
    let index = 0;
    if (typeof vdom == "string" || vdom[_children][_length] < 1) {
      return;
    }
    while (index < vdom[_children][_length]) {
      let child = vdom[_children][index];
      // * 子節點為文字
      if (typeof child == "string") {
        // * 先處理 i18n 替換
        for (let item of child[_match](new $RegExp(regexText, "g")) || []) {
          const val = vdom[_children][index] || "";
          const match = item[_match](regexText) || [];
          if (match[_length] < 1) {
            continue;
          }
          const fit = match[1] || "";
          // * 子節點不是 `string`
          // * `data` 不存在
          // * └── 略過
          if (typeof val !== "string" || fit.length < 1) {
            continue;
          }
          // 判斷是否為 i18n 屬性
          if (fit[_startsWith]("i18n.")) {
            const i18nKey = fit[_replace](/^i18n\./, ""); // 提取鍵值
            const translatedValue = this.translate(i18nKey); // 使用翻譯方法替換
            vdom[_children][index] = val[_replace](
              new $RegExp("{{\\s*?" + fit[_replace](/(\?|\.|\+|\*|\\|\%|\-|\(|\))/g, "\\$1") + "\\s*?}}", "i"),
              translatedValue,
            );
          }
        }
        for (let item of child[_match](new $RegExp(regexText, "g")) || []) {
          const val = vdom[_children][index] || "";
          const match = item[_match](regexText) || [];
          // * 未符合 `{{ value }}` 項目
          // * └── 略過
          if (match[_length] < 1) {
            continue;
          }
          const fit = match[1] || "";
          const value = this.#getDataValue(fit, vdom[_data]);
          // * 子節點不是 `string`
          // * `data` 不存在
          // * └── 略過
          if (typeof val !== "string" || fit.length < 1 || value == null) {
            continue;
          }
          vdom[_children][index] = val[_replace](
            new $RegExp("{{\\s*?" + fit[_replace](/(\?|\.|\+|\*|\\|\%|\-|\(|\))/g, "\\$1") + "\\s*?}}", "i"),
            value,
          );
        }
      }
      // * 子節點為 vDOM
      else if (child != null) {
        if (child[_data] == null) {
          child[_data] = vdom[_data];
        }
        // if ($Object[_keys](child[_props] || {})[_length]) {
        //     this.#setIf(vdom, index);
        // };
      }
      index++;
    }
    for (let e of vdom[_children]) {
      this.#updateVDOM(e);
    }
  }
  #getDataValue(value, data) {
    if (value[_trim]()[_length] < 1) {
      return;
    }
    const is_sub = regexText[_test](value);
    let front = "";
    let tail = "";
    if (is_sub) {
      front = value[_split](regexText)[0] || "";
      tail = value[_split](regexText)[4] || "";
      value = value[_match](regexText)[1];
    }
    const is_length = /^LENGTH\(.+\)/[_test](value);
    if (is_length) {
      value = value[_replace](/^LENGTH\(|\)$/g, "");
    }
    const is_calc = /^CALC\(.*\)$/[_test](value);
    let operator = "";
    let num = 0;
    if (is_calc) {
      value = value[_replace](/^CALC\(|\)$/g, "");
      const fit = value[_match](regexCalc);
      value = fit[1];
      operator = fit[2];
      num = +fit[3] || 0;
    }
    const is_upper = /^UPPER\(.*\)$/[_test](value);
    const is_lower = /^LOWER\(.*\)$/[_test](value);
    if (is_upper || is_lower) {
      value = value[_replace](/^(UPPER|LOWER)\(|\)$/g, "");
    }
    const is_date = /^DATE\([\w\,\-\s\:]*\)$/[_test](value);
    let date_format = "";
    if (is_date) {
      value = value[_replace](/^DATE\(|\)$/g, "");
      const fit = value[_match](/(\w+),\s*([^\n]+)/);
      value = fit[1];
      date_format = fit[2];
    }
    let keyAry = value[_split](/\./);
    let targetObj = data || this[_data];
    let targetKey = keyAry[0];
    let targetVal = targetObj[targetKey];
    keyAry[_shift]();
    while (keyAry[_length] > 0) {
      targetObj = targetVal || {};
      targetKey = keyAry[0];
      targetVal = targetObj[targetKey];
      keyAry[_shift]();
    }
    if (targetVal == null) {
      keyAry = value[_split](/\./);
      targetObj = this[_data];
      targetKey = keyAry[0];
      targetVal = targetObj[targetKey];
      keyAry[_shift]();
      while (keyAry[_length] > 0) {
        targetObj = targetVal || {};
        targetKey = keyAry[0];
        targetVal = targetObj[targetKey];
        keyAry[_shift]();
      }
    }
    let len = "";
    if (targetVal != null && targetVal instanceof Object && !$Array[_isArray](targetVal)) {
      len = $String($Object[_keys](targetVal)[_length]);
    } else if (targetVal != null) {
      len = targetVal[_length];
    }
    if (is_sub) {
      if (is_length) {
        return front + len + tail;
      } else if (is_calc) {
        targetVal = calc(targetVal, operator, num);
        if (targetVal == null) {
          return;
        }
      }
      return front + targetVal + tail;
    }
    if (is_length) {
      return len;
    } else if (is_calc) {
      targetVal = calc(targetVal, operator, num);
      if (targetVal == null) {
        return;
      }
    } else if (is_upper) {
      return targetVal[_toUpperCase]();
    } else if (is_lower) {
      return targetVal[_toLowerCase]();
    } else if (is_date) {
      return dateFormat(+targetVal, date_format);
    }
    return targetVal;
  }
  // TODO 需重寫差異判斷，減少 DOM 操作
  // * 比較新舊差異
  #diff(vdomOld, vdomNew, path = []) {
    // * 舊元素不存在 / 新元素存在
    // * └── 新增元素
    if (vdomOld == null && vdomNew) {
      return [{ [_type]: patchAction.create, [_index]: path, [_vdom]: vdomNew }];
    }
    // * 舊元素存在 / 新元素不存在
    // * └── 移除元素
    else if (vdomOld && !vdomNew) {
      return [{ [_type]: patchAction.remove, [_index]: path }];
    }
    // * 舊元素/ 新元素皆不存在
    // * └── 不動作
    else if (!vdomOld && !vdomNew) {
      return [];
    }
    // * 舊元素/ 新元素皆存在，但 HTML 標籤不一致
    // * └── 取代元素
    else if (vdomOld.tag !== vdomNew.tag) {
      return [{ [_type]: patchAction[_replace], [_index]: path, [_vdom]: vdomNew }];
    }
    const patches = [];
    // * 比較屬性差異
    patches[_push](...this.#diffProps(vdomOld, vdomNew, path));
    // * 比較子元素差異
    patches[_push](...this.#diffChildren(vdomOld, vdomNew, path));
    return patches;
  }
  // * 比較屬性差異
  #diffProps(vdomOld, vdomNew, path = []) {
    if (vdomOld == null || typeof vdomOld == "string" || vdomNew == null || typeof vdomNew == "string") {
      return [];
    }
    const ary = [];
    const oldProps = vdomOld[_props] || {};
    const oldPropsLength = $Object[_keys](oldProps)[_length];
    const newProps = vdomNew[_props] || {};
    const newPropsLength = $Object[_keys](newProps)[_length];
    // * 更改屬性
    if (newPropsLength > 0) {
      for (let key in newProps) {
        const value = newProps[key];
        ary[_push]({
          [_type]: patchAction.prop,
          [_vdom]: vdomNew,
          key,
          value,
          [_index]: path,
        });
      }
    }
    // * 刪除屬性
    if (oldPropsLength > 0) {
      // * 新屬性不存在，移除全部屬性
      if (newPropsLength < 1) {
        for (let key in oldProps) {
          ary[_push]({
            [_type]: patchAction.prop,
            [_vdom]: vdomNew,
            key,
            [_value]: null,
            [_index]: path,
          });
        }
      }
      for (let key in newProps) {
        // * 新屬性存在，且不包含 key
        if (newPropsLength > 0 && !(key in newProps)) {
          ary[_push]({
            [_type]: patchAction.prop,
            [_vdom]: vdomNew,
            key,
            [_value]: null,
            [_index]: path,
          });
        }
      }
    }
    return ary;
  }
  // * 比較子節點差異
  #diffChildren(vdomOld, vdomNew, path = []) {
    if (vdomOld == null || typeof vdomOld == "string" || vdomNew == null || typeof vdomNew == "string") {
      return [];
    }
    const patches = [];
    const oldChildren = $Array[_isArray](vdomOld[_children]) ? vdomOld[_children] : [];
    const newChildren = $Array[_isArray](vdomNew[_children]) ? vdomNew[_children] : [];
    const maxLength = $Math.max(oldChildren[_length], newChildren[_length]);
    for (let i = 0; i < maxLength; i++) {
      const oldChild = oldChildren[i];
      const newChild = newChildren[i];
      const currentPath = path.concat(i);
      // * 新舊子節點皆為 `string`
      if (typeof oldChild === "string" && typeof newChild === "string") {
        // * 新舊子節點相同
        // * └── 略過
        if (oldChild === newChild) {
          continue;
        }
        // * 新舊子節點不相同
        // * └── 覆蓋
        patches[_push]({
          [_type]: patchAction.text,
          [_vdom]: vdomNew,
          [_value]: newChild,
          [_index]: currentPath,
        });
      }
      // * 舊子節點不存在
      else if (oldChild == null) {
        // * 添加子節點
        patches[_push]({
          [_type]: patchAction.append,
          [_vdom]: newChild,
          [_index]: currentPath,
        });
      }
      // * 新子節點不存在
      else if (newChild == null) {
        // * 刪除子節點
        patches[_push]({ [_type]: patchAction.remove, index: currentPath });
      } else {
        // * 處理子節點差異
        patches[_push](...this.#diff(oldChild, newChild, currentPath));
      }
    }
    return patches;
  }
}
_a = vDOM;
