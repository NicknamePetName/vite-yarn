function setStorage(key, obj) {
  window.localStorage.setItem(key, JSON.stringify(obj));
}

function getStorage(key) {
  const strObj = window.localStorage.getItem(key);
  return JSON.parse(strObj);
}

export { setStorage, getStorage };
