class vDOM {
  tag: string = "";
  props: Record<string, string> = {};
  children: (vDOM | string)[] = [];
  data: any = null;

  constructor(element: Element) {
    // * 檢查是否為 `<script>` 標籤
    if (element[_tagName][_toLowerCase]() === _script) {
      // * 確認 `<head>` 中是否已存在相同的 `<script>`
      let is_exist = false;

      for (const e of $document[_head][_querySelectorAll](_script) || []) {
        if (
          // * `src` 重複
          ((element as HTMLScriptElement)[_src] != null && e[_src] === (element as HTMLScriptElement)[_src]) ||
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
    this[_children] = removeEmptyTextNode(element)[_map]((child: Node) =>
      child.nodeType === Node[_ELEMENT_NODE]
        ? // * 子元素非文字，循環嵌套
          new vDOM(child as Element)
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

  getPatches(vdomOld: vDOM) {
    return this.#diff(vdomOld, this);
  }

  // * 依據 `:for` 屬性動態生成子節點
  #updateChildrenBasedOnFor(vdom: vDOM | string) {
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
  #updateChildrenBasedOnIf(vdom: vDOM | string) {
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
            const compare = ((attr_value[_match](regexCompare) || ([] as any))[0] || "")[_trim]();
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
              delete (node_target as vDOM)[_props][tagIf];
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
  async #updateChildrenBasedOnPath(vdom: vDOM | string) {
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
        const dom = (createElement("div", text) as Element).cloneNode(true);
        const vdomNew = new vDOM(dom as Element);

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
  translate(key: string) {
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
  #updateVDOM(vdom: vDOM | string) {
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

  #getDataValue(value: string, data?: Record<string, any>) {
    if (value[_trim]()[_length] < 1) {
      return;
    }

    const is_sub = regexText[_test](value);
    let front = "";
    let tail = "";

    if (is_sub) {
      front = value[_split](regexText)[0] || "";
      tail = value[_split](regexText)[4] || "";
      value = (value[_match](regexText) as any)[1];
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

      value = (fit as any)[1];
      operator = (fit as any)[2];
      num = +(fit as any)[3] || 0;
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
      value = (fit as any)[1];
      date_format = (fit as any)[2];
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
  #diff(vdomOld: vDOM | null, vdomNew: vDOM | null, path: number[] = []): Patch[] {
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
    else if (vdomOld!.tag !== vdomNew!.tag) {
      return [{ [_type]: patchAction[_replace], [_index]: path, [_vdom]: vdomNew! }];
    }

    const patches: Patch[] = [];
    // * 比較屬性差異
    patches[_push](...this.#diffProps(vdomOld, vdomNew, path));
    // * 比較子元素差異
    patches[_push](...this.#diffChildren(vdomOld, vdomNew, path));

    return patches;
  }

  // * 比較屬性差異
  #diffProps(vdomOld: vDOM | null, vdomNew: vDOM | null, path: number[] = []): Patch[] {
    if (vdomOld == null || typeof vdomOld == "string" || vdomNew == null || typeof vdomNew == "string") {
      return [];
    }

    const ary: Patch[] = [];
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
  #diffChildren(vdomOld: vDOM | null, vdomNew: vDOM | null, path: number[] = []): Patch[] {
    if (vdomOld == null || typeof vdomOld == "string" || vdomNew == null || typeof vdomNew == "string") {
      return [];
    }

    const patches: Patch[] = [];
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
        patches[_push](...this.#diff(oldChild as vDOM, newChild as vDOM, currentPath));
      }
    }

    return patches;
  }
}
