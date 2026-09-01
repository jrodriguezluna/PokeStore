// js/carritoService.js

export async function obtenerCarrito() {

    const carritoGuardado = localStorage.getItem('pokeCarrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];

    // En un futuro podemos utilizar esta lógica para sacar info de una base de datos
    // const respuesta = await fetch('http://localhost:8080/api/carrito');
    // return await respuesta.json();
}

export async function agregarAlCarrito(productoId, cantidad = 1) {
    const carrito = await obtenerCarrito();
    
    const productoExistente = carrito.find(item => item.id === productoId);

    if (productoExistente) {
        productoExistente.cantidad += cantidad; 
    } else {
        carrito.push({ id: productoId, cantidad: cantidad });
    }

    // Guardamos el arreglo actualizado en localStorage
    localStorage.setItem('pokeCarrito', JSON.stringify(carrito));
    
    return carrito;

    // Lógica para agregar info desde una api...
    // await fetch('http://localhost:8080/api/carrito', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ id: productoId, cantidad: cantidad })
    // });
}