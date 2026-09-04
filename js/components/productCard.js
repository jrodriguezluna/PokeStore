// js/components/productCard.js

export function renderProductCard(prod) {
  const detalleUrl = `/pages/detalleProducto.html?id=${prod.id}`;

  return `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card h-100 shadow-sm border-0 product-card-hover">
        <a href="${detalleUrl}" class="text-decoration-none">
          <img src="${prod.imagen}" class="card-img-top p-3" alt="${prod.nombre}" style="height: 250px; object-fit: contain; cursor: pointer;">
        </a>
        <div class="card-body d-flex flex-column">
          <a href="${detalleUrl}" class="text-decoration-none">
            <h5 class="card-title text-primary hover-underline">${prod.nombre}</h5>
          </a>
          <div class="d-flex justify-content-between align-items-center mt-auto pt-3">
            <span class="badge bg-light text-secondary border">${prod.atributo}</span>
            <span class="fw-bold fs-5 text-dark">$${prod.precio.toFixed(2)}</span>
          </div>
          <button class="btn btn-outline-success mt-3 w-100 btn-add-cart fw-bold" data-id="${prod.id}">
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  `;
}