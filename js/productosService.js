// js/productosService.js

const productosCatalogo = [
    { id: 1, nombre: "Plushees pack x6", precio: 25.00, atributo: "Peluches", imagen: "/assets/img/products/plushees.jpg" },
    { id: 2, nombre: "Pokecology", precio: 15.00, atributo: "Libro", imagen: "/assets/img/products/pokecology.jpg" },
    { id: 3, nombre: "DVD Indigo League", precio: 20.00, atributo: "Multimedia", imagen: "/assets/img/products/dvd_indigo.jpg" },
    { id: 4, nombre: "Diorama Bosque", precio: 45.00, atributo: "Coleccionable", imagen: "/assets/img/products/diorama.jpg" },
    { id: 5, nombre: "Pack Peluches Felinos (Litten, Skitty, Sprigatito)", precio: 30.00, atributo: "Peluches", imagen: "/assets/img/products/gatos.jpg" },
    { id: 6, nombre: "Vaso Reutilizable Snorlax para Boba", precio: 12.50, atributo: "Hogar", imagen: "/assets/img/products/vaso_boba.jpg" },
    { id: 7, nombre: "Set Amigurumi Pikachu (Patrón + Lana)", precio: 18.00, atributo: "Manualidades", imagen: "/assets/img/products/amigurumi.jpg" },
    { id: 8, nombre: "Ramen Coreano Jigglypuff (Pack 4)", precio: 8.00, atributo: "Alimentos", imagen: "/assets/img/products/ramen.jpg" },
    { id: 9, nombre: "Chaqueta Entrenador Kanto", precio: 55.00, atributo: "Ropa", imagen: "/assets/img/products/chaqueta.jpg" },
    { id: 10, nombre: "Lámpara de Noche Gengar", precio: 35.00, atributo: "Hogar", imagen: "/assets/img/products/lampara.jpg" },
    { id: 11, nombre: "Mochila Eevee Evolutions", precio: 40.00, atributo: "Accesorios", imagen: "/assets/img/products/mochila.jpg" },
    { id: 12, nombre: "Cartas TCG: Sobre Astral Radiance", precio: 4.50, atributo: "Coleccionable", imagen: "/assets/img/products/tcg.jpg" },
    { id: 13, nombre: "Taza Termosensible Charizard", precio: 15.00, atributo: "Hogar", imagen: "/assets/img/products/taza.jpg" },
    { id: 14, nombre: "Gorra Oficial Liga Pokémon", precio: 22.00, atributo: "Ropa", imagen: "/assets/img/products/gorra.jpg" },
    { id: 15, nombre: "Lego Bulbasaur Construible", precio: 48.00, atributo: "Juguetes", imagen: "/assets/img/products/lego.jpg" },
    { id: 16, nombre: "Póster Mapa Región Johto", precio: 10.00, atributo: "Decoración", imagen: "/assets/img/products/poster.jpg" },
    { id: 17, nombre: "Llavero Metálico Pokébola", precio: 5.00, atributo: "Accesorios", imagen: "/assets/img/products/llavero.jpg" },
    { id: 18, nombre: "Guía de Estrategia Pokedex", precio: 25.00, atributo: "Libro", imagen: "/assets/img/products/pokedex.jpg" },
    { id: 19, nombre: "Audífonos Inalámbricos Jigglypuff", precio: 60.00, atributo: "Tecnología", imagen: "/assets/img/products/audifonos.jpg" },
    { id: 20, nombre: "Calcetines Surtidos (Pack 3)", precio: 12.00, atributo: "Ropa", imagen: "/assets/img/products/calcetines.jpg" }
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