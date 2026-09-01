// Guardamos el HTML directamente en una variable de JS
const navbarHTML = `
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="/index.html"><h4>PokeStore</h4></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="/index.html">Inicio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/pages/productos.html">Productos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/pages/nosotros.html">Nosotros</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/pages/blogs.html">Blogs</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/pages/contacto.html">Contacto</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-success fw-bold" href="/pages/carrito.html">
            Carrito (<span id="cart-counter">0</span>)
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
`;

// 1. Inyectamos el HTML de forma INSTANTÁNEA (sin fetch)
document.getElementById('navbar-placeholder').innerHTML = navbarHTML;

// Función para leer el carrito y sumar las cantidades
function actualizarContadorCarrito() {
    const carritoGuardado = localStorage.getItem('pokeCarrito');
    const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
    
    // Sumamos la cantidad de todos los productos
    const totalItems = carrito.reduce((suma, item) => suma + item.cantidad, 0);
    
    // Actualizamos el HTML
    const contador = document.getElementById('cart-counter');
    if (contador) {
        contador.innerText = totalItems;
    }
}

actualizarContadorCarrito();

window.actualizarContadorNavbar = actualizarContadorCarrito;

// 2. Ejecutamos la lógica de la clase active inmediatamente
let urlActual = window.location.pathname.split('/').pop();
if (urlActual === '') {
    urlActual = 'index.html';
}

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    if (link.getAttribute('href').endsWith(urlActual)) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
    }
});