
const imagenes = [
    "🍎", "🍌", "🍇", "🍓",
    "🍒", "🍍", "🥝", "🍉"
];

let tarjetas = [];

let primera = null;
let segunda = null;

let bloquear = false;

let movimientos = 0;
let parejas = 0;

// Iniciar juego
function iniciarJuego() {

    tarjetas = [...imagenes, ...imagenes];

    // Mezclar tarjetas
    tarjetas.sort(() => Math.random() - 0.5);

    movimientos = 0;
    parejas = 0;

    primera = null;
    segunda = null;
    bloquear = false;

    document.getElementById("movimientos").textContent = 0;
    document.getElementById("parejas").textContent = "0 / 8";
    document.getElementById("mensaje").textContent = "";

    let tablero = document.getElementById("tablero");

    tablero.innerHTML = "";

    tarjetas.forEach(function(imagen) {

        let tarjeta = document.createElement("button");

        tarjeta.classList.add("tarjeta");

        tarjeta.innerHTML = `
            <div class="tarjeta-interior">

                <div class="cara frente">?</div>

                <div class="cara atras">${imagen}</div>

            </div>
        `;

        tarjeta.dataset.imagen = imagen;

        tarjeta.onclick = function() {
            seleccionarTarjeta(tarjeta);
        };

        tablero.appendChild(tarjeta);

    });
}

// Seleccionar tarjeta
function seleccionarTarjeta(tarjeta) {

    if (
        bloquear ||
        tarjeta.classList.contains("correcta") ||
        tarjeta === primera
    ) {
        return;
    }

    // Girar la carta
    tarjeta.classList.add("volteada");

    if (primera === null) {

        primera = tarjeta;

    } else {

        segunda = tarjeta;

        movimientos++;

        document.getElementById("movimientos").textContent = movimientos;

        comprobarPareja();

    }
}

// Comprobar parejas
function comprobarPareja() {

    if (primera.dataset.imagen === segunda.dataset.imagen) {

        primera.classList.add("correcta");
        segunda.classList.add("correcta");

        parejas++;

        document.getElementById("parejas").textContent =
            parejas + " / 8";

        primera = null;
        segunda = null;

        if (parejas === 8) {

            document.getElementById("mensaje").textContent =
                "🎉 ¡Felicidades! ¡Has ganado el juego!";

        }

    } else {

        bloquear = true;

        setTimeout(function() {

            // Girar nuevamente las cartas
            primera.classList.remove("volteada");
            segunda.classList.remove("volteada");

            primera = null;
            segunda = null;

            bloquear = false;

        }, 900);

    }
}

// Reiniciar juego
function reiniciarJuego() {
    iniciarJuego();
}

// Ejecutar al cargar la página
iniciarJuego();
