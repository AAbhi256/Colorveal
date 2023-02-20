let xhr = new XMLHttpRequest();
xhr.open('GET', chrome.extension.getURL('filter/filters.svg')) //extension vs runtime
xhr.addEventListener('load', function(e) {
  let filter = xhr.responseXML.documentElement;
  filter.style.display = 'none';
  document.body.appendChild(filter);
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  //console.log("some message receieved");
  if (request.msg == "add") {
      let sfilter = request.data;
      let svg = document.getElementById(sfilter);
      let curValues = svg.values.baseVal;
      let res = "";
      for (let i=0; i<4; i++) {
        for (let j=0; j<5; j++) {
          let x = curValues[i*5+j].value;
          if (x > 1) {
            let nv = x*1.1;
            res += nv.toString() + " ";
          }
          else if (x > 0 && x != 1) {
            let nv = x*1.00015;
            res += nv.toString() + " ";
          }
          else {
            res += x.toString() + " ";
          }
        }
        res += " ";
      }
      svg.setAttribute('values', res);
      //console.log(svg.values);
      //console.log(res);
      sendResponse({ sender: "popup.js", data: "bald"  }); 
  }
  return true;
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  //console.log("some message receieved");
  if (request.msg == "sub") {
      let sfilter = request.data;
      let svg = document.getElementById(sfilter);
      let curValues = svg.values.baseVal;
      let res = "";
      for (let i=0; i<4; i++) {
        for (let j=0; j<5; j++) {
          let x = curValues[i*5+j].value;
          if (x/1.1 > 1) {
            let nv = x/1.1;
            res += nv.toString() + " ";
          }
          else if (x/1.00015 > 0 && x != 1) {
            let nv = x/1.00015;
            res += nv.toString() + " ";
          }
          else {
            res += x.toString() + " ";
          }
        }
        res += " ";
      }
      svg.setAttribute('values', res);
      //console.log(svg.values);
      //console.log(res);
      sendResponse({ sender: "popup.js", data: "bald"  }); // This response is sent to the message's sender 
  }
  else if (request.msg == "custom") {
    let values = request.data;
    let svg = document.getElementById("CustomMatrix");
    //console.log(values);

    chrome.storage.sync.set({'key': values}, function() {
    });
    

    svg.setAttribute('values', values);
  }
  else if (request.msg == "init") {
    chrome.storage.sync.get(['key'], function(result) {
      let temp = result.key;
      //console.log(temp);
      if (temp != null) {
        let svg = document.getElementById("CustomMatrix");
        svg.setAttribute('values', temp);
      }
    });
  }
  return true;
});

xhr.send();
