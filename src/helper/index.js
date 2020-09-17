export function objectFilter(src = {}, filter = []) {
  return Object.keys(src)
          .filter(key => filter.includes(key))
          .reduce((obj, key) => {
            obj[key] = src[key];
            return obj;
          }, {});
}
