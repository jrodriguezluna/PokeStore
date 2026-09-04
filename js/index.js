// js/index.js
import { obtenerProductosRecientes } from './productosService.js';
import { renderProductCard } from './components/productCard.js';
import { agregarAlCarrito } from './carritoService.js';

async function cargarInicio() {
  const productos = await obtenerProductosRecientes();
  const contenedor = document.getElementById('contenedor-productos-inicio');
  
  if (!contenedor) return;

  contenedor.innerHTML = productos.map(prod => renderProductCard(prod)).join('');
}

// Escuchar clics en el botón de añadir al carrito desde el Home
document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('btn-add-cart')) {
    const idProducto = parseInt(e.target.getAttribute('data-id'), 10);
    await agregarAlCarrito(idProducto, 1);
    alert('¡Producto añadido al carrito!');
  }
});

cargarInicio();