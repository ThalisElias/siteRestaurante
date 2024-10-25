const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemnsContainer = document.getElementById("cart-itens");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");

function abrirModal() {
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
