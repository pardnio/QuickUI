class QUI {
  body: any;
  data: Record<string, any> = {};
  event: Record<string, Function> = {};
  isScheduled: boolean = false;
  lazyloadObserver: any;

  #isInit: Boolean = true;
  #vdomModel: Element | null = null;
  #vdomTemp: vDOM | null = null;
  #vdomNow: vDOM | null = null;

  #lifecycle: Lifecycle | null = null;

  constructor(body: Record<string, any>) {
    const id = $String(body[_id] || "")[_trim]();
    let dom: Element | null;

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
    this.#vdomModel = dom[_cloneNode](true) as Element;
    this.#vdomNow = new vDOM(this.#vdomModel);

    // * 如果提供了自定義渲染函數
    if (typeof body[_render] == "function") {
      const render = body[_render]();
      const temp = createElement(_temp) as DocumentFragment;
      const domNew = dom[_cloneNode](true) as Element;

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

  lang(lang: string) {
    if (!$Object.hasOwn(this.data.quickui_i18n, lang)) {
      return;
    }
    this.data.quickui_i18nLang = lang;
  }

  async #geti18nData(body: Record<string, any> = {}): Promise<Record<string, any>> {
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
    const patches = this.#vdomTemp?.getPatches(this.#vdomNow!); //this.#diff(this.#vdomNow, this.#vdomTemp);

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
  #applyPatch(dom: Node, patches: Patch[]) {
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
  #patchDoRemove(dom: Node, patches: Patch[]) {
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
  #patchDoCreate(targetNode: Node, patch: Patch) {
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
  #patchDoReplace(targetNode: Node, patch: Patch) {
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
  #patchDoAppend(targetNode: Node, patch: Patch, append_index: any) {
    if (patch.type !== patchAction.append || !(_vdom in patch) || append_index == null) {
      return;
    }

    // * 創建新元素或文本節點
    const newElement =
      typeof patch[_vdom] === "string" ? $document[_createTextNode](patch[_vdom]) : this.#createElement(patch[_vdom]);

    const nodeNext = removeEmptyTextNode(targetNode as Element)[append_index];

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
      this.#patchProp(newElement as Element, key, value || "", patch[_vdom]);
    }

    // * 更新子元素
    this.#appendChild(patch[_vdom], newElement as Element);
  }

  // * 依據 `props` 屬性渲染 attributes
  #patchProp(element: Element, key: string, value: string | undefined | null, vdom: vDOM) {
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
  #addEventListener(element: Element, key: string, value: string, vdom: vDOM) {
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
      (element as any)[event] = action;
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
  #addInputListener(element: Element, key: string, value: string) {
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
          ...$document.body.querySelectorAll(
            "input[name='" + (e.target as any).name + "'][type='" + type + "']:checked",
          ),
        ]
          .map((e: any) => e.value)
          .join(",");
      });
    } else if (is_select) {
      element[_addEventListener]("change", (e) => {
        this[_data][value] = (e.target as any)[_value] || "";
      });
    } else if (is_input || is_textarea) {
      element[_addEventListener]("keyup", (e) => {
        this[_data][value] = (e.target as any)[_value] || "";
      });
      element[_addEventListener]("change", (e) => {
        this[_data][value] = (e.target as any)[_value] || "";
      });
    }

    element[_removeAttribute](key);
  }

  // * 設置 `props` 屬性由 `:` || `q-` 開頭的 attributes
  #setAttribute(element: Element, key: string, value: string, vdom: vDOM) {
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
        (element as HTMLImageElement).src = effect === "circle" ? svgLoading : gifEmpty;
        lazyloadObserver[_observe](element);
      } else if (element[_getAttribute](_lazyload) != null) {
        (element as HTMLImageElement).src = svgLoading;
        lazyloadObserver[_observe](element);
      } else {
        // * 不重複讀取
        (element as HTMLImageElement).src = data_value;
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
      (element as any)[attr_html] = data_value;
    }
    // ! 1.*.* 移除
    else if (keyCheck in prop_css) {
      ((element as HTMLElement)[_style] as any)[attr_css] = data_value;
    } else if (
      camelKey in (element as HTMLElement)[_style] &&
      !((key === ":" + _animation || key === "q-" + _animation) && /(fade-in|expand)/[_test](value))
    ) {
      ((element as HTMLElement)[_style] as any)[camelKey] = data_value;
    } else if (
      (keyCheck === ":" + _hide || keyCheck === "q-" + _hide) &&
      $Boolean($isNaN(+data_value) ? data_value : +data_value)
    ) {
      (element as HTMLElement)[_style][_display] = "none";
    } else {
      (element as HTMLElement)[_setAttribute](`${key[_replace](/^[\:q]\-?/, "")}`, data_value);
    }

    element[_removeAttribute](key);
  }

  // * 依據 `APPEND` 子元素 `props` 屬性渲染 attributes
  #appendChild(vdomChild: vDOM, elementChild: Element) {
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
        this.#patchProp(elementChildNest as Element, key, value || "", vdomChildNest);
      }

      this.#appendChild(vdomChildNest, elementChildNest);
    }
  }

  // * 從數據對象中獲取指定值，並根據不同格式進行處理
  #getDataValue(value: string, data?: Record<string, any>) {
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
      value = (value[_match](regexText) as any)[1];
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

      value = (fit as any)[1];
      operator = (fit as any)[2];
      num = +(fit as any)[3] || 0;
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
      value = (fit as any)[1];
      date_format = (fit as any)[2];
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

  #getNodeByPath(root: Node, path: number[]): Node | null {
    let currentNode: Node | null = root;
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

  #createElement(vdom: vDOM): Element {
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
