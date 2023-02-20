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
