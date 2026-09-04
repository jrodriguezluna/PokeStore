// js/productosService.js

const productosCatalogo = [
  {
    id: 1,
    codigo: "PK-PLUSH-01",
    nombre: "Plushees pack x6",
    precio: 25.00,
    atributo: "Peluches",
    stock: 15,
    stockCritico: 3,
    imagen: "/assets/img/products/plushees.jpg",
    galeria: [
      "/assets/img/products/plushees.jpg",
      "/assets/img/products/pikachu_chonk.png",
      "/assets/img/products/evee_tamagotchi.png"
    ],
    descripcion: "Hermoso pack de 6 peluches oficiales de primera generación confeccionados con felpa ultrasuave y acabados de alta fidelidad. Perfectos para coleccionistas y entrenadores de todas las edades."
  },
  {
    id: 2,
    codigo: "PK-BOOK-02",
    nombre: "Pokecology",
    precio: 15.00,
    atributo: "Libro",
    stock: 8,
    stockCritico: 2,
    imagen: "/assets/img/products/pokecology.jpg",
    galeria: [
      "/assets/img/products/pokecology.jpg",
      "/assets/img/CentroPokemon_Mega_Tokio.jpg"
    ],
    descripcion: "Fascinante enciclopedia ilustrada sobre los hábitats naturales, comportamiento ecológico y convivencia de las especies Pokémon en el ecosistema mundial. Tapa dura con papel satinado."
  },
  {
    id: 3,
    codigo: "PK-DVD-03",
    nombre: "DVD Indigo League",
    precio: 20.00,
    atributo: "Multimedia",
    stock: 12,
    stockCritico: 4,
    imagen: "/assets/img/products/dvd_indigo.jpg",
    galeria: [
      "/assets/img/products/dvd_indigo.jpg",
      "/assets/img/CentroPokemon_Mega_Tokio.jpg"
    ],
    descripcion: "Revive los orígenes del viaje de Ash Ketchum y Pikachu con la serie completa de la Liga Añil en alta definición. Incluye audio en español latino e inglés y contenido extra exclusivo."
  },
  {
    id: 4,
    codigo: "PK-COL-04",
    nombre: "Diorama Bosque",
    precio: 45.00,
    atributo: "Coleccionable",
    stock: 5,
    stockCritico: 2,
    imagen: "/assets/img/products/diorama.jpg",
    galeria: [
      "/assets/img/products/diorama.jpg",
      "/assets/img/products/evolved_starters_lego.png"
    ],
    descripcion: "Pieza de coleccionista esculpida a mano en resina translúcida y pintura acrílica de precisión. Representa una escena silvestre de Pokémon de tipo bicho y planta en el Bosque Verde."
  },
  {
    id: 5,
    codigo: "PK-PLUSH-05",
    nombre: "Pack Peluches Felinos",
    precio: 30.00,
    atributo: "Peluches",
    stock: 10,
    stockCritico: 3,
    imagen: "/assets/img/products/pikachu_chonk.png",
    galeria: [
      "/assets/img/products/pikachu_chonk.png",
      "/assets/img/products/plushees.jpg"
    ],
    descripcion: "Trío inseparable de Pokémon felinos: Litten, Skitty y Sprigatito en peluches acolchados de 20 cm. Ideales para abrazar o decorar tu espacio favorito."
  },
  {
    id: 6,
    codigo: "PK-HOME-06",
    nombre: "Vaso Reutilizable Snorlax Boba",
    precio: 12.50,
    atributo: "Hogar",
    stock: 20,
    stockCritico: 5,
    imagen: "/assets/img/products/evee_tamagotchi.png",
    galeria: [
      "/assets/img/products/evee_tamagotchi.png",
      "/assets/img/nosotros/pokeball2.png"
    ],
    descripcion: "Vaso térmico ecológico de doble pared con pajita metálica y diseño de Snorlax disfrutando de una siesta. Libre de BPA y apto para bebidas frías y calientes."
  },
  {
    id: 7,
    codigo: "PK-CRAFT-07",
    nombre: "Set Amigurumi Pikachu",
    precio: 18.00,
    atributo: "Manualidades",
    stock: 14,
    stockCritico: 3,
    imagen: "/assets/img/products/evolved_starters_lego.png",
    galeria: [
      "/assets/img/products/evolved_starters_lego.png",
      "/assets/img/products/pikachu_chonk.png"
    ],
    descripcion: "Kit completo de tejido que incluye lanas antialérgicas, ganchillo ergonómico, relleno siliconado y patrón ilustrado paso a paso para crear tu propio Pikachu amigurumi."
  },
  {
    id: 8,
    codigo: "PK-FOOD-08",
    nombre: "Ramen Coreano Jigglypuff (Pack 4)",
    precio: 8.00,
    atributo: "Alimentos",
    stock: 25,
    stockCritico: 6,
    imagen: "/assets/img/products/plushees.jpg",
    galeria: [
      "/assets/img/products/plushees.jpg",
      "/assets/img/products/dvd_indigo.jpg"
    ],
    descripcion: "Delicioso ramen instantáneo con caldo suave de verduras y narutomaki en forma de notas musicales y Pokébolas. Sabor reconfortante importado directamente desde Asia."
  },
  {
    id: 9,
    codigo: "PK-WEAR-09",
    nombre: "Chaqueta Entrenador Kanto",
    precio: 55.00,
    atributo: "Ropa",
    stock: 7,
    stockCritico: 2,
    imagen: "/assets/img/nosotros/entrenador.webp",
    galeria: [
      "/assets/img/nosotros/entrenador.webp",
      "/assets/img/nosotros/pokeball2.png"
    ],
    descripcion: "Chaqueta bomber unisex confeccionada en algodón y poliéster repelente al viento, con los emblemáticos colores de la primera generación y parche bordado de la Liga Pokémon en la espalda."
  },
  {
    id: 10,
    codigo: "PK-HOME-10",
    nombre: "Lámpara de Noche Gengar",
    precio: 35.00,
    atributo: "Hogar",
    stock: 9,
    stockCritico: 2,
    imagen: "/assets/img/products/diorama.jpg",
    galeria: [
      "/assets/img/products/diorama.jpg",
      "/assets/img/products/pokecology.jpg"
    ],
    descripcion: "Lámpara LED con control remoto y 16 colores intercambiables que proyecta una silueta holográfica en 3D de Gengar. Alimentación por USB o baterías AA."
  },
  {
    id: 11,
    codigo: "PK-ACC-11",
    nombre: "Mochila Eevee Evolutions",
    precio: 40.00,
    atributo: "Accesorios",
    stock: 6,
    stockCritico: 2,
    imagen: "/assets/img/products/evee_tamagotchi.png",
    galeria: [
      "/assets/img/products/evee_tamagotchi.png",
      "/assets/img/products/plushees.jpg"
    ],
    descripcion: "Mochila ergonómica y espaciosa con estampado de todas las evoluciones de Eevee. Cuenta con compartimento acolchado para notebook de hasta 15.6 pulgadas y bolsillos organizadores."
  },
  {
    id: 12,
    codigo: "PK-TCG-12",
    nombre: "Cartas TCG: Sobre Astral Radiance",
    precio: 4.50,
    atributo: "Coleccionable",
    stock: 50,
    stockCritico: 10,
    imagen: "/assets/img/blogs/CartasGradeadas.jpg",
    galeria: [
      "/assets/img/blogs/CartasGradeadas.jpg",
      "/assets/img/blogs/AlbumCartas.webp"
    ],
    descripcion: "Sobre oficial de expansión Pokémon Trading Card Game: Astral Radiance. Contiene 10 cartas coleccionables originales y un código digital para Pokémon TCG Live."
  }
];

