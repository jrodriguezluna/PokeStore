// js/productos.js
import { obtenerTodosLosProductos } from './productosService.js';

async function cargarPaginaProductos() {
    const productos = await obtenerTodosLosProductos();
    const contenedor = document.getElementById('contenedor-todos-los-productos');
    
    // Limpiamos el contenedor
    contenedor.innerHTML = '';

    // Iteramos sobre todos los productos para inyectarlos
    productos.forEach(prod => {
        contenedor.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm">
                    <img src="${prod.imagen}" class="card-img-top p-3" alt="${prod.nombre}" style="height: 250px; object-fit: contain;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-primary">${prod.nombre}</h5>
                        <div class="d-flex justify-content-between align-items-center mt-auto pt-3">
                            <span class="text-muted">${prod.atributo}</span>
                            <span class="fw-bold fs-5">$${prod.precio.toFixed(2)}</span>
                        </div>
                        <button class="btn btn-outline-success mt-3 w-100" onclick="añadirAlCarrito(${prod.id})">
                            Añadir al carrito
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Función temporal expuesta al objeto window (para que funcione el onclick)
window.añadirAlCarrito = function(idProducto) {
    console.log("Se hizo clic para añadir el producto con ID:", idProducto);
    // Aquí irá la lógica real del carrito más adelante
}

// Ejecutamos la carga al iniciar el script
cargarPaginaProductos();