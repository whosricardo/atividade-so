const container = document.getElementById("algorithm-container");
const startBtn = document.getElementById("btn-start");
const resetBtn = document.getElementById("btn-reset");


class Process {
    constructor(id, time) {
        this.id = id
        this.time = time
    }
}

const requests = []
let p = -1
let dt = 0
let time

let baseSize = 768

function setup() {
    const container = document.getElementById("algorithm-container")
    const canvas = createCanvas(container.offsetWidth, container.offsetHeight)
    canvas.parent("algorithm-container")
    baseSize = max(width, height) / 1366
    rectMode(CENTER, CENTER)
    textAlign(CENTER, CENTER)
    textSize(30 * baseSize)
    time = millis()
}

function draw() {
    const actualTime = millis()
    if (actualTime - time > dt) {
        if (requests.length > 0) {
            const process = requests.shift()
            time = actualTime
            p = process.id
            dt = process.time
        } else {
            p = -1
            if (Math.random() < 0.01)
                for (let i = 0; i < Math.random() * 8; i++) {
                    const idx = Math.floor(Math.random() * 8)
                    if (!requests.some((obj) => obj.id === idx))
                        requests.push(new Process(idx, Math.random() * 2000 + 1000))
                    else
                        i--
                }
        }
    }

    background(0)

    let dw = width / 8

    for (let i = 0; i < 8; i++) {
        const x = (i + 0.5) * dw
        if (p === i)
            fill(255, 0, 255)
        else
            fill(255)
        rect(x, height - 100 * baseSize, 100 * baseSize, 100 * baseSize,6)
        fill(0)
        fill(255);
        text(`P${i}`, x, height - 130 * baseSize);

        
        const bits = i.toString(2).padStart(3, "0");


    for (let b = 0; b < 3; b++) {
        const bit = bits[b];
        if (bit === "0") fill(0, 255, 0);      
        else fill(255, 0, 0);                  

        const size = 16 * baseSize;
        const spacing = 22 * baseSize;
        const bx = x + (b - 1) * spacing;
        const by = height - 80 * baseSize;
        rect(bx, by, size, size, 4);
}
    }

    fill(255, 255, 0)
    rect(width / 2, height - 250 * baseSize, width * 0.741, 100 * baseSize,6)
    fill(0, 0, 255)
    const q = requests.map((v) => v.id)
    q.unshift(p)
    text(`Fila: ${p === -1 ? "vazia" : q}`, width / 2, height - 250 * baseSize)

    if (p === -1) {
        switchToGreen()
    } else {
        switchToRed()     

        dw = width / 3

        fill(0, 0, 255)
        for (let i = 0; i < 3; i++) {
            const bit = (p << i) & 4
            const x = dw * (i - 1) + width / 2
            if (bit) {
                rect(x, height - 500 * baseSize, 100 * baseSize, 400 * baseSize,6)
                
 
            }
        }
    }   


}
const redLamp = document.querySelector('.lamp.red');
const yellowLamp = document.querySelector('.lamp.yellow');
const greenLamp = document.querySelector('.lamp.green');

function switchToRed() {
  redLamp.classList.add('on');
  yellowLamp.classList.remove('on');
  greenLamp.classList.remove('on');
}

function switchToGreen() {
  redLamp.classList.remove('on');
  yellowLamp.classList.remove('on');
  greenLamp.classList.add('on');
}
