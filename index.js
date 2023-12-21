console.log("Hello");

import { getSearchResults, debounce } from "./utils.js";

// getSearchResults("ap").then((item) => console.log(item));

const inputBox = document.getElementById("input-box");
const suggestionBox = document.getElementById("dropDown-section");

const handleReset = () => {
  suggestionBox.classList.remove("dropDown-suggestion-section");
};

const handleRenderResults = (list = []) => {
  const searchFragment = document.createDocumentFragment();
  list.forEach((ele) => {
    const item = document.createElement("div");
    item.innerHTML = ele;
    item.setAttribute("data-key", ele);
    item.classList.add("dropdown-item");
    searchFragment.appendChild(item);
  });
  suggestionBox.innerHTML = "";
  suggestionBox.appendChild(searchFragment);
};

const handleSearchResult = async (keyword) => {
  const result = await getSearchResults(keyword);
  console.log(result);
  if (result.length) {
    suggestionBox.classList.add("dropDown-suggestion-section");
    handleRenderResults(result);
  }
};

const handleSearchInput = (event) => {
  const value = event.target.value;
  if (value) {
    handleSearchResult(value);
  } else {
    handleReset();
  }
};

const handleItemClick = (event) => {
  const { key } = event.target.dataset;
  if (key) {
    inputBox.value = key;
    handleReset();
  }
};

(() => {
  inputBox.addEventListener("input", debounce(handleSearchInput));
  suggestionBox.addEventListener("click", handleItemClick);
})();
