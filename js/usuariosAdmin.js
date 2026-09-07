// js/usuariosAdmin.js
import { inicializarSelectoresRegionComuna } from './regionesComunas.js';

// ── Guard de ruta ──────────────────────────────────────────────
const usuarioActivo = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
if (!usuarioActivo || usuarioActivo.rol !== 'Administrador') {
  window.location.href = '/pages/inicioSesion.html';
}

// ── Helpers localStorage ───────────────────────────────────────
function getUsuarios() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}
function setUsuarios(arr) {
  localStorage.setItem('users', JSON.stringify(arr));
}

// ── Referencias DOM ────────────────────────────────────────────
const tbody        = document.getElementById('tbody-usuarios');
const modalEl      = document.getElementById('modalUsuario');
const modalLabel   = document.getElementById('modalUsuarioLabel');
const btnNuevo     = document.getElementById('btn-nuevo-usuario');
const btnGuardar   = document.getElementById('btn-guardar-usuario');
const userMensaje  = document.getElementById('user-mensaje');

const inputRunOriginal = document.getElementById('user-run-original');
const inputRun         = document.getElementById('user-run');
const inputNombre      = document.getElementById('user-nombre');
const inputApellidos   = document.getElementById('user-apellidos');
const inputEmail       = document.getElementById('user-email');
const inputPassword    = document.getElementById('user-password');
const inputTelefono    = document.getElementById('user-telefono');
const inputNacimiento  = document.getElementById('user-nacimiento');
const selectRegion     = document.getElementById('user-region');
const selectComuna     = document.getElementById('user-comuna');
const inputDireccion   = document.getElementById('user-direccion');
const selectRol        = document.getElementById('user-rol');
const passHint         = document.getElementById('pass-hint');
const passRequiredMark = document.getElementById('pass-required-mark');

const modal = new bootstrap.Modal(modalEl);

// Inicializar selectores de región/comuna
inicializarSelectoresRegionComuna(selectRegion, selectComuna);

