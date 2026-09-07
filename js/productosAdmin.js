// js/productosAdmin.js
import {
  obtenerTodosLosProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from './productosService.js';

// ── Guard de ruta ──────────────────────────────────────────────
const usuarioActivo = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
if (!usuarioActivo || usuarioActivo.rol !== 'Administrador') {
  window.location.href = '/pages/inicioSesion.html';
}

// ── Referencias DOM ────────────────────────────────────────────
const tbody          = document.getElementById('tbody-productos');
const modalEl        = document.getElementById('modalProducto');
const modalLabel     = document.getElementById('modalProductoLabel');
const btnNuevo       = document.getElementById('btn-nuevo-producto');
const btnGuardar     = document.getElementById('btn-guardar-producto');
const prodMensaje    = document.getElementById('prod-mensaje');

const inputId          = document.getElementById('prod-id');
const inputNombre      = document.getElementById('prod-nombre');
const inputCodigo      = document.getElementById('prod-codigo');
const inputAtributo    = document.getElementById('prod-atributo');
const inputPrecio      = document.getElementById('prod-precio');
const inputStock       = document.getElementById('prod-stock');
const inputStockCrit   = document.getElementById('prod-stock-critico');
const inputDescripcion = document.getElementById('prod-descripcion');
const inputImagen      = document.getElementById('prod-imagen');
const previewWrapper   = document.getElementById('prod-imagen-preview-wrapper');
const previewImg       = document.getElementById('prod-imagen-preview');

const modal = new bootstrap.Modal(modalEl);

// Base64 de la imagen seleccionada (se llena con FileReader)
let imagenBase64 = '';

// ── Renderizar tabla ───────────────────────────────────────────
async function renderTabla() {
  const productos = await obtenerTodosLosProductos();
  tbody.innerHTML = '';

  if (productos.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted py-4">No hay productos registrados.</td></tr>';
    return;
  }

  productos.forEach(prod => {
    const stockBadge = prod.stock <= prod.stockCritico
      ? `<span class="badge bg-danger">${prod.stock}</span>`
      : `<span class="badge bg-success">${prod.stock}</span>`;

    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>
        <img src="${prod.imagen || ''}" alt="${prod.nombre}"
          style="width:48px; height:48px; object-fit:contain; border-radius:6px; background:#f8f9fa;"
          onerror="this.src='/assets/img/placeholder.png'">
      </td>
      <td><code>${prod.codigo}</code></td>
      <td class="fw-semibold">${prod.nombre}</td>
      <td><span class="badge bg-secondary">${prod.atributo}</span></td>
      <td>$${prod.precio.toFixed(2)}</td>
      <td>${stockBadge}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" data-id="${prod.id}" data-accion="editar">Editar</button>
        <button class="btn btn-sm btn-outline-danger" data-id="${prod.id}" data-accion="eliminar">Eliminar</button>
      </td>
    `;
    tbody.appendChild(fila);
  });

  // Delegación de eventos en la tabla
  tbody.querySelectorAll('[data-accion="editar"]').forEach(btn => {
    btn.addEventListener('click', () => abrirModalEditar(parseInt(btn.dataset.id)));
  });
  tbody.querySelectorAll('[data-accion="eliminar"]').forEach(btn => {
    btn.addEventListener('click', () => confirmarEliminar(parseInt(btn.dataset.id)));
  });
}

// ── Limpiar modal ──────────────────────────────────────────────
function limpiarModal() {
  inputId.value          = '';
  inputNombre.value      = '';
  inputCodigo.value      = '';
  inputAtributo.value    = '';
  inputPrecio.value      = '';
  inputStock.value       = '';
  inputStockCrit.value   = '';
  inputDescripcion.value = '';
  inputImagen.value      = '';
  imagenBase64           = '';
  previewWrapper.style.display = 'none';
  previewImg.src         = '';
  prodMensaje.textContent = '';
  prodMensaje.className  = 'mt-3 fw-semibold text-center';
}

// ── Abrir modal: Crear ─────────────────────────────────────────
btnNuevo.addEventListener('click', () => {
  limpiarModal();
  modalLabel.textContent = 'Nuevo Producto';
  modal.show();
});

// ── Abrir modal: Editar ────────────────────────────────────────
async function abrirModalEditar(id) {
  const productos = await obtenerTodosLosProductos();
  const prod = productos.find(p => p.id === id);
  if (!prod) return;

  limpiarModal();
  modalLabel.textContent   = 'Editar Producto';
  inputId.value            = prod.id;
  inputNombre.value        = prod.nombre;
  inputCodigo.value        = prod.codigo;
  inputAtributo.value      = prod.atributo;
  inputPrecio.value        = prod.precio;
  inputStock.value         = prod.stock;
  inputStockCrit.value     = prod.stockCritico;
  inputDescripcion.value   = prod.descripcion || '';

  if (prod.imagen) {
    previewImg.src = prod.imagen;
    previewWrapper.style.display = 'block';
    imagenBase64 = prod.imagen; // conservar imagen existente si no se cambia
  }

  modal.show();
}

// ── Preview de imagen al seleccionar archivo ──────────────────
inputImagen.addEventListener('change', () => {
  const archivo = inputImagen.files[0];
  if (!archivo) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    imagenBase64 = e.target.result;
    previewImg.src = imagenBase64;
    previewWrapper.style.display = 'block';
  };
  reader.readAsDataURL(archivo);
});

// ── Guardar (crear o editar) ───────────────────────────────────
btnGuardar.addEventListener('click', async () => {
  prodMensaje.textContent = '';

  const nombre    = inputNombre.value.trim();
  const codigo    = inputCodigo.value.trim();
  const atributo  = inputAtributo.value.trim();
  const precio    = parseFloat(inputPrecio.value);
  const stock     = parseInt(inputStock.value);
  const stockCrit = parseInt(inputStockCrit.value) || 2;
  const descripcion = inputDescripcion.value.trim();

  // Validación básica
  if (!nombre || !codigo || !atributo || isNaN(precio) || isNaN(stock)) {
    prodMensaje.textContent = 'Por favor completa todos los campos obligatorios (*).';
    prodMensaje.className = 'mt-3 fw-semibold text-center text-danger';
    return;
  }

  const datos = {
    nombre, codigo, atributo,
    precio, stock,
    stockCritico: stockCrit,
    descripcion,
    imagen: imagenBase64 || '',
    galeria: imagenBase64 ? [imagenBase64] : []
  };

  const id = inputId.value;

  if (id) {
    // Editar existente
    const exito = actualizarProducto(parseInt(id), datos);
    if (exito) {
      prodMensaje.textContent = '¡Producto actualizado correctamente!';
      prodMensaje.className = 'mt-3 fw-semibold text-center text-success';
      setTimeout(() => { modal.hide(); renderTabla(); }, 1000);
    } else {
      prodMensaje.textContent = 'Error: no se encontró el producto.';
      prodMensaje.className = 'mt-3 fw-semibold text-center text-danger';
    }
  } else {
    // Crear nuevo
    crearProducto(datos);
    prodMensaje.textContent = '¡Producto creado correctamente!';
    prodMensaje.className = 'mt-3 fw-semibold text-center text-success';
    setTimeout(() => { modal.hide(); renderTabla(); }, 1000);
  }
});

// ── Eliminar ───────────────────────────────────────────────────
async function confirmarEliminar(id) {
  const productos = await obtenerTodosLosProductos();
  const prod = productos.find(p => p.id === id);
  if (!prod) return;

  if (!confirm(`¿Estás seguro de que deseas eliminar "${prod.nombre}"? Esta acción no se puede deshacer.`)) return;

  const exito = eliminarProducto(id);
  if (exito) {
    renderTabla();
  } else {
    alert('Error: no se pudo eliminar el producto.');
  }
}

// ── Inicializar ────────────────────────────────────────────────
renderTabla();