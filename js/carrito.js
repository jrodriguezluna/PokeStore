// js/carrito.js
import {
  obtenerCarrito,
  actualizarCantidadCarrito,
  eliminarDelCarrito,
  vaciarCarrito
} from './carritoService.js';
import { obtenerTodosLosProductos } from './productosService.js';

let porcentajeDescuento = 0;
let codigoCuponAplicado = "";

async function renderizarCarrito() {
  const carritoGuardado = await obtenerCarrito();
  const catalogo = await obtenerTodosLosProductos();

  const contenedorItems = document.getElementById('contenedor-items-carrito');
  const elementoSubtotal = document.getElementById('resumen-subtotal');
  const filaDescuento = document.getElementById('fila-descuento');
  const elementoDescuento = document.getElementById('monto-descuento');
  const labelPorcentaje = document.getElementById('porcentaje-descuento');
  const elementoTotal = document.getElementById('resumen-total');
  const btnVaciar = document.getElementById('btn-vaciar-carrito');

  if (!contenedorItems) return;

  // 1. Manejo del carrito vacío
  if (!carritoGuardado || carritoGuardado.length === 0) {
    contenedorItems.innerHTML = `
      <div class="text-center my-5 py-4">
        <img src="/assets/img/nosotros/pokeball2.png" alt="Vacío" width="60" class="mb-3 opacity-50">
        <h5 class="text-muted fw-bold">Tu carrito está vacío</h5>
        <p class="text-secondary small">¡Explora nuestra tienda para atrapar algunos productos!</p>
        <a href="/pages/productos.html" class="btn btn-outline-primary mt-2">Ir a la tienda</a>
      </div>
    `;
    elementoSubtotal.innerText = '$0.00';
    elementoTotal.innerText = '$0.00';
    if (filaDescuento) filaDescuento.style.setProperty("display", "none", "important");
    if (btnVaciar) btnVaciar.disabled = true;
    return;
  }

  if (btnVaciar) btnVaciar.disabled = false;

  // 2. Renderizar productos
  contenedorItems.innerHTML = '';
  let subtotalCompra = 0;

  carritoGuardado.forEach(itemCarrito => {
    const productoReal = catalogo.find(p => p.id === itemCarrito.id);
    if (!productoReal) return;

    const subtotalLinea = productoReal.precio * itemCarrito.cantidad;
    subtotalCompra += subtotalLinea;

    contenedorItems.innerHTML += `
      <div class="row align-items-center border-bottom py-3 g-3">
        <!-- Imagen -->
        <div class="col-3 col-sm-2 text-center">
          <a href="/pages/detalleProducto.html?id=${productoReal.id}">
            <img src="${productoReal.imagen}" class="img-fluid rounded border p-1 bg-white" alt="${productoReal.nombre}" style="max-height: 75px; object-fit: contain;">
          </a>
        </div>
        
        <!-- Detalles -->
        <div class="col-9 col-sm-4">
          <a href="/pages/detalleProducto.html?id=${productoReal.id}" class="text-decoration-none">
            <h6 class="mb-1 text-primary fw-bold hover-underline">${productoReal.nombre}</h6>
          </a>
          <span class="badge bg-light text-secondary border small">${productoReal.atributo || 'Producto'}</span><br>
          <small class="text-muted">Unitario: $${productoReal.precio.toFixed(2)}</small>
        </div>
        
        <!-- Cantidad (+ / -) según mockup Figura 15 -->
        <div class="col-6 col-sm-3 text-sm-center">
          <div class="d-inline-flex align-items-center border rounded bg-white">
            <button class="btn btn-sm btn-link text-dark text-decoration-none px-2 py-1 btn-restar-item" data-id="${productoReal.id}" title="Restar">-</button>
            <span class="px-2 fw-bold small">${itemCarrito.cantidad}</span>
            <button class="btn btn-sm btn-link text-dark text-decoration-none px-2 py-1 btn-sumar-item" data-id="${productoReal.id}" title="Sumar">+</button>
          </div>
        </div>

        <!-- Subtotal y Botón Eliminar -->
        <div class="col-6 col-sm-3 text-end">
          <div class="fw-bold text-dark fs-5 mb-1">$${subtotalLinea.toFixed(2)}</div>
          <button class="btn btn-sm btn-outline-danger py-0 px-2 btn-eliminar-item" data-id="${productoReal.id}" title="Quitar del carrito" style="font-size: 0.75rem;">
            🗑️ Eliminar
          </button>
        </div>
      </div>
    `;
  });

  // 3. Cálculos de Totales y Descuentos
  const montoDescuento = subtotalCompra * (porcentajeDescuento / 100);
  const totalFinal = Math.max(0, subtotalCompra - montoDescuento);

  elementoSubtotal.innerText = `$${subtotalCompra.toFixed(2)}`;

  if (porcentajeDescuento > 0 && filaDescuento) {
    filaDescuento.style.removeProperty("display");
    labelPorcentaje.innerText = `${porcentajeDescuento}%`;
    elementoDescuento.innerText = `-$${montoDescuento.toFixed(2)}`;
  } else if (filaDescuento) {
    filaDescuento.style.setProperty("display", "none", "important");
  }

  elementoTotal.innerText = `$${totalFinal.toFixed(2)}`;
}

