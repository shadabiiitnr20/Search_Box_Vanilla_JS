import { FRUITS } from "./data.js";

export const getSearchResults = (keyword) => {
  const result = FRUITS.filter(
    (item) =>
      item.substring(0, keyword.length).toLowerCase() === keyword.toLowerCase()
  );
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(result);
    }, 1 * 1000);
  });
};

export const debounce = (fn, delay = 500) => {
  let timer;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};
