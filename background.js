'use strict';

let keyword = '';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.message) {
    case 'get':
      sendResponse({ keyword });
      break;
    case 'setKeyword':
      keyword = request.keyword;
      break;
    case 'tabLoaded':
      sendResponse({ keyword });
      break;
    case 'replaceAll':
      return replaceAll();
      break;
  }
});

function replaceAll() {
  new Promise(async resolve => {
    let tabList = [];
    chrome.windows.getAll({ populate: true }, windows => {
      windows.forEach(window => {
        window.tabs.forEach(tab => {
          tabList.push(tab);
        });
      });
      resolve(tabList);
    });
  }).then(tabList => {
    tabList.forEach(tab => chrome.tabs.sendMessage(tab.id, { message: 'replaceAll', keyword }));
  });
  return true; // this means its async
}

