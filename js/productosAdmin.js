// js/productos.js
import { obtenerTodosLosProductos } from './productosService.js';
import { actualizarProducto } from './productosService.js';

async function cargarPaginaProductos() {
    const productos = await obtenerTodosLosProductos();
    const contenedor = document.getElementById('contenedor-todos-los-productos');
    
    contenedor.innerHTML = '';

    productos.forEach(prod => {
        contenedor.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm">
                    <img src="${prod.imagen}" class="card-img-top p-3" alt="${prod.nombre}" style="height: 250px; object-fit: contain;">
                    <div class="card-body d-flex flex-column">
                        <div class="mt-auto">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <input class="text-primary" type="text" id="nombre" name="nombre" placeholder="${prod.nombre}" style="width:65%">
                                <input type="number" id="stock" name="stock" style="width:30%" placeholder="Stock">
                            </div>
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <input class="text-muted" type="text" id="atributo" name="atributo" style="width:65%" placeholder="${prod.atributo}">
                                <input type="number" id="precio" name="precio" class="fw-bold" style="width:30%" placeholder="${prod.precio}">
                            </div>
                        </div>
                        <button class="btn btn-outline-success mt-3 w-100" onclick="guardarProducto(this, ${prod.id})">
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

window.guardarProducto = function(boton, productoId){
    const tarjeta = boton.closest('.card');

    const inputNombre = tarjeta.querySelector('[name="nombre"]').value.trim();
    const inputStock = tarjeta.querySelector('[name="stock"]').value.trim();
    const inputAtributo = tarjeta.querySelector('[name="atributo"]').value.trim();
    const inputPrecio = tarjeta.querySelector('[name="precio"]').value.trim();

    const datosNuevos = {};
    if (inputNombre) datosNuevos.nombre = inputNombre;
    if (inputAtributo) datosNuevos.atributo = inputAtributo;
    if (inputStock) datosNuevos.stock = parseInt(inputStock);
    if (inputPrecio) datosNuevos.precio = parseFloat(inputPrecio);
    if (Object.keys(datosNuevos).length === 0) {
        alert("No has ingresado ningún cambio para guardar.");
        return;
    }

    const exito = actualizarProducto(productoId, datosNuevos);
    if (exito) {
        alert("¡Producto actualizado correctamente!");

        if (datosNuevos.nombre) tarjeta.querySelector('[name="nombre"]').placeholder = datosNuevos.nombre;
        if (datosNuevos.atributo) tarjeta.querySelector('[name="atributo"]').placeholder = datosNuevos.atributo;
        if (datosNuevos.precio) tarjeta.querySelector('[name="precio"]').placeholder = datosNuevos.precio;
        tarjeta.querySelectorAll('input').forEach(input => input.value = '');
    } else {
        alert("Error: No se pudo encontrar el producto.");
    }
}

cargarPaginaProductos();