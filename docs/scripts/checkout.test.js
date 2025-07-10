import { renderOrderSummary, deliveryOptionHTML } from '../scripts/checkout.js';
import { cart, addtocart, removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { cartOption } from '../data/cartOptions.js';
import { convertion } from '../utils/money.js';
import { renderpaymentsummery } from './paymentsummery.js';

describe('Checkout Functions', () => {
  beforeEach(() => {
    // Reset cart and mock localStorage
    cart.length = 0;
    localStorage.clear();
  });

  test('renderOrderSummary should generate correct HTML for cart items', () => {
    cart.push({ productId: '1', quantity: 2, deliveryOptionId: 'standard' });
    products.push({ id: '1', name: 'Test Product', priceCents: 1000, image: 'test.jpg' });
    cartOption.push({ id: 'standard', daliveryDays: 3, price: 0 });

    document.body.innerHTML = '<div class="order-summary"></div>';

    renderOrderSummary();

    const orderSummary = document.querySelector('.order-summary');
    expect(orderSummary.innerHTML).toContain('Test Product');
    expect(orderSummary.innerHTML).toContain('₹10');
    expect(orderSummary.innerHTML).toContain('Delivery date:');
  });

  test('deliveryOptionHTML should generate correct HTML for delivery options', () => {
    const matchingProduct = { id: '1', deliveryOptionId: 'standard' };
    cartOption.push({ id: 'standard', daliveryDays: 3, price: 0 });
    cartOption.push({ id: 'express', daliveryDays: 1, price: 500 });

    const html = deliveryOptionHTML(matchingProduct);

    expect(html).toContain('FREE Shipping');
    expect(html).toContain('₹5 - Shipping');
    expect(html).toContain('checked');
  });

  test('removeFromCart should remove item from cart and update localStorage', () => {
    cart.push({ productId: '1', quantity: 1, deliveryOptionId: 'standard' });
    localStorage.setItem('cart', JSON.stringify(cart));

    removeFromCart('1');

    expect(cart.length).toBe(0);
    expect(localStorage.getItem('cart')).toBe(JSON.stringify([]));
  });

  test('renderpaymentsummery should update payment summary correctly', () => {
    cart.push({ productId: '1', quantity: 1, deliveryOptionId: 'standard' });
    products.push({ id: '1', name: 'Test Product', priceCents: 1000, image: 'test.jpg' });
    cartOption.push({ id: 'standard', daliveryDays: 3, price: 0 });

    document.body.innerHTML = '<div class="payment-summary"></div>';

    renderpaymentsummery();

    const paymentSummary = document.querySelector('.payment-summary');
    expect(paymentSummary.innerHTML).toContain('₹10');
  });
});
