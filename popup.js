'use strict';

const keywordBox = document.getElementById('keyword');

chrome.runtime.sendMessage({ message: 'get' }, response => {
  keywordBox.value = response.keyword;
});

document.getElementById('keyword').addEventListener('input', () => {
  const keyword = keywordBox.value;
  chrome.runtime.sendMessage({ message: 'setKeyword', keyword });
});

document.addEventListener('keypress', function (e) {
  if (e.keyCode == 13) {
    chrome.runtime.sendMessage({ message: 'replaceAll' });
    window.close();
  }
});