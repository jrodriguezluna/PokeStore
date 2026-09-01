// js/carrito.js
import { obtenerCarrito } from './carritoService.js';
import { obtenerTodosLosProductos } from './productosService.js';

async function renderizarCarrito() {
    // 1. Traemos la información de ambos mundos
    const carritoGuardado = await obtenerCarrito();
    const catalogo = await obtenerTodosLosProductos();
    
    // 2. Seleccionamos los contenedores de tu HTML
    const contenedorItems = document.getElementById('contenedor-items-carrito');
    const elementoSubtotal = document.getElementById('resumen-subtotal');
    const elementoTotal = document.getElementById('resumen-total');

    // 3. Manejo del carrito vacío
    if (carritoGuardado.length === 0) {
        contenedorItems.innerHTML = `
            <div class="text-center my-5">
                <h5 class="text-muted">Tu carrito está vacío</h5>
                <p>¡Explora nuestra tienda para atrapar algunos productos!</p>
                <a href="/pages/productos.html" class="btn btn-outline-primary mt-3">Ir a la tienda</a>
            </div>
        `;
        elementoSubtotal.innerText = '$0.00';
        elementoTotal.innerText = '$0.00';
        return; // Detenemos la ejecución aquí
    }

    // 4. Si hay productos, limpiamos el contenedor y preparamos el total
    contenedorItems.innerHTML = '';
    let totalCompra = 0;

    // 5. Dibujamos cada producto y sumamos los precios
    carritoGuardado.forEach(itemCarrito => {
        // Buscamos los detalles reales del producto usando su ID
        const productoReal = catalogo.find(p => p.id === itemCarrito.id);
        
        // Si por alguna razón el producto ya no existe en el catálogo, nos lo saltamos
        if (!productoReal) return; 

        // Calculamos cuánto cuesta esta línea (precio x cantidad)
        const subtotalItem = productoReal.precio * itemCarrito.cantidad;
        totalCompra += subtotalItem;

        // Inyectamos el HTML basándonos en el mockup del PDF
        contenedorItems.innerHTML += `
            <div class="row align-items-center border-bottom py-3">
                <!-- Imagen -->
                <div class="col-3 col-md-2">
                    <img src="${productoReal.imagen}" class="img-fluid rounded border" alt="${productoReal.nombre}" style="object-fit: contain; max-height: 80px;">
                </div>
                
                <!-- Detalles -->
                <div class="col-5 col-md-6">
                    <h6 class="mb-1 text-primary fw-bold">${productoReal.nombre}</h6>
                    <small class="text-muted">${productoReal.atributo}</small><br>
                    <small class="text-muted">Precio unitario: $${productoReal.precio.toFixed(2)}</small>
                </div>
                
                <!-- Cantidad y Subtotal -->
                <div class="col-4 col-md-4 text-end">
                    <div class="d-flex align-items-center justify-content-end mb-2">
                        <span class="me-2 text-muted small">Cant:</span>
                        <span class="fw-bold px-3 py-1 border rounded bg-light">${itemCarrito.cantidad}</span>
                    </div>
                    <span class="fw-bold text-dark fs-5">$${subtotalItem.toFixed(2)}</span>
                </div>
            </div>
        `;
    });

    // 6. Actualizamos los textos de la tarjeta lateral con el monto final
    elementoSubtotal.innerText = `$${totalCompra.toFixed(2)}`;
    elementoTotal.innerText = `$${totalCompra.toFixed(2)}`;
}

// Ejecutamos la función al cargar la página
renderizarCarrito();