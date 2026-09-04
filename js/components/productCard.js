// js/components/productCard.js

export function renderProductCard(prod) {
    return `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card h-100 shadow-sm">
                <img src="${prod.imagen}" class="card-img-top p-3" alt="${prod.nombre}" style="height: 250px; object-fit: contain;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-primary">${prod.nombre}</h5>
                    <div class="d-flex justify-content-between align-items-center mt-auto pt-3">
                        <span class="text-muted">${prod.atributo}</span>
                        <span class="fw-bold fs-5">$${prod.precio.toFixed(2)}</span>
                    </div>
                    <!-- Nota: Cambiamos el onclick por data-id y una clase específica -->
                    <button class="btn btn-outline-success mt-3 w-100 btn-add-cart" data-id="${prod.id}">
                        Añadir al carrito
                    </button>
                </div>
            </div>
        </div>
    `;
}