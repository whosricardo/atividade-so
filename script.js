const container = document.getElementById("algorithm-container");
const startBtn = document.getElementById("btn-start");
const resetBtn = document.getElementById("btn-reset");

startBtn?.addEventListener("click", () => {
    container.innerHTML = `<div role="status"><em>Starting simulation…</em></div>`;
    // Montem aqui o Algoritmo
});

resetBtn?.addEventListener("click", () => {
    container.innerHTML = `<div><code>#algorithm-container</code></div>`;
});

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
        rect(x, height - 100 * baseSize, 100 * baseSize, 100 * baseSize)
        fill(0)
        text(`P${i}\n${i.toString(2).padStart(3, "0")}`, x, height - 100 * baseSize)
    }

    fill(255, 255, 0)
    rect(width / 2, height - 250 * baseSize, width * 0.741, 100 * baseSize)
    fill(0, 0, 255)
    const q = requests.map((v) => v.id)
    q.unshift(p)
    text(`Fila: ${p === -1 ? "vazia" : q}`, width / 2, height - 250 * baseSize)

    fill(127)
    rect(100 * baseSize, 150 * baseSize, 100 * baseSize, 200 * baseSize)
    if (p === -1) {
        fill(0, 255, 0)
        circle(100 * baseSize, 200 * baseSize, 75 * baseSize)
    } else {
        fill(255, 0, 0)
        circle(100 * baseSize, 100 * baseSize, 75 * baseSize)

        dw = width / 3

        fill(0, 0, 255)
        for (let i = 0; i < 3; i++) {
            const bit = (p << i) & 4
            const x = dw * (i - 1) + width / 2
            if (bit) {
                rect(x, height - 500 * baseSize, 100 * baseSize, 400 * baseSize)
            }
        }
    }
}