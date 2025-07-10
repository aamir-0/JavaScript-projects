import { cart, addtocart, removeFromCart } from '../data/cart.js';
import { products , getproduct } from '../data/products.js';
import { convertion ,tax } from '../utils/money.js';
import {cartOption, getCartOption,} from '../data/cartOptions.js';


export function renderpaymentsummery() {
    let productPrice = 0;
    let shippingPrice = 0;

    cart.forEach(element => {
        const product = getproduct(element.productId);
       
        productPrice += (product.priceCents * element.quantity) ;
        

        const deliveryOption = getCartOption(element.deliveryOptionId);
        
        shippingPrice += deliveryOption.price;
    });
    productPrice= convertion(productPrice) / 100; // Convert to rupees
    shippingPrice = convertion(shippingPrice) / 100; // Convert to rupees

    const totalPrice_notax = productPrice + shippingPrice;
    const taxPrice = tax(totalPrice_notax);
    const totalPrice = totalPrice_notax + taxPrice;

    // Initialize paymentsummeryHTML
    let paymentsummeryHTML = ''; // Fixed initialization
    paymentsummeryHTML += `<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cart.length}):</div>
            <div class="payment-summary-money">₹${convertion(productPrice)/100}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">₹${convertion(shippingPrice / 100)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">₹${convertion(totalPrice_notax / 100)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (18%):</div>
            <div class="payment-summary-money">₹${convertion(taxPrice / 100)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">₹${convertion(totalPrice / 100)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;

    // Render the payment summary HTML
    document.querySelector('.js_paymentsummery').innerHTML = paymentsummeryHTML;
}