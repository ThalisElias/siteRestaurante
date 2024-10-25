const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemnsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");

let cart = [];

function abrirModal() {
  updateCartModal();
  cartModal.style.display = "flex";
}
cartBtn.addEventListener("click", abrirModal);

function fecharModal(event) {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
}
cartModal.addEventListener("click", fecharModal);

function btnFecharModal() {
  cartModal.style.display = "none";
}
closeModalBtn.addEventListener("click", btnFecharModal);

function addcart(event) {
  let parentButton = event.target.closest(".add-to-cart-btn");
  if (parentButton) {
    const name = parentButton.getAttribute("data-name");
    const price = parseFloat(parentButton.getAttribute("data-price"));
    addToCart(name, price);
  }
}
menu.addEventListener("click", addcart);

function addToCart(name, price) {
  const existeItem = cart.find((item) => item.name === name);
  if (existeItem) {
    existeItem.quantity += 1;
  } else {
    cart.push({
      name,
      price,
      quantity: 1,
    });
  }
  updateCartModal();
}

function updateCartModal() {
  cartItemnsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add(
      "flex",
      "justify-between",
      "mb-4",
      "flex-col"
    );
    cartItemElement.innerHTML = `
    <div class="flex items-center justify-between">
        <div>
          <p class="font-bold">${item.name}</p>
          <p>Qtd: ${item.quantity}</p>
          <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
          </div>
        <button>
          Remover
        </button>
    </div>
    `;
    total += item.price * item.quantity;
    cartItemnsContainer.appendChild(cartItemElement);
  });
  cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  cartCounter.innerHTML = cart.length;
}