// ── Renderizar tabla ───────────────────────────────────────────
function renderTabla() {
  const usuarios = getUsuarios();
  tbody.innerHTML = '';

  if (usuarios.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-4">No hay usuarios registrados.</td></tr>';
    return;
  }

  usuarios.forEach(u => {
    const rolBadge = {
      'Administrador': 'bg-danger',
      'Vendedor':      'bg-warning text-dark',
      'Cliente':       'bg-primary'
    }[u.rol] || 'bg-secondary';

    const fecha = u.fechaRegistro
      ? new Date(u.fechaRegistro).toLocaleDateString('es-CL')
      : '—';

    const esSesiónActiva = u.run === usuarioActivo.run;

    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td><code>${u.run}</code></td>
      <td class="fw-semibold">${u.nombre} ${u.apellidos || ''}</td>
      <td>${u.email}</td>
      <td><span class="badge ${rolBadge}">${u.rol}</span></td>
      <td>${fecha}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" data-run="${u.run}" data-accion="editar">Editar</button>
        <button class="btn btn-sm btn-outline-danger" data-run="${u.run}" data-accion="eliminar"
          ${esSesiónActiva ? 'disabled title="No puedes eliminarte a ti mismo"' : ''}>
          Eliminar
        </button>
      </td>
    `;
    tbody.appendChild(fila);
  });

  tbody.querySelectorAll('[data-accion="editar"]').forEach(btn => {
    btn.addEventListener('click', () => abrirModalEditar(btn.dataset.run));
  });
  tbody.querySelectorAll('[data-accion="eliminar"]:not([disabled])').forEach(btn => {
    btn.addEventListener('click', () => confirmarEliminar(btn.dataset.run));
  });
}

// ── Limpiar modal ──────────────────────────────────────────────
function limpiarModal() {
  inputRunOriginal.value  = '';
  inputRun.value          = '';
  inputNombre.value       = '';
  inputApellidos.value    = '';
  inputEmail.value        = '';
  inputPassword.value     = '';
  inputTelefono.value     = '';
  inputNacimiento.value   = '';
  inputDireccion.value    = '';
  selectRol.value         = 'Cliente';
  // Resetear region/comuna
  selectRegion.value = '';
  selectComuna.innerHTML  = '<option value="">-- Seleccione una comuna --</option>';
  selectComuna.disabled   = true;
  userMensaje.textContent = '';
  userMensaje.className   = 'mt-3 fw-semibold text-center';
}

// ── Abrir modal: Crear ─────────────────────────────────────────
btnNuevo.addEventListener('click', () => {
  limpiarModal();
  modalLabel.textContent       = 'Nuevo Usuario';
  inputRun.readOnly            = false;
  passRequiredMark.textContent = '*';
  passHint.textContent         = 'Obligatoria (4-10 caracteres)';
  modal.show();
});

// ── Abrir modal: Editar ────────────────────────────────────────
function abrirModalEditar(run) {
  const usuarios = getUsuarios();
  const u = usuarios.find(x => x.run === run);
  if (!u) return;

  limpiarModal();
  modalLabel.textContent  = 'Editar Usuario';
  inputRunOriginal.value  = u.run;
  inputRun.value          = u.run;
  inputRun.readOnly       = true; // no cambiar RUN en edición
  inputNombre.value       = u.nombre || '';
  inputApellidos.value    = u.apellidos || '';
  inputEmail.value        = u.email || '';
  inputTelefono.value     = u.telefono !== 'No proporcionado' ? (u.telefono || '') : '';
  inputNacimiento.value   = u.fechaNacimiento !== 'No especificada' ? (u.fechaNacimiento || '') : '';
  inputDireccion.value    = u.direccion || '';
  selectRol.value         = u.rol || 'Cliente';

  passRequiredMark.textContent = '';
  passHint.textContent = 'Dejar vacío para no cambiar la contraseña';

  // Reinicializar selectores con los valores del usuario
  inicializarSelectoresRegionComuna(
    selectRegion, selectComuna,
    u.region || '',
    u.comuna || ''
  );

  modal.show();
}

// ── Guardar (crear o editar) ───────────────────────────────────
btnGuardar.addEventListener('click', () => {
  userMensaje.textContent = '';

  const runOriginal = inputRunOriginal.value;
  const esEdicion   = !!runOriginal;

  const run         = inputRun.value.trim().toUpperCase();
  const nombre      = inputNombre.value.trim();
  const apellidos   = inputApellidos.value.trim();
  const email       = inputEmail.value.trim().toLowerCase();
  const password    = inputPassword.value;
  const telefono    = inputTelefono.value.trim() || 'No proporcionado';
  const nacimiento  = inputNacimiento.value || 'No especificada';
  const region      = selectRegion.value;
  const comuna      = selectComuna.value;
  const direccion   = inputDireccion.value.trim();
  const rol         = selectRol.value;

  // Validaciones básicas
  if (!run || !nombre || !apellidos || !email) {
    userMensaje.textContent = 'Por favor completa todos los campos obligatorios (*).';
    userMensaje.className   = 'mt-3 fw-semibold text-center text-danger';
    return;
  }

  if (!esEdicion && (!password || password.length < 4 || password.length > 10)) {
    userMensaje.textContent = 'La contraseña es obligatoria y debe tener entre 4 y 10 caracteres.';
    userMensaje.className   = 'mt-3 fw-semibold text-center text-danger';
    return;
  }

  if (esEdicion && password && (password.length < 4 || password.length > 10)) {
    userMensaje.textContent = 'La contraseña debe tener entre 4 y 10 caracteres.';
    userMensaje.className   = 'mt-3 fw-semibold text-center text-danger';
    return;
  }

  const usuarios = getUsuarios();

  if (!esEdicion) {
    // Crear: verificar que RUN y email no existan
    if (usuarios.some(u => u.run === run)) {
      userMensaje.textContent = 'Ya existe un usuario con ese RUN.';
      userMensaje.className   = 'mt-3 fw-semibold text-center text-danger';
      return;
    }
    if (usuarios.some(u => u.email === email)) {
      userMensaje.textContent = 'Ya existe un usuario con ese email.';
      userMensaje.className   = 'mt-3 fw-semibold text-center text-danger';
      return;
    }

    const nuevoUsuario = {
      run, nombre, apellidos, email,
      password,
      telefono, fechaNacimiento: nacimiento,
      region, comuna, direccion, rol,
      fechaRegistro: new Date().toISOString()
    };
    usuarios.push(nuevoUsuario);
    setUsuarios(usuarios);

    userMensaje.textContent = '¡Usuario creado correctamente!';
    userMensaje.className   = 'mt-3 fw-semibold text-center text-success';

  } else {
    // Editar: buscar por RUN original
    const idx = usuarios.findIndex(u => u.run === runOriginal);
    if (idx === -1) {
      userMensaje.textContent = 'Error: usuario no encontrado.';
      userMensaje.className   = 'mt-3 fw-semibold text-center text-danger';
      return;
    }

    // Verificar email duplicado (excluyendo al propio usuario)
    if (usuarios.some((u, i) => i !== idx && u.email === email)) {
      userMensaje.textContent = 'Ese email ya está en uso por otro usuario.';
      userMensaje.className   = 'mt-3 fw-semibold text-center text-danger';
      return;
    }

    usuarios[idx] = {
      ...usuarios[idx],
      nombre, apellidos, email,
      ...(password ? { password } : {}),
      telefono, fechaNacimiento: nacimiento,
      region, comuna, direccion, rol
    };
    setUsuarios(usuarios);

    // Actualizar sesión activa si se editó el usuario actual
    if (runOriginal === usuarioActivo.run) {
      localStorage.setItem('loggedInUser', JSON.stringify(usuarios[idx]));
    }

    userMensaje.textContent = '¡Usuario actualizado correctamente!';
    userMensaje.className   = 'mt-3 fw-semibold text-center text-success';
  }

  setTimeout(() => { modal.hide(); renderTabla(); }, 1000);
});

// ── Eliminar ───────────────────────────────────────────────────
function confirmarEliminar(run) {
  const usuarios = getUsuarios();
  const u = usuarios.find(x => x.run === run);
  if (!u) return;

  if (!confirm(`¿Estás seguro de que deseas eliminar al usuario "${u.nombre} ${u.apellidos || ''}" (${u.email})? Esta acción no se puede deshacer.`)) return;

  const nuevos = usuarios.filter(x => x.run !== run);
  setUsuarios(nuevos);
  renderTabla();
}

// ── Inicializar ────────────────────────────────────────────────
renderTabla();
