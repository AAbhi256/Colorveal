
let xhr = new XMLHttpRequest(); 
// var currFilter;
let svgog = document.getElementById(sfilter);

function svgToMatrix(mat1){
  let outmatr = new Array(4);
  for(let i = 0; i < 4; i++){
    outmatr[i] = new Array(5);
  }

  for(let i= 0; i < 5; i++){
    for(let j = 0; j < 4; j++)
     {
      outmatr[i][j] = mat1[i*5 + j];
     }

  }
  return outmatr;
}
function matrixToSvg(mat1){
  let outmtr = new Array(mat1*length * mat1[0].length);
  for(let i= 0; i < 5; i++){
    for(let j = 0; j < 4; j++)
     {
      outmatr[i*5 +j] = mat1[j][i];
     }

  }
  return outmatr;
}
let currMatrix =  svgToMatrix(svg.values.baseVal);
let curr  = 1;
let ps = [[0, 1.05118294, -0.05116099],[0, 1,0],[0,0,1]];
let ds =  [[1, 0, 0],[0.9513092, 0, 0.04866992],[0, 0, 1]];
let st =  [[1, 0, 0],[0, 1, 0],[-0.86744736, 1.86727089]];
let t2 = [[0.0841456, 0.708538, 0.148692], [-0.0767272, 0.983854, 0.0817696],[-0.0192357,0.152575, 0.876454]]
let t1 = [[5.47221, -4.64196,0.169637],[-1.12524, 2.29317, -0.167895],[0.0298017, -0.193181,1.16365]];
  xhr.open('GET', chrome.extension.getURL('filter/filtersa.svg')) //extension vs runtime
  xhr.addEventListener('load', function(e) {
      let filter = xhr.responseXML.documentElement;
      filter.style.display = 'none';
      document.body.appendChild(filter);
    })

function changeFilter(type, perc){
  //should be 5x4 matrix, make into 3x3 
  let arr = new Array(3);
  for(let i =0; i < 3; i++){
    arr[i] = new Array(3); 
  }
  //converts to 3x3 matrix
  for(let i = 0; i < 3; i++){
      for(let j =0; j < 3; j++){
          arr[i][j] = currMatrix; 
      }
  }
  let fin;
  if(type == "protonomaly"){

    fin= inverse(t1)*inverse(t2)*lerp([[1, 0, 0],[0, 1, 0],[0, 0, 1]],ps, perc)*t2*t1;
  }else if(type == "deuteronomaly"){
    fin= inverse(t1)*inverse(t2)*lerp([[1, 0, 0],[0, 1, 0],[0, 0, 1]],ds, perc)*t2*t1;

  }else if(type == "tritanomaly"){   
    fin= t1*t2*lerp([[1, 0, 0],[0, 1, 0],[0, 0, 1]],ts, perc)*inverse(t2)*inverse(t1);

  }
  fin= [[1, 0, 0],[0, 1, 0],[0, 0, 1]];

  //converts back to 5x4
  for(let i =0; i < 3; i++){
    for(let j=0; j <3; j++){
      arr[i][j] = fin[i][j];
    }
  }

  return matrixToSvg(arr);
}
function det(mat1) {
  
  let R1 = mat1.length, C1 = mat1[0].length;
  if (C1 != R1) {return false;}

  let det1 = 0;
  for (let i = 0; i < C1; i++) { //amount of times to go across and multiply 
    let cross = 1;
    for (let j = 0; j < C1; j++) {
      
      cross *= mat1[(j + i) % C1][j]
    }
    if(C1 == 2){
    det1 -= cross;
    }else{
      det1 +=cross;
    }
      cross = 1;
    for (let k = 0; k < C1; k++) {
     
      cross *= mat1[(k+i)%C1 ][(C1 - 1) - k];
      
    }

    if(C1 ==2){
      det1 += cross;
      i++;
    }else{
      det1 -= cross;
    }
    
    }
  if(C1 ==2 ){
    return -det1;
  }
  return det1;
}

function inverse(mat1){
  let R1 = mat1.length;
  if (R1 != mat1[0].length) return false;
  let finalMatr  = new Array(R1);
  for(let f = 0; f< R1; f++){
    finalMatr[f] = new Array(R1);
  }
  let matDet = det(mat1);
  for(let r1 = 0; r1 < R1; r1++){
    for(let c1 = 0; c1 < R1; c1++){
      let currMatr = new Array(R1-1);
      for(let g = 0; g < R1-1; g++){
        currMatr[g] = new Array(R1-1);
      }
      for(let i = 0;i <R1 - 1; i++){
            for(let j =0; j < R1 - 1;j++){
               currMatr[i][j] = mat1[((r1+1) +i)%R1][((c1 +1)+j)%R1];
            }
         }      
      finalMatr[c1][r1] = (1/matDet)*det(currMatr) *Math.pow(-1, r1 + c1);
    }
  }
    return finalMatr;
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
  //console.log(R1, C1, R2, C2)
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
      let curValues; 
      //currMatrix = curValues;
      let res = "";
      //change to 3x3 matrix
      if(curr <= 1 || curr >= 0){ 
         curValues = changeFilter(sfilter, Math.floor(1,curr + .15));
        currMatrix = curValues; 
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
