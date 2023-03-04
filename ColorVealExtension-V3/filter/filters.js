var xhr; 
var currFilter;
changeFilter(filters1);
function changeFilter(name){
  xhr = new XMLHttpRequest();
  xhr.open('GET', chrome.extension.getURL('filter/'+name+'.svg')); //extension vs runtime

   if(name == null){
    xhr.addEventListener('load', function(e) {
      let filter = xhr.responseXML.documentElement;
      filter.style.display = 'none';
      currFilter = document.body.appendChild(filter);
    })
   }else{
    let filter = xhr.responseXML.documentElement;
    filter.style.display = 'none';
    document.body.remove(currFilter);
    currFilter = document.body.appendChild(filter);
   }
}
// function matrMult(w, l, matrix, w2, l2, matrix2){
   function multiply(mat1, mat2, res)
{
    let res = new Array(N);
    for(let m = 0; m < mat1.length; m++){
       res[m] = new Array(mat1.length);
    }
    
    let i, j, k;
    for (i = 0; i < N; i++) {
        for (j = 0; j < N; j++) {
            res[i][j] = 0;
            for (k = 0; k < N; k++)
                res[i][j] += mat1[i][k] * mat2[k][j];
        }
    }
    return res

  // const matr =[]
  // for(let i = 0; i < w *l; i++){
  //     matr[i] = parseInt[i];
  //  }
  //  const matr2 =[]
  // for(let i2 = 0; i < w2 *l2; i2++){
  //     matr2[i2] = parseInt[i2];
  //  }
  //  const finalMatr = [];
  //  let c =0;
  //  let cr = 0;
  //  for(let cr =0; cr < l; cr ++){
  //  for(let j = 0; j < l2; j++){
  //      for(let k =0; k < w; k++){
          
  //         finalMatr[c] += matr[cr*w+k] + matr2[kw+j]
  //         c++
  //      }
  //   }
  //  }
}
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
  }else if(request.msg == "changeFilter"){
      let type = request.data;
      changeFilter("filters"+type);
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
