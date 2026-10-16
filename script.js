const tarjetas = document.querySelectorAll(".tarjeta");
const burbuja = document.querySelector(".burbuja-imagen");
const imagenBurbuja = burbuja.querySelector("img");
const perro = document.querySelector(".perro");
let temporizadorBurbuja;
let mouseX = window.innerWidth * 0.72;
let mouseY = window.innerHeight * 0.4;
let scrollAnterior = window.scrollY;

function moverBurbuja(x, y) {
  // Mantiene el círculo dentro de la ventana.
  const mitad = 60;
  const izquierda = Math.min(window.innerWidth - mitad, Math.max(mitad, x + 20));
  const arriba = Math.min(window.innerHeight - mitad, Math.max(mitad, y + 20));
  burbuja.style.left = `${izquierda}px`;
  burbuja.style.top = `${arriba}px`;
}

tarjetas.forEach((tarjeta) => {
  tarjeta.addEventListener("mouseenter", (evento) => {
    const url = tarjeta.dataset.imagen;
    if (!url) return;
    imagenBurbuja.src = url;
    burbuja.classList.add("visible");
    moverBurbuja(evento.clientX, evento.clientY);

    clearTimeout(temporizadorBurbuja);
    temporizadorBurbuja = setTimeout(() => {
      burbuja.classList.remove("visible");
    }, 4000);
  });

  tarjeta.addEventListener("mousemove", (evento) => {
    moverBurbuja(evento.clientX, evento.clientY);
  });

  tarjeta.addEventListener("mouseleave", () => {
    // La burbuja sigue visible hasta completar los 4 segundos.
    // El temporizador iniciado al entrar la oculta automáticamente.
  });
});

window.addEventListener("mousemove", (evento) => {
  mouseX = evento.clientX;
  mouseY = evento.clientY;
  if (burbuja.classList.contains("visible")) moverBurbuja(mouseX, mouseY);
});

// El husky se inclina y se desplaza suavemente según la dirección del scroll.
window.addEventListener("scroll", () => {
  const actual = window.scrollY;
  const direccion = actual >= scrollAnterior ? 1 : -1;
  const inclinacion = direccion * 2.5;
  perro.style.transform = `translateY(${direccion * 7}px) rotate(${inclinacion}deg)`;
  clearTimeout(perro._volver);
  perro._volver = setTimeout(() => {
    perro.style.transform = "";
  }, 450);
  scrollAnterior = actual;
}, { passive: true });