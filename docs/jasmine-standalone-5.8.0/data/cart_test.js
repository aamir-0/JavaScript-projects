import {addtocart,saveToLocal,removeFromCart} from '../data/cart.js';

describe('Cart Functions', () => {
  beforeEach(() => {
    // Reset cart and mock localStorage
    cart.length = 0;
    localStorage.clear();
  });

  it('should add item to cart', () => {
    addtocart('test-product-id');
    expect(cart.length).toBe(1);
    expect(cart[0].productId).toBe('test-product-id');
    expect(cart[0].quantity).toBe(1);
  });

  it('should increase quantity if item already exists in cart', () => {
    addtocart('test-product-id');
    addtocart('test-product-id');
    expect(cart.length).toBe(1);
    expect(cart[0].quantity).toBe(2);
  });

  it('should remove item from cart', () => {
    addtocart('test-product-id');
    removeFromCart('test-product-id');
    expect(cart.length).toBe(0);
  });

  it('should save cart to localStorage', () => {
    addtocart('test-product-id');
    expect(localStorage.getItem('cart')).toBe(JSON.stringify(cart));
  });
});