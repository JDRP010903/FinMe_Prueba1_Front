let indiceActual = 0;
let datos = {
    labels: ['Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5', 'Día 6', 'Día 7', 'Día 8', 'Día 9', 'Día 10', 'Día 11', 'Día 12', 'Día 13', 'Día 14', 'Día 15', 'Día 16', 'Día 17', 'Día 18', 'Día 19', 'Día 20', 'Día 21', 'Día 22', 'Día 23', 'Día 24', 'Día 25', 'Día 26', 'Día 27', 'Día 28', 'Día 29', 'Día 30'],
    ingresos: [120, 150, 200, 170, 160, 180, 190, 210, 200, 230, 210, 205, 220, 210, 200, 195, 180, 170, 160, 175, 180, 190, 200, 210, 220, 225, 230, 240, 250, 260],
    egresos: [100, 120, 150, 130, 140, 160, 170, 180, 190, 200, 190, 185, 200, 190, 180, 175, 160, 150, 140, 145, 150, 160, 170, 180, 190, 195, 200, 210, 220, 230]
};

function crearGrafico(segmentoDatos) {
    if (window.miGrafico instanceof Chart) {
        window.miGrafico.destroy();
    }

    var ctx = document.getElementById('miGrafico').getContext('2d');
    window.miGrafico = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: segmentoDatos.labels,
            datasets: [{
                label: 'Ingresos',
                data: segmentoDatos.ingresos,
                backgroundColor: 'rgba(0, 128, 0, 0.5)',
                borderColor: 'rgba(0, 128, 0, 1)',
                borderWidth: 1
            }, {
                label: 'Egresos',
                data: segmentoDatos.egresos,
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                borderColor: 'rgba(255, 0, 0, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

window.cambiarSegmento = function (direccion) {
    indiceActual += direccion;

    // Asegurarse de que el índice es válido
    if (indiceActual < 0) indiceActual = 0;
    if (indiceActual > Math.ceil(datos.labels.length / 10) - 1) indiceActual = Math.ceil(datos.labels.length / 10) - 1;

    let inicio = indiceActual * 10;
    let fin = inicio + 10;
    let segmento = {
        labels: datos.labels.slice(inicio, fin),
        ingresos: datos.ingresos.slice(inicio, fin),
        egresos: datos.egresos.slice(inicio, fin)
    };

    crearGrafico(segmento);
};

// Inicializar con el primer segmento
document.addEventListener('DOMContentLoaded', function() {
    cambiarSegmento(0);
});
