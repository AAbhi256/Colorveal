
let xhr = new XMLHttpRequest(); 
// var currFilter;
let currMatrix;
let curr  = 1;
let ps = [[0, 1.05118294, -0.05116099],[0, 1,0],[0,0,1]];
let ds =  [[1, 0, 0],[0.9513092, 0, 0.04866992],[0, 0, 1]];
let st =  [[1, 0, 0],[0, 1, 0],[-0.86744736, 1.86727089]];
let t2 = [[0.0841456, 0.708538, 0.148692], [-0.0767272, 0.983854, 0.0817696],[-0.0192357,0.152575, 0.876454]]
let t1 = [[5.47221, -4.64196,0.169637],[-1.12524, 2.29317, -0.167895],[0.0298017, -0.193181,1.16365]];
//let Sp = [[],[],[]];
// function changeFilter(name){
  //xhr = new XMLHttpRequest();
  xhr.open('GET', chrome.extension.getURL('filter/filtersa.svg')) //extension vs runtime
  //chik[0] = bird;
  //  if(currFilter == null){
  //   let g=document.createElement('button');
  //   g.textContent ="chick";
  // document.body.appendChild(g);
  xhr.addEventListener('load', function(e) {
      let filter = xhr.responseXML.documentElement;
      filter.style.display = 'none';
      document.body.appendChild(filter);
    })

function changeFilter(type, perc){
  //should be 5x4 matrix, make into 3x3 
  currMatrix();

  if(type == "protonomaly"){
    return inverse(t1)*inverse(t2)*lerp([[1, 0, 0],[0, 1, 0],[0, 0, 1]],ps, perc)*t2*t1;
  }else if(type == "deuteronomaly"){
    return inverse(t1)*inverse(t2)*lerp([[1, 0, 0],[0, 1, 0],[0, 0, 1]],ds, perc)*t2*t1;

  }else if(type == "tritanomaly"){   
    return inverse(t1)*inverse(t2)*lerp([[1, 0, 0],[0, 1, 0],[0, 0, 1]],ts, perc)*t2*t1;

  }
  return [[1, 0, 0],[0, 1, 0],[0, 0, 1]];
}
function inverse(mat1){
  //let R2 = mat2.length, C2 = mat2[0].length;
  let R1 = mat1.length, C1 = mat1[0].length;
  if ( C1 != R1) return false;
  
  let det1 = 0;
  for(let i =0; i < C1; i++){ //amount of times to go across and multiply 
    let cross = 1;
    for(let j = 0; j < C1; j++){
        
        cross *= mat1[(j+i)%3][j]; 
    }
    det1 += cross;
    cross = 1;
    for(let k = 0; k < C1; k++){
      cross *= -mat1[((C1-1) -(k+i)%3)][(C1 - 1) - k];
    }
    det1 += cross;
  }
  // let det2 = 0;
  // for(let i =0; i < C2; i++){ //amount of times to go across and multiply 
  //   let cross = 1;
  //   for(let j = 0; j < C2; j++){
        
  //       cross *= mat2[(j+i)%3][j]; 
  //   }
  //   det2 += cross;
  //   cross = 1;
  //   for(let k = 0; k < C2; k++){
  //     cross *= -mat2[((C2-1) -(k+i)%3)][(C2 - 1) - k];
  //   }
  //   det2 += cross;
  //find determinant
  //}

  //multiply matrix by determinant
  for(let i = 0; i < R1; i++){
    for(let j = 0; j < R1; j++){
      mat1[i][j] *= (1/det1);

    }
  }

  // for(let i = 0; i < R2; i++){
  //   for(let j = 0; j < R2; j++){
  //     mat2[i][j] *= (1/det2);

  //   }
  // }
  return mat1;
}
  
  function lerp(start, end, t) {
    const result = [];
    for (let row = 0; row < start.length; row++) {
        const newRow = [];
        for (let col = 0; col < start[0].length; col++) {
            newRow.push(start[row][col] + (end[row][col] - start[row][col]) * t)
        }
        result.push(newRow);
    } return result;
}
function multiply(mat1, mat2) {
  let R1 = mat1.length, C1 = mat1[0].length;
  let R2 = mat2.length, C2 = mat2[0].length;
  if (C1 != R2) return false;

  let res = new Array(R1);

  for (var i = 0; i < R1; i++) {
      res[i] = new Array(C2);
  }
  // mat [row] [col] 
  console.log(R1, C1, R2, C2)
  for (let i=0; i<R1; i++) { //for each row in res
      for (let j=0; j<C2; j++) { //for each col in res
          let w = 0;
          for (let k=0; k<C1; k++) {
              w += mat1[i][k]*mat2[k][j]; 
          }
          res[i][j] = w;
      }
  }
  return res;
}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  //console.log("some message receieved");
  if (request.msg == "add") {
      let sfilter = request.data;
      let svg = document.getElementById(sfilter);
      let curValues = svg.values.baseVal;
      let res = "";
      //change to 3x3 matrix
      if(curr <= 1 || curr >= 0){ 
         changeFilter(sfilter, Math.floor(1,curr + .15));
      }
      for (let i=0; i<5; i++) {
        for (let j=0; j<4; j++) {
          let x = curValues[i*5+j].value;
        
        }
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
