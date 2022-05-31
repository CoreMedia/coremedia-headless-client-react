export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export const flattenItems = (obj: Array<any | null>): Array<any> => {
  const map = obj.filter(notEmpty).map((value) => {
    if ("defaultContent" in value) {
      return value.defaultContent;
    } else if ("items" in value) {
      return value.items;
    } else {
      return value;
    }
  });
  return [].concat(...map);
};
