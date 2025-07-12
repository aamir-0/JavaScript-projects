import {convertion,formatPrice,tax} from '../../utils/money.js';
describe('test suite for money.js', () => {
  it('should convert dollars to rupees', () => {
    const dollars = 10;
    const expectedRupees = 830; // 10 * 83
    expect(convertion(dollars)).toBe(expectedRupees);
  });

  it('should format price correctly', () => {
    const price = 10000; // 100 rupees
    expect(formatPrice(price)).toBe('₹100');
  });

  it('should calculate tax correctly', () => {
    const value = 1000; // 1000 rupees
    const expectedTax = Math.floor(value * 0.18); // 18% tax
    expect(tax(value)).toBe(expectedTax);
  });
});