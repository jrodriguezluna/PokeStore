// js/productos.js
import { obtenerTodosLosProductos } from './productosService.js';
import { agregarAlCarrito } from './carritoService.js';
import { renderProductCard } from './components/productCard.js';

let todosLosProductos = [];
let categoriaActual = "TODOS";
let textoBusqueda = "";

async function inicializarCatalogo() {
  try {
    todosLosProductos = await obtenerTodosLosProductos();
    renderizarProductosFiltrados();
  } catch (error) {
    console.error("Error al cargar los productos:", error);
    const contenedor = document.getElementById('contenedor-todos-los-productos');
    if (contenedor) {
      contenedor.innerHTML = '<div class="alert alert-danger">Error al cargar los productos. Por favor recarga la página.</div>';
    }
  }
}

function renderizarProductosFiltrados() {
  const contenedor = document.getElementById('contenedor-todos-los-productos');
  const contadorTexto = document.getElementById('contador-productos-visibles');
  if (!contenedor) return;

  const productosFiltrados = todosLosProductos.filter(prod => {
    const coincideCategoria = (categoriaActual === "TODOS" || prod.atributo === categoriaActual);
    const coincideTexto = !textoBusqueda || prod.nombre.toLowerCase().includes(textoBusqueda.toLowerCase());
    return coincideCategoria && coincideTexto;
  });

  if (contadorTexto) {
    contadorTexto.textContent = `${productosFiltrados.length} de ${todosLosProductos.length} productos`;
  }

  if (productosFiltrados.length === 0) {
    contenedor.innerHTML = `
      <div class="col-12 text-center py-5">
        <h5 class="text-muted">No se encontraron productos</h5>
        <p class="text-secondary small">Prueba cambiando la categoría o término de búsqueda.</p>
      </div>
    `;
    return;
  }

  contenedor.innerHTML = productosFiltrados.map(prod => renderProductCard(prod)).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const inputBusqueda = document.getElementById('buscar-producto');
  const listaCategorias = document.getElementById('lista-categorias-filtro');

  if (inputBusqueda) {
    inputBusqueda.addEventListener('input', (e) => {
      textoBusqueda = e.target.value.trim();
      renderizarProductosFiltrados();
    });
  }

  if (listaCategorias) {
    listaCategorias.addEventListener('click', (e) => {
      const boton = e.target.closest('button[data-categoria]');
      if (!boton) return;

      listaCategorias.querySelectorAll('button').forEach(b => b.classList.remove('active', 'fw-semibold'));
      boton.classList.add('active', 'fw-semibold');

      categoriaActual = boton.getAttribute('data-categoria');
      renderizarProductosFiltrados();
    });
  }

  // Delegación de eventos para añadir al carrito
  document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('btn-add-cart')) {
      const idProducto = parseInt(e.target.getAttribute('data-id'), 10);
      await agregarAlCarrito(idProducto, 1);
      alert('¡Producto añadido al carrito!');
    }
  });

  inicializarCatalogo();
});