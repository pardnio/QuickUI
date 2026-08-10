function createElement(tag = "", val0?: any, val1?: any) {
  const css_tag = ((tag[_match](regex_css_tag) || [])[0] || "")[_trim]();
  const css_id = ((tag[_match](regex_css_id) || [])[1] || "")[_trim]();
  const css_class = (regex_css_class[_test](tag) ? tag[_match](regex_css_class) || [] : [])[_map]((e: string) =>
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
    (dom as HTMLElement)[_id] = css_id;
  }

  for (let e of css_class) {
    (dom as HTMLElement)[_classList][_add](e);
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
        (dom as any)[e] = value;
      } else if (["color", "backgroundColor", "width", "height", "display", "float"][_indexOf](e) != -1) {
        ((dom as HTMLElement)[_style] as any)[e] = value;
      } else if (value != null) {
        (dom as HTMLElement)[_setAttribute](e, value);
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
        (dom as HTMLImageElement)[_src] = value;
      } else if (isTemp) {
        dom[_appendChild]($document[_createTextNode](children_value));
      } else {
        (dom as HTMLElement)[_innerHTML] = value;
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

window._ = createElement;
