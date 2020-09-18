export function objectFilter(src = {}, filter = []) {
  return Object.keys(src)
          .filter(key => filter.includes(key))
          .reduce((obj, key) => {
            obj[key] = src[key];
            return obj;
          }, {});
}

export function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i ++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

export function intoToRGB(i) {
  let c= (i & 0x00FFFFFF)
    .toString(16)
    .toUpperCase();
  return '00000'.substring(0, 6 - c.length) + c;
}
