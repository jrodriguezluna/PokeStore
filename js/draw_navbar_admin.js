// js/draw_navbar_admin.js

const navbarHTML = `
<nav class="navbar navbar-expand-lg bg-dark navbar-dark shadow-sm sticky-top">
  <div class="container-fluid px-3">
    <a class="navbar-brand d-flex align-items-center gap-2" href="/pages/homeAdmin.html">
      <img src="/assets/img/nosotros/pokeball2.png" alt="Logo" width="28" height="28" style="object-fit: contain;">
      <span class="fw-bold">PokeStore Admin</span>
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarAdminNav" aria-controls="navbarAdminNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarAdminNav">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="/pages/homeAdmin.html">Inicio Panel</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/pages/productosAdmin.html">Mantenedor Productos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/pages/usuariosAdmin.html">Mantenedor Usuarios</a>
        </li>
      </ul>
      <ul class="navbar-nav ms-auto align-items-lg-center gap-2">
        <li class="nav-item">
          <a class="nav-link text-info" href="/index.html" target="_blank">🌐 Ver Tienda Pública</a>
        </li>
        <li class="nav-item">
          <a class="nav-link btn btn-outline-danger btn-sm text-white px-3 fw-bold" href="#" id="btn-admin-logout">Cerrar Sesión</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
`;

const placeholder = document.getElementById('navbar-placeholder');
if (placeholder) {
  placeholder.innerHTML = navbarHTML;

  const btnLogout = document.getElementById('btn-admin-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('loggedInUser');
      window.location.href = '/pages/inicioSesion.html';
    });
  }

  let urlActual = window.location.pathname.split('/').pop();
  if (urlActual === '') urlActual = 'homeAdmin.html';

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.endsWith(urlActual)) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}