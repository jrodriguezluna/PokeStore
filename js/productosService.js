// js/productosService.js

const productosCatalogo = [
    { id: 1, nombre: "Plushees pack x6", precio: 25.00, atributo: "Peluches", imagen: "/assets/img/products/plushees.jpg" },
    { id: 2, nombre: "Pokecology", precio: 15.00, atributo: "Libro", imagen: "/assets/img/products/pokecology.jpg" },
    { id: 3, nombre: "DVD Indigo League", precio: 20.00, atributo: "Multimedia", imagen: "/assets/img/products/dvd_indigo.jpg" },
    { id: 4, nombre: "Diorama Bosque", precio: 45.00, atributo: "Coleccionable", imagen: "/assets/img/products/diorama.jpg" },
    // ... imaginemos que aquí hay 20 productos en total
];

// Función para la página de Productos (Todos)
export async function obtenerTodosLosProductos() {
    return productosCatalogo;
}

// Función para el Index (Solo los 9 más nuevos/últimos)
export async function obtenerProductosRecientes() {
    // Tomamos los últimos 9 del arreglo (o los primeros 9, tú decides la lógica)
    return productosCatalogo.slice(0, 9);
}