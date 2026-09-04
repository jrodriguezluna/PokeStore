// js/detalleProducto.js
import { obtenerProductoPorId, obtenerProductosRelacionados } from './productosService.js';
import { agregarAlCarrito } from './carritoService.js';
import { renderProductCard } from './components/productCard.js';

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productoId = urlParams.get('id');

  const elBreadcrumb = document.getElementById('breadcrumb-producto');
  const elNombre = document.getElementById('detalle-nombre');
  const elCodigo = document.getElementById('detalle-codigo');
  const elCategoria = document.getElementById('detalle-categoria');
  const elPrecio = document.getElementById('detalle-precio');
  const elStock = document.getElementById('detalle-stock');
  const elDescripcion = document.getElementById('detalle-descripcion');
  const elImgPrincipal = document.getElementById('detalle-imagen-principal');
  const elMiniaturas = document.getElementById('detalle-miniaturas');
  const inputCantidad = document.getElementById('detalle-cantidad');
  const btnRestar = document.getElementById('btn-restar-cant');
  const btnSumar = document.getElementById('btn-sumar-cant');
  const btnAgregar = document.getElementById('btn-agregar-carrito');
  const alertaAgregado = document.getElementById('alerta-agregado');
  const contenedorRelacionados = document.getElementById('contenedor-productos-relacionados');

  if (!productoId) {
    mostrarProductoNoEncontrado();
    return;
  }

  const producto = await obtenerProductoPorId(productoId);

  if (!producto) {
    mostrarProductoNoEncontrado();
    return;
  }

  // 1. Llenar los datos en la vista
  document.title = `${producto.nombre} - PokeStore`;
  elBreadcrumb.textContent = producto.nombre;
  elNombre.textContent = producto.nombre;
  elCodigo.textContent = `Código: ${producto.codigo || 'PK-' + producto.id}`;
  elCategoria.textContent = producto.atributo || 'General';
  elPrecio.textContent = `$${producto.precio.toFixed(2)}`;
  elDescripcion.textContent = producto.descripcion || 'Sin descripción disponible para este producto.';
  
  if (producto.stock !== undefined) {
    elStock.textContent = `En Stock: ${producto.stock} unidades`;
    if (producto.stockCritico && producto.stock <= producto.stockCritico) {
      elStock.className = "badge bg-warning-subtle text-warning-emphasis border border-warning px-2 py-1";
      elStock.textContent = `⚠️ ¡Últimas ${producto.stock} unidades disponibles!`;
    }
  }

  elImgPrincipal.src = producto.imagen;
  elImgPrincipal.alt = producto.nombre;

  // 2. Miniaturas interactivas (Galería)
  const galeria = producto.galeria && producto.galeria.length > 0
    ? producto.galeria
    : [producto.imagen];

  elMiniaturas.innerHTML = '';
  galeria.forEach((imgSrc, index) => {
    const miniatura = document.createElement('img');
    miniatura.src = imgSrc;
    miniatura.className = `miniatura-img ${index === 0 ? 'activa' : ''}`;
    miniatura.alt = `Vista ${index + 1} de ${producto.nombre}`;

    miniatura.addEventListener('click', () => {
      elImgPrincipal.src = imgSrc;
      document.querySelectorAll('.miniatura-img').forEach(m => m.classList.remove('activa'));
      miniatura.classList.add('activa');
    });

    elMiniaturas.appendChild(miniatura);
  });

  // 3. Control de Cantidad (+ / -)
  btnRestar.addEventListener('click', () => {
    let cant = parseInt(inputCantidad.value, 10) || 1;
    if (cant > 1) {
      inputCantidad.value = cant - 1;
    }
  });

  btnSumar.addEventListener('click', () => {
    let cant = parseInt(inputCantidad.value, 10) || 1;
    const maxStock = producto.stock || 99;
    if (cant < maxStock) {
      inputCantidad.value = cant + 1;
    }
  });

  inputCantidad.addEventListener('change', () => {
    let cant = parseInt(inputCantidad.value, 10);
    const maxStock = producto.stock || 99;
    if (isNaN(cant) || cant < 1) inputCantidad.value = 1;
    else if (cant > maxStock) inputCantidad.value = maxStock;
  });

  // 4. Añadir al carrito
  btnAgregar.addEventListener('click', async () => {
    const cantidad = parseInt(inputCantidad.value, 10) || 1;
    await agregarAlCarrito(producto.id, cantidad);

    alertaAgregado.classList.remove('d-none');
    alertaAgregado.textContent = `¡Añadiste ${cantidad} unidad(es) de "${producto.nombre}" al carrito!`;

    setTimeout(() => {
      alertaAgregado.classList.add('d-none');
    }, 3500);
  });

  // 5. Cargar Productos Relacionados
  const relacionados = await obtenerProductosRelacionados(producto.id, 4);
  if (relacionados.length > 0) {
    contenedorRelacionados.innerHTML = relacionados.map(r => renderProductCard(r)).join('');
  } else {
    contenedorRelacionados.innerHTML = '<p class="text-muted">No hay productos relacionados disponibles.</p>';
  }

  // Manejador para botones "Añadir al carrito" de productos relacionados
  contenedorRelacionados.addEventListener('click', async (e) => {
    if (e.target.classList.contains('btn-add-cart')) {
      const idRel = parseInt(e.target.getAttribute('data-id'), 10);
      await agregarAlCarrito(idRel, 1);
      alert('¡Producto añadido al carrito!');
    }
  });

  function mostrarProductoNoEncontrado() {
    const contenedor = document.getElementById('contenedor-detalle');
    contenedor.innerHTML = `
      <div class="text-center py-5">
        <h3 class="text-danger mb-3">Producto no encontrado</h3>
        <p class="text-muted">El producto que buscas no existe o ha sido retirado de nuestra tienda.</p>
        <a href="/pages/productos.html" class="btn btn-primary mt-2">Volver al Catálogo</a>
      </div>
    `;
    if (contenedorRelacionados) {
      contenedorRelacionados.parentElement.style.display = 'none';
    }
  }
});

