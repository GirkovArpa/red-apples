'use strict';

let KEYWORD = '';

window.onscroll = function () {
  excludeAll(KEYWORD);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message == 'replaceAll') {
    console.log('EVENT: manual');
    const { keyword } = request;
    replaceAll({ keyword });
    sendResponse({ message: 'done ' });
  }
});

window.addEventListener('load', () => {
  console.log('EVENT: load');
  chrome.runtime.sendMessage({ message: 'tabLoaded' }, replaceAll);
});

function replaceAll({ keyword }) {
  KEYWORD = keyword;
  excludeAll(keyword);
}

function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function includes(string, keyword) {
  const regex = new RegExp(`${escapeRegExp(keyword)}`, 'i');
  return regex.test(string);
}

function excludeAll(keyword) {
  console.log(`Excluding all << ${keyword} >>`);
  if (keyword == '') return;

  document.querySelectorAll('div .g').forEach((div) => {
    includes(div.innerHTML, keyword) && div.remove();
  });

  document.querySelectorAll('ytd-video-renderer').forEach((div) => {
    includes(div.innerHTML, keyword) && div.remove();
  });

  document.querySelectorAll('div').forEach((div) => {
    div.dataset.rank && includes(div.innerHTML, keyword) && div.remove();
  });

}

