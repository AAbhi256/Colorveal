// let pbtR = document.getElementById('pbtR'), mbtR = document.getElementById('mbtR');
// pbtR.addEventListener('click', handler2aR, false);
// mbtR.addEventListener('click', handler2bR, false);

// let pbtG = document.getElementById('pbtG'), mbtG = document.getElementById('mbtG');
// pbtG.addEventListener('click', handler2aG, false);
// mbtG.addEventListener('click', handler2bG, false);

// let pbtB = document.getElementById('pbtB'), mbtB = document.getElementById('mbtB');
// pbtB.addEventListener('click', handler2aB, false);
// mbtB.addEventListener('click', handler2bB, false);


// let redvalues = [1, 0, 0, 0, 0];
// let greenvalues = [0, 1, 0, 0, 0];
// let bluevalues = [0, 0, 1, 0, 0];

// let red = 0; 
// let blue = 0;
// let green = 0;

// let applyB = document.getElementById('apply');
// applyB.addEventListener('click', handler, false);
// let checkState = false;
// function handler(e) {
//     let res = "";
//    // console.log("tf???????");
//    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     chrome.tabs.sendMessage(tabs[0].id, { msg: "add", data: "lol" }, (response) => {
//     });
//   });
//     checkState = document.getElementById('check').checked;
//     if(checkState){
        
//      res = red + " " + blue + " " + green;
//      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         chrome.tabs.sendMessage(tabs[0].id, { msg: "custom", data: res }, (response) => {
//         });
//     });
//     }else{
        
//      res = "";
//     for (let i=0; i<5; i++) {
//         res += redvalues[i] + " ";
//     }
//     res += " ";
//     for (let i=0; i<5; i++) {
//         res += greenvalues[i] + " ";
//     }
//     res += " ";
//     for (let i=0; i<5; i++) {
//         res += bluevalues[i] + " ";
//     }
//     res += " 0 0 0 1 0";
//     let svg = document.getElementById("customMatrix");
//     svg.setAttribute("values", res);
//     }
//     chrome.tabs.insertCSS(null, { code: 'html { -webkit-filter: url(#' + "CustomMatrix" + '); }' });

//     console.log(res); 
    
// } 

// function handler2aR(e) {
//     console.log("?");
//     if(checkState){
//     if (red <= 1.8)red += 0.2;
//     }else{
//     redvalues[0] *= 1.1;
//     }
//     update();
// }
// function handler2bR(e) {
//     if(checkState){
//     if (red >= 0.2) red -= 0.2;
//     }else{
//     if (redvalues[0]/1.1 >= 1) redvalues[0] /= 1.1;
// }
//     update();
// }

// function handler2aG(e) {
//     if(checkState){
//     if (green <= 1.8)green += 0.2;
//     }else{
//     greenvalues[1] *= 1.1;
// }
//     update();
// }
// function handler2bG(e) {
//     if(checkState){
//     if (green >= 0.2) green -= 0.2;
//     }else{
//     if (greenvalues[1]/1.1 >= 1) greenvalues[1] /= 1.1;}
//     update();
// }

// function handler2aB(e) {
//     if(checkState){
//     if (blue <= 1.8)blue += 0.2;
//     }else{
//     bluevalues[2] *= 1.1;
//     }
//     update();
// }
// function handler2bB(e) {
//     if(checkState){
//     if (blue >= 0.2) blue -= 0.2;
//     }else{
//     if (bluevalues[2]/1.1 >= 1) bluevalues[2] /= 1.1;}
//     update();
// }

// function update() {
//     let res = "";
//     checkState = document.getElementById('check').checked;
//     if(checkState){
//      res = red + " " + blue + " " + green;
//      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         chrome.tabs.sendMessage(tabs[0].id, { msg: "custom", data: res }, (response) => {
//         });
//     });
//     }else{
//      res = "";
//     for (let i=0; i<5; i++) {
//         res += redvalues[i] + " ";
//     }
//     res += " ";
//     for (let i=0; i<5; i++) {
//         res += greenvalues[i] + " ";
//     }
//     res += " ";
//     for (let i=0; i<5; i++) {
//         res += bluevalues[i] + " ";
//     }
//     res += " 0 0 0 1 0";
//     let svg = document.getElementById("customMatrix");
//     svg.setAttribute("values", res);
//     }
    
//     chrome.tabs.insertCSS(null, { code: 'html { -webkit-filter: url(#' + "CustomMatrix" + '); }' });

// }
let pbtR = document.getElementById('pbtR'), mbtR = document.getElementById('mbtR');
pbtR.addEventListener('click', handler2aR, false);
mbtR.addEventListener('click', handler2bR, false);

let pbtG = document.getElementById('pbtG'), mbtG = document.getElementById('mbtG');
pbtG.addEventListener('click', handler2aG, false);
mbtG.addEventListener('click', handler2bG, false);

let pbtB = document.getElementById('pbtB'), mbtB = document.getElementById('mbtB');
pbtB.addEventListener('click', handler2aB, false);
mbtB.addEventListener('click', handler2bB, false);


let redvalues = [1, 0, 0, 0, 0];
let greenvalues = [0, 1, 0, 0, 0];
let bluevalues = [0, 0, 1, 0, 0];

let applyB = document.getElementById('apply');
applyB.addEventListener('click', handler, false);

function handler(e) {
    let res = "";
    for (let i=0; i<5; i++) {
        res += redvalues[i] + " ";
    }
    res += " ";
    for (let i=0; i<5; i++) {
        res += greenvalues[i] + " ";
    }
    res += " ";
    for (let i=0; i<5; i++) {
        res += bluevalues[i] + " ";
    }
    res += " 0 0 0 1 0";
    console.log(res);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { msg: "custom", data: res }, (response) => {
        });
    });
} 

function handler2aR(e) {
    redvalues[0] *= 1.1;
    update();
}
function handler2bR(e) {
    if (redvalues[0]/1.1 >= 1) redvalues[0] /= 1.1;
    update();
}

function handler2aG(e) {
    greenvalues[1] *= 1.1;
    update();
}
function handler2bG(e) {
    if (greenvalues[1]/1.1 >= 1) greenvalues[1] /= 1.1;
    update();
}

function handler2aB(e) {
    bluevalues[2] *= 1.1;
    update();
}
function handler2bB(e) {
    if (bluevalues[2]/1.1 >= 1) bluevalues[2] /= 1.1;
    update();
}

function update() {
    let res = "";
    for (let i=0; i<5; i++) {
        res += redvalues[i] + " ";
    }
    res += " ";
    for (let i=0; i<5; i++) {
        res += greenvalues[i] + " ";
    }
    res += " ";
    for (let i=0; i<5; i++) {
        res += bluevalues[i] + " ";
    }
    res += " 0 0 0 1 0";
    let svg = document.getElementById("customMatrix");
    svg.setAttribute("values", res);
    chrome.tabs.insertCSS(null, { code: 'html { -webkit-filter: url(#' + "Custom" + '); }' });

}