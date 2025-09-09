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
