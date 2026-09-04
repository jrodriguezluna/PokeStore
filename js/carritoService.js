// js/carritoService.js

export async function obtenerCarrito() {
  const carritoGuardado = localStorage.getItem('pokeCarrito');
  return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

export async function agregarAlCarrito(productoId, cantidad = 1) {
  const carrito = await obtenerCarrito();
  const idNum = parseInt(productoId, 10);
  const cantNum = parseInt(cantidad, 10) || 1;

  const productoExistente = carrito.find(item => item.id === idNum);

  if (productoExistente) {
    productoExistente.cantidad += cantNum;
  } else {
    carrito.push({ id: idNum, cantidad: cantNum });
  }

  try {
    localStorage.setItem('pokeCarrito', JSON.stringify(carrito));
    document.dispatchEvent(new CustomEvent('carrito:actualizado'));
    return carrito;
  } catch (error) {
    console.error("Error al guardar en el carrito:", error);
  }

  return carrito;
}

export async function actualizarCantidadCarrito(productoId, nuevaCantidad) {
  let carrito = await obtenerCarrito();
  const idNum = parseInt(productoId, 10);
  const cantNum = parseInt(nuevaCantidad, 10);

  if (cantNum <= 0) {
    // Si la cantidad es menor o igual a cero, se elimina del carrito
    carrito = carrito.filter(item => item.id !== idNum);
  } else {
    const item = carrito.find(item => item.id === idNum);
    if (item) {
      item.cantidad = cantNum;
    }
  }

  try {
    localStorage.setItem('pokeCarrito', JSON.stringify(carrito));
    document.dispatchEvent(new CustomEvent('carrito:actualizado'));
    return carrito;
  } catch (error) {
    console.error("Error al actualizar cantidad en el carrito:", error);
  }

  return carrito;
}

export async function eliminarDelCarrito(productoId) {
  let carrito = await obtenerCarrito();
  const idNum = parseInt(productoId, 10);
  carrito = carrito.filter(item => item.id !== idNum);

  try {
    localStorage.setItem('pokeCarrito', JSON.stringify(carrito));
    document.dispatchEvent(new CustomEvent('carrito:actualizado'));
    return carrito;
  } catch (error) {
    console.error("Error al eliminar del carrito:", error);
  }

  return carrito;
}

export function vaciarCarrito() {
  localStorage.removeItem('pokeCarrito');
  document.dispatchEvent(new CustomEvent('carrito:actualizado'));
}