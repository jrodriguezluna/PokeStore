// js/draw_navbar.js

function renderizarNavbar() {
  const placeholder = document.getElementById('navbar-placeholder');
  if (!placeholder) return;

  const usuarioActivoRaw = localStorage.getItem('loggedInUser');
  let usuarioActivo = null;
  if (usuarioActivoRaw) {
    try {
      usuarioActivo = JSON.parse(usuarioActivoRaw);
    } catch {
      localStorage.removeItem('loggedInUser');
    }
  }

  // Enlaces del usuario según si está logueado y su rol
  let userLinksHTML = '';

  if (usuarioActivo) {
    const esAdminOVendedor = usuarioActivo.rol === 'Administrador' || usuarioActivo.rol === 'Vendedor';
    const linkAdminHTML = esAdminOVendedor
      ? `<li class="nav-item">
           <a class="nav-link text-warning fw-bold" href="/pages/homeAdmin.html">⚙️ Panel Admin</a>
         </li>`
      : '';

    userLinksHTML = `
      ${linkAdminHTML}
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle fw-bold text-primary" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          👤 ${usuarioActivo.nombre} (${usuarioActivo.rol || 'Cliente'})
        </a>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><span class="dropdown-item-text text-muted small">${usuarioActivo.email}</span></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item text-danger fw-bold" href="#" id="btn-cerrar-sesion">Cerrar Sesión</a></li>
        </ul>
      </li>
    `;
  } else {
    userLinksHTML = `
      <li class="nav-item">
        <a class="nav-link fw-bold" href="/pages/inicioSesion.html">Iniciar Sesión</a>
      </li>
      <li class="nav-item">
        <a class="nav-link btn btn-sm btn-outline-primary ms-lg-2 px-3 fw-bold" href="/pages/registro.html">Registrarse</a>
      </li>
    `;
  }

  const navbarHTML = `
  <nav class="navbar navbar-expand-lg bg-body-tertiary shadow-sm sticky-top">
    <div class="container-fluid px-3">
      <a class="navbar-brand d-flex align-items-center gap-2" href="/index.html">
        <img src="/assets/img/nosotros/pokeball2.png" alt="Logo" width="28" height="28" style="object-fit: contain;">
        <span class="fw-bold fs-4 text-dark">PokeStore</span>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
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
        </ul>
        <ul class="navbar-nav ms-auto align-items-lg-center gap-2">
          <li class="nav-item me-lg-2">
            <a class="nav-link text-success fw-bold d-flex align-items-center gap-1" href="/pages/carrito.html">
              🛒 Carrito (<span id="cart-counter">0</span>)
            </a>
          </li>
          ${userLinksHTML}
        </ul>
      </div>
    </div>
  </nav>
  `;

  placeholder.innerHTML = navbarHTML;

  // Manejar botón de cerrar sesión
  const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('loggedInUser');
      window.location.href = '/index.html';
    });
  }

  // Activar link activo según URL
  let urlActual = window.location.pathname.split('/').pop();
  if (urlActual === '') {
    urlActual = 'index.html';
  }

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.endsWith(urlActual)) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  actualizarContadorCarrito();
}

// Función para leer el carrito y sumar las cantidades
function actualizarContadorCarrito() {
  const carritoGuardado = localStorage.getItem('pokeCarrito');
  const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
  
  const totalItems = carrito.reduce((suma, item) => suma + (item.cantidad || 1), 0);
  
  const contador = document.getElementById('cart-counter');
  if (contador) {
    contador.innerText = totalItems;
  }
}

// Inicializar al cargar
renderizarNavbar();

window.actualizarContadorNavbar = actualizarContadorCarrito;
window.addEventListener('storage', actualizarContadorCarrito);
document.addEventListener('carrito:actualizado', actualizarContadorCarrito);