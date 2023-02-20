let ul = document.createElement('ul');
let current = 'Original';
let vision = {
  'Original': '',
  'Protanomaly': '100%',
  'Deuteranomaly': '100%',
  'Tritanomaly': '100%',
  'Achromatomaly': '100%',
  'Custom': '100%'
}

Object.keys(vision).forEach(function (el) { //for each of the visions, add a button
  let li = document.createElement('li');
  li.dataset['type'] = el;
  li.textContent = el;
  li.addEventListener('click', handler, false); //handler function for events
  el == current && li.classList.add('current');
  ul.appendChild(li); //add the new html to the ul
})
let pbt = document.getElementById('pbt'), mbt = document.getElementById('mbt');
pbt.addEventListener('click', handler2a, false);
mbt.addEventListener('click', handler2b, false);

let inited = false;

function handler(e) {
  if (!inited) {
    inited = true;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { msg: "init", data: null }, (response) => {
      });
    });
  }

  current = this.dataset['type'];
  $.all('li').forEach(function(li) {
    li.classList.remove('current');
  })
  this.classList.add('current');
  chrome.tabs.insertCSS(null, { code: 'html { -webkit-filter: url(#' + current + '); }' });
  
  //chrome.tabs.insertCSS(null, { code: 'html { -webkit-filter: url(#' + current + '); }' }); //html { -webkit-filter: url(#Protanomaly);)}
}

function handler2a(e) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let sfilter = current + "Matrix";
    chrome.tabs.sendMessage(tabs[0].id, { msg: "add", data: sfilter }, (response) => {
    });
  });
}
function handler2b(e) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let sfilter = current + "Matrix";
    chrome.tabs.sendMessage(tabs[0].id, { msg: "sub", data: sfilter }, (response) => {
    });
  });
}

function $(selector, context) {
  return (context || document).querySelector(selector);
}
$.all = function (selector, context) {
  return Array.prototype.slice.call((context || document).querySelectorAll(selector));
}
document.body.appendChild(ul);