// Escuchador de clics en la lista del carrito (delegación de eventos)
document.addEventListener('DOMContentLoaded', () => {
  const contenedorItems = document.getElementById('contenedor-items-carrito');
  const btnVaciar = document.getElementById('btn-vaciar-carrito');
  const btnCupon = document.getElementById('btn-aplicar-cupon');
  const inputCupon = document.getElementById('input-cupon');
  const mensajeCupon = document.getElementById('mensaje-cupon');
  const btnPagar = document.getElementById('btn-pagar');

  // Incrementar, decrementar y eliminar
  if (contenedorItems) {
    contenedorItems.addEventListener('click', async (e) => {
      const botonRestar = e.target.closest('.btn-restar-item');
      const botonSumar = e.target.closest('.btn-sumar-item');
      const botonEliminar = e.target.closest('.btn-eliminar-item');

      if (botonRestar) {
        const id = parseInt(botonRestar.getAttribute('data-id'), 10);
        const carrito = await obtenerCarrito();
        const item = carrito.find(i => i.id === id);
        if (item) {
          await actualizarCantidadCarrito(id, item.cantidad - 1);
          renderizarCarrito();
        }
      }

      if (botonSumar) {
        const id = parseInt(botonSumar.getAttribute('data-id'), 10);
        const carrito = await obtenerCarrito();
        const item = carrito.find(i => i.id === id);
        if (item) {
          await actualizarCantidadCarrito(id, item.cantidad + 1);
          renderizarCarrito();
        }
      }

      if (botonEliminar) {
        const id = parseInt(botonEliminar.getAttribute('data-id'), 10);
        await eliminarDelCarrito(id);
        renderizarCarrito();
      }
    });
  }

  // Vaciar carrito
  if (btnVaciar) {
    btnVaciar.addEventListener('click', () => {
      if (confirm("¿Estás seguro de que deseas vaciar tu carrito de compras?")) {
        vaciarCarrito();
        renderizarCarrito();
      }
    });
  }

  // Aplicar Cupón de Descuento
  if (btnCupon && inputCupon && mensajeCupon) {
    btnCupon.addEventListener('click', () => {
      const codigo = inputCupon.value.trim().toUpperCase();

      if (!codigo) {
        mensajeCupon.textContent = "Ingresa un código de cupón.";
        mensajeCupon.className = "small mt-1 text-danger";
        return;
      }

      if (codigo === "POKE10") {
        porcentajeDescuento = 10;
        codigoCuponAplicado = codigo;
        mensajeCupon.textContent = "¡Cupón POKE10 aplicado! Tienes un 10% de descuento.";
        mensajeCupon.className = "small mt-1 text-success fw-bold";
        renderizarCarrito();
      } else if (codigo === "DUOC20") {
        porcentajeDescuento = 20;
        codigoCuponAplicado = codigo;
        mensajeCupon.textContent = "¡Cupón DUOC20 aplicado! Tienes un 20% de descuento.";
        mensajeCupon.className = "small mt-1 text-success fw-bold";
        renderizarCarrito();
      } else {
        mensajeCupon.textContent = "El cupón ingresado no es válido o ha expirado.";
        mensajeCupon.className = "small mt-1 text-danger";
      }
    });
  }

  // Botón Pagar
  if (btnPagar) {
    btnPagar.addEventListener('click', async () => {
      const carrito = await obtenerCarrito();
      if (!carrito || carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de pagar.");
        return;
      }

      const totalTexto = document.getElementById('resumen-total').innerText;
      const ordenId = Math.floor(10000 + Math.random() * 90000);

      const modalOrdenId = document.getElementById('modal-orden-id');
      const modalOrdenTotal = document.getElementById('modal-orden-total');

      if (modalOrdenId) modalOrdenId.textContent = ordenId;
      if (modalOrdenTotal) modalOrdenTotal.textContent = totalTexto;

      // Vaciar carrito tras la compra
      vaciarCarrito();
      porcentajeDescuento = 0;
      if (inputCupon) inputCupon.value = "";
      if (mensajeCupon) mensajeCupon.textContent = "";

      // Mostrar modal Bootstrap
      const modalElement = document.getElementById('modalPagoExitoso');
      if (modalElement && window.bootstrap) {
        const modal = new window.bootstrap.Modal(modalElement);
        modal.show();
      } else {
        alert(`¡Pago exitoso! Orden #PK-${ordenId} por un total de ${totalTexto}. ¡Gracias por tu compra!`);
        window.location.href = "/index.html";
      }

      renderizarCarrito();
    });
  }

  // Carga inicial
  renderizarCarrito();
});