const colorInicial = { r: 187, g: 222, b: 251 };
const colorFinal   = { r:   0, g: 255, b:   0 };
const pasos        = 60;
let pasoActual     = 0;
let intervaloColor;

const aq   = document.getElementById('contenedorPregunta2');
const nLbl = document.getElementById('countNemo');
const dLbl = document.getElementById('countDory');
const nBtn = document.getElementById('btnNemo');
const dBtn = document.getElementById('btnDory');
const cBtn = document.getElementById('btnClean');

function cargarContadores() {
    const nemo = parseInt(localStorage.getItem('nemoCount')) || 0;
    const dory = parseInt(sessionStorage.getItem('doryCount')) || 0;
    nLbl.textContent = nemo;
    dLbl.textContent = dory;
}

function guardarNemo() {
    const v = parseInt(nLbl.textContent, 10) + 1;
    localStorage.setItem('nemoCount', v);
    nLbl.textContent = v;
}

function guardarDory() {
    const v = parseInt(dLbl.textContent, 10) + 1;
    sessionStorage.setItem('doryCount', v);
    dLbl.textContent = v;
}

function actualizarColor() {
    if (pasoActual >= pasos) {
        clearInterval(intervaloColor);
        return;
    }
    const t = ++pasoActual / pasos;
    const r = Math.round(colorInicial.r + t * (colorFinal.r - colorInicial.r));
    const g = Math.round(colorInicial.g + t * (colorFinal.g - colorInicial.g));
    const b = Math.round(colorInicial.b + t * (colorFinal.b - colorInicial.b));
    aq.style.backgroundColor = `rgb(${r},${g},${b})`;
}

function limpiarPecera() {
    clearInterval(intervaloColor);
    pasoActual = 0;
    aq.style.backgroundColor =
        `rgb(${colorInicial.r},${colorInicial.g},${colorInicial.b})`;
    intervaloColor = setInterval(actualizarColor, 1000);
}

window.addEventListener('DOMContentLoaded', () => {
    // Reinicia solo Dory al cargar de nuevo
    sessionStorage.removeItem('doryCount');

    cargarContadores();
    intervaloColor = setInterval(actualizarColor, 1000);

    nBtn.addEventListener('click', guardarNemo);
    dBtn.addEventListener('click', guardarDory);
    cBtn.addEventListener('click', limpiarPecera);
});
