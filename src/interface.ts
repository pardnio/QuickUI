interface Window {
  QUI: any;
}

type Patch =
  | { type: "CREATE"; vdom: vDOM | string; index: number[] }
  | { type: "APPEND"; vdom: vDOM | string; index: number[] }
  | { type: "REPLACE"; vdom: vDOM; index: number[] }
  | { type: "TEXT"; vdom: vDOM; value: string; index: number[] }
  | { type: "PROP"; vdom: vDOM; key: string; value: string | null | undefined; index: number[] }
  | { type: "REMOVE"; index: number[] };
