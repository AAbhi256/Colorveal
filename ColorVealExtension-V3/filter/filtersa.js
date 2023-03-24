let xhr = new XMLHttpRequest();
xhr.open('GET', chrome.extension.getURL('filter/filtersa.svg')) //extension vs runtime
xhr.addEventListener('load', function(e) {
  let filter = xhr.responseXML.documentElement;
  filter.style.display = 'none';
  document.body.appendChild(filter);
})

function svgToMatrix(mat1){
  let outmatr = new Array(4);
  for(let i = 0; i < 4; i++){
    outmatr[i] = new Array(5);
  }

  for(let i= 0; i < 4; i++){
    for(let j = 0; j < 5; j++)
     {
     // console.log("ok");
      outmatr[i][j] = mat1[i*5 + j].value;
     }

  }
  return outmatr;
}
function matrixToSvg(mat1){
  let outmtr = new Array(mat1.length * mat1[0].length);
  for(let i= 0; i < 4; i++){
    for(let j = 0; j < 5; j++)
     {
      if(i <3 && j<3){
      outmtr[i*5+j] = mat1[i][j];
     }else if( i == 3 && j == 3){
       outmtr[i *5 +j] = 1;
     }else{
       outmtr[i * 5 + j] = 0;
     }
    }
  }
 // console.log(outmtr);
  return outmtr;
}

//let currMatrix =  svgToMatrix(svg.values.baseVal);
let curr  = 1;
let ps = [[0, 1.05118294, -0.05116099],[0, 1,0],[0,0,1]];
let ds =  [[1, 0, 0],[0.9513092, 0, 0.04866992],[0, 0, 1]];
let ts =  [[1, 0, 0],[0, 1, 0],[-0.86744736, 1.86727089]];
let t1 = [[0.4124564, 0.3575761,0.1804375],[0.2126729,0.7151522, 0.0721750], [0.0193339, 0.1191920, 0.9503041]]
let t2 = [[0.4002, 0.7076,-0.0808],[-0.2263, 1.1653, -0.0808],[0, 0, 0.9182]];
function changeFilter(type, perc){
  //should be 5x4 matrix, make into 3x3 
  console.log(type);
  console.log("instantiated 3x3 matrix");
  let arr = new Array(3);
  for(let i =0; i < 3; i++){
    arr[i] = new Array(3); 
  }
  
  let fin;
  
  console.log("getting filter");
  if(type == "ProtanomalyMatrix"){
    fin= multiply(multiply(multiply(multiply(inverse(t1),inverse(t2)),lerp([[1, 0, 0],[0, 1, 0],[0, 0, 1]],ps, perc)),t2),t1);
  }else if(type == "DeuteranomalyMatrix"){
    fin= multiply(multiply(multiply(multiply(inverse(t1),inverse(t2)),lerp([[1, 0, 0],[0, 1, 0],[0, 0, 1]],ds, perc)),t2),t1);

  }else if(type == "TritanomalyMatrix"){   
    fin= multiply(multiply(multiply(multiply(inverse(t1),inverse(t2)),lerp([[1, 0, 0],[0, 1, 0],[0, 0, 1]],ts, perc)),t2),t1);

  }else{
    fin= multiply(multiply(multiply(multiply(inverse(t1),inverse(t2)),[[1, 0, 0],[0, 1, 0],[0, 0, 1]]),t2),t1);
  }
  console.log("converting back to 5x4");
  //converts back to 5x4
  for(let i =0; i < 3; i++){
    for(let j=0; j <3; j++){
      
      if(type == "ProtanomalyMatrix" || type == "DeuteranomalyMatrix"){
        if((i == 0 || i == 1)&& j ==2){
           arr[i][j] = 0;
        } else if(i == 2 && j ==2){
           arr[i][j] = 1;
        }else{
          arr[i][j] = fin[i][j];
        }
      }else if(type == "TritanomalyMatrix"){
         if((i== 2 ||i ==1) && j ==0){
           arr[i][j]= 0;
         } else if(i== 0 && j ==0){
           arr[i][j]  = 1;
         }
         else {
            arr[i][j] = fin[i][j];
          }
      }
      
    }
  }
  console.log(arr);
  let ff =matrixToSvg(arr);  
  //console.log("converting to svg format");
  //console.log(ff);
  return ff;
}
function det(mat1) {
  
  let R1 = mat1.length, C1 = mat1[0].length;
  if (C1 != R1) {return false;}

  let det1 = 0;
  for (let i = 0; i < C1; i++) { //amount of times to go across and multiply 
    let cross = 1;
    for (let j = 0; j < C1; j++) {
      
      cross *= mat1[(j + i) % C1][j];
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
      finalMatr[c1][r1] = (1/matDet)*det(currMatr) /*Math.pow(-1, r1 + c1)*/;
    }
  }
    return finalMatr;
}

  
  function lerp(start, end, t) {
    const result = [];
    console.log(t);
    console.log(start, end);
    for (let row = 0; row < start.length; row++) {
        const newRow = [];
        for (let col = 0; col < start[0].length; col++) {
            newRow.push(start[row][col] + (end[row][col] - start[row][col]) * t);
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
  for (let i=0; i<R1; i++) { //for each row in res
      for (let j=0; j<C2; j++) { //for each col in res
          let w = 0;
          for (let k=0; k<C1; k++) {
              w += mat1[i][k]*mat2[k][j]; 
          }
          res[i][j] = w;
      }
  }
  //console.log("multiplying");
  //console.log(res);
  return res;
}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  //console.log("some message receieved");
  if(request.msg == "change"){
    let sfilter = request.data.split(", ")[1];
    let strength = request.data.split(", ")[0];
    console.log("sfilter: " + sfilter);
    console.log("strength: "+ strength);
    let svg = document.getElementById(sfilter);
    let res = "";
   
    let curValues = changeFilter(sfilter, (parseInt(strength)/100) * 2);
    for(let f = 0; f < 4*5; f++){
      res += curValues[f].toString() +  " ";
    }
    
    console.log("string filter final");
    
    svg.setAttribute('values', res);
    svg.setAttribute("color-interpolation-filters","linearRGB");
    sendResponse({ sender: "popup.js", data: "bald"  }); 
    return true;
  }
  if (request.msg == "add") {
        let sfilter = request.data;
       let svg = document.getElementById(sfilter);
      // let curValues ; 
      // //currMatrix = curValues;
      // let res = "";
      // //change to 3x3 matrix
      // // if(curr <= 1 || curr >= 0){ 
      // //    curValues = changeFilter(sfilter, Math.floor(1,curr + .15));
      // //   currMatrix = curValues; 
      // //   }
      
        

      // for (let i=0; i<5; i++) {
      //   for (let j=0; j<4; j++) {
      //     let x = curValues[i*5+j].value;
        
      //   }
      //     if (x > 1) {
      //       let nv = x*1.1;«
      //       res += nv.toString() + " ";
      //     }
      //     else if (x > 0 && x != 1) {
      //       let nv = x*1.00015;
      //       res += nv.toString() + " ";
      //     }
      //     else {
      //       res += x.toString() + " ";
      //     }
      //   }
      //   res += " ";
      
      // svg.setAttribute('values', res);
      // //console.log(svg.values);
      // //console.log(res);
      console.log(svg.values.baseVal);
      }
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