// Obtener todos los productos (aplica cambios guardados en localStorage si existen)
export async function obtenerTodosLosProductos() {
  const guardados = localStorage.getItem("pokeCatalogoModificado");
  if (guardados) {
    try {
      return JSON.parse(guardados);
    } catch {
      // Si falla lectura, devuelve el predeterminado
    }
  }
  return productosCatalogo;
}

// Obtener solo los 9 primeros para el Home
export async function obtenerProductosRecientes() {
  const todos = await obtenerTodosLosProductos();
  return todos.slice(0, 9);
}

// Obtener un producto específico por su ID
export async function obtenerProductoPorId(id) {
  const todos = await obtenerTodosLosProductos();
  const idNum = parseInt(id, 10);
  return todos.find(p => p.id === idNum) || null;
}

// Obtener productos relacionados de la misma categoría o aleatorios
export async function obtenerProductosRelacionados(idActual, limite = 4) {
  const todos = await obtenerTodosLosProductos();
  const idNum = parseInt(idActual, 10);
  const actual = todos.find(p => p.id === idNum);

  let relacionados = [];
  if (actual) {
    relacionados = todos.filter(p => p.id !== idNum && p.atributo === actual.atributo);
  }

  // Si no hay suficientes de la misma categoría, rellenar con otros
  if (relacionados.length < limite) {
    const otros = todos.filter(p => p.id !== idNum && !relacionados.some(r => r.id === p.id));
    relacionados = relacionados.concat(otros);
  }

  return relacionados.slice(0, limite);
}

// Actualizar información de un producto (para panel admin)
export function actualizarProducto(id, datosNuevos) {
  const index = productosCatalogo.findIndex(i => i.id === parseInt(id, 10));

  if (index !== -1) {
    productosCatalogo[index] = {
      ...productosCatalogo[index],
      ...datosNuevos
    };
    localStorage.setItem("pokeCatalogoModificado", JSON.stringify(productosCatalogo));
    return true;
  }
  return false;
}