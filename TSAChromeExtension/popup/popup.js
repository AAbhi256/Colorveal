let ul = document.createElement('ul'),
    current = 'Original',
    vision = {
      'Original': '',
      'Protanomaly': '100%',
      'Deuteranomaly': '100%',
      'Tritanomaly': '100%',
      'Achromatomaly': '100%',
    }

Object.keys(vision).forEach(function (el) {
  let li = document.createElement('li');
  li.dataset['type'] = el;
  li.textContent = el;
  li.addEventListener('click', handler, false);
  el == current && li.classList.add('current');
  ul.appendChild(li);
})

function handler(e) {
  current = this.dataset['type'];
  $.all('li').forEach(function(li) {
    li.classList.remove('current');
  })
  this.classList.add('current');
  chrome.tabs.insertCSS(null, { code: 'html { -webkit-filter: url(#' + current + '); }' });
}

function $(selector, context) {
  return (context || document).querySelector(selector);
}
$.all = function (selector, context) {
  return Array.prototype.slice.call((context || document).querySelectorAll(selector));
}
document.body.appendChild(ul);
