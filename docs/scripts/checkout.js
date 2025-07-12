import { cart, addtocart, removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { convertion } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { cartOption } from '../data/cartOptions.js';
import { renderpaymentsummery } from './paymentsummery.js';
//import '../data/cart_oop.js';
//import '../data/cart_class.js';
//import '../data/backend_practice.js';


export function deliveryOptionHTML(cartItem) {
  let html = '';
  cartOption.forEach((delivery) => {
    const today = dayjs();
    const deliveryDate = today.add(delivery.daliveryDays, 'day');
    const dateString = deliveryDate.format('dddd, MMMM D');
    const priceString = delivery.price === 0 ? 'FREE Shipping' : `₹${Math.floor(convertion(delivery.price) / 100)} - Shipping`;
    const ischecked = delivery.id === cartItem.deliveryOptionId ? 'checked' : '';
    html += `
      <div class="delivery-option">
        <input type="radio"
          value="${delivery.id}"
          ${ischecked}
          class="delivery-option-input"
          name="delivery-option-${cartItem.productId}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString}
          </div>
        </div>
      </div>
    `;
  });
  return html;
}
function renderOrderSummary() {
  const today = dayjs();

  let cartsummeryHTML = '';
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;
    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });

    const deliveryOptionId = cartItem.deliveryOptionId;
    let selectedDeliveryOption = cartOption.find(option => option.id === deliveryOptionId) || cartOption[0];

    const deliveryDate = today.add(selectedDeliveryOption.daliveryDays, 'day');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartsummeryHTML +=
      `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              ₹${convertion(matchingProduct.priceCents / 100)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span data-product-id="${matchingProduct.id}" class="delete-quantity-link link-primary js_delete_link">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
              ${deliveryOptionHTML(cartItem)}
            </div>
          </div>
        </div>
      </div>`;
  });
  document.querySelector('.order-summary').innerHTML = cartsummeryHTML;

  document.querySelectorAll('.js_delete_link').forEach((link) => {
    link.addEventListener("click", () => {
      const product_to_del = link.dataset.productId;
      console.log('Product to delete:', product_to_del);

      removeFromCart(product_to_del);
      console.log('Updated cart:', cart);

      let container = document.querySelector(`.js-cart-item-container-${product_to_del}`);
      if (container) {
        container.remove();
      } else {
        console.error(`Error: Could not find container for product ID: ${product_to_del}`);
      }

      renderpaymentsummery();
    });
  });
}

// Add this new event listener code
document.addEventListener('change', function(event) {
  if (event.target.classList.contains('delivery-option-input')) {
    // Get product ID from radio button name
    const productId = event.target.name.replace('delivery-option-', '');
    // Get the selected delivery option ID
    const deliveryOptionId = event.target.value;
    
    // Find the cart item and update its delivery option
    const cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
      cartItem.deliveryOptionId = deliveryOptionId;
      
      // Update the displayed delivery date
      const selectedOption = cartOption.find(option => option.id === deliveryOptionId);
      const deliveryDate = dayjs().add(selectedOption.daliveryDays, 'day');
      const dateString = deliveryDate.format('dddd, MMMM D');
      
      // Update the displayed date in the UI
      const dateContainer = document.querySelector(`.js-cart-item-container-${productId} .delivery-date`);
      dateContainer.innerHTML = `Delivery date: ${dateString}`;
      
      // Save the updated cart if needed
      localStorage.setItem('cart', JSON.stringify(cart));
      renderpaymentsummery();
renderOrderSummary();
    }
  }
});

// Initial render of the order summary and payment summary
renderpaymentsummery();
renderOrderSummary();



