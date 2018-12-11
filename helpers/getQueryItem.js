export default function getQueryItem(search, param) {
  let query = [];
  if (search) {
    query = search
      .replace('?', '')
      .split('&')
      .filter(o => o.indexOf(param) !== -1);
    query = query.length ? query[0].split('=') : [];
  }
  return query.length ? query[1] : null;
}
