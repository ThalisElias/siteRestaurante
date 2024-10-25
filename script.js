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
        <button class="remove-btn" data-name="${item.name}">
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
function removeCart(event) {
  if (event.target.classList.contains("remove-btn")) {
    const name = event.target.getAttribute("data-name");
    console.log(name);
    removeItemCart(name);
  }
}

cartItemnsContainer.addEventListener("click", removeCart);

function removeItemCart(name) {
  const index = cart.findIndex((item) => item.name === name);
  if (index !== -1) {
    const item = cart[index];
    if (item.quantity > 1) {
      item.quantity -= 1;
      updateCartModal();
      return;
    }
    cart.splice(index, 1);
    updateCartModal();
  }
}

function checkendereço(event) {
  let inputValue = event.target.value;
  if (inputValue !== "") {
    addressInput.classList.remove("border-red-500");
    addressWarn.classList.add("hidden");
  }
}

addressInput.addEventListener("input", checkendereço);

function finalizarCompra() {
  const isOpen = checkRestauranteOpen();
  if (!isOpen) {
    alert("Restaurante Fechado!");
    return;
  }
  if (cart.length === 0) return;
  if (addressInput.value === "") {
    addressWarn.classList.remove("hidden");
    addressInput.classList.add("border-red-500");
    return;
  }

  const cartItems = cart
    .map((item) => {
      return `
      ${item.name}
      Quantidade: ${item.quantity}
      Preço: R$ ${item.price} 
      <------------------->
      `;
    })
    .join("");
  const message = encodeURIComponent(cartItems);
  const celular = "8196205368";
  window.open(
    `https://wa.me/${celular}?text=${message} Endereço:${addressInput.value}`,
    "_blank"
  );
}
checkoutBtn.addEventListener("click", finalizarCompra);

function checkRestauranteOpen() {
  const data = new Date();
  const hora = data.getHours();
  return hora >= 18 && hora < 22;
}

const spanHora = document.getElementById("date-span");
const isOpen = checkRestauranteOpen();

if (isOpen) {
  spanHora.classList.remove("bg-red-500");
  spanHora.classList.add("bg-green-600");
} else {
  spanHora.classList.add("bg-red-500");
  spanHora.classList.remove("bg-green-600");
}
