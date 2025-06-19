function crearPecera(x) {
    const container = document.getElementById('contenedorPregunta1');
    container.innerHTML = '';

    const tabla = document.createElement('table');

    for (let fila = 0; fila < x; fila++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < x; col++) {
            const td = document.createElement('td');
            tr.appendChild(td);
        }
        tabla.appendChild(tr);
    }

    container.appendChild(tabla);
}

window.addEventListener('DOMContentLoaded', () => {
    crearPecera(8);
});
