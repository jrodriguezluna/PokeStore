// js/productos.js
import { obtenerTodosLosProductos } from './productosService.js';
import { agregarAlCarrito } from './carritoService.js';
import { renderProductCard } from './components/productCard.js';

async function cargarPaginaProductos() {
    try {
        const productos = await obtenerTodosLosProductos();
        const contenedor = document.getElementById('contenedor-todos-los-productos');
        
        // Mapeamos los productos a strings de HTML y los unimos todos de una vez
        const htmlTarjetas = productos.map(prod => renderProductCard(prod)).join('');
        contenedor.innerHTML = htmlTarjetas;

    } catch (error) {
        console.error("Error al cargar los productos:", error);
        // Aquí podrías inyectar un mensaje de error amigable en el HTML
    }
}

// Event Delegation: Escuchamos los clics en todo el documento, pero solo actuamos 
// si el clic fue en un botón con la clase 'btn-add-cart'
document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('btn-add-cart')) {
        const idProducto = parseInt(e.target.getAttribute('data-id'));
        await agregarAlCarrito(idProducto);
        alert(`¡Producto añadido al carrito!`);
    }
});

cargarPaginaProductos();