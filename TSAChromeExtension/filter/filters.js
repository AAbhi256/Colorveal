let xhr = new XMLHttpRequest();
xhr.open('GET', chrome.extension.getURL('filter/filters.svg')) //extension vs runtime
xhr.addEventListener('load', function(e) {
  let filter = xhr.responseXML.documentElement;
  filter.style.display = 'none';
  document.body.appendChild(filter);
})
xhr.send();
