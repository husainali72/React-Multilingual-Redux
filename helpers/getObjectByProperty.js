export default function getObjectByProperty(arr, prop, value) {
  if (!arr || !arr.length) return {};
  const filteredData = arr.filter(o => o[prop] === value);
  if (!filteredData || !filteredData.length) return {};
  return filteredData[0];
}
