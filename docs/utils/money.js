export function convertion(dollars){
    const conversionrate=83;
   let val= Math.floor(conversionrate*dollars);
  
   return val;
}
export function formatPrice(price) {
    return `₹${Math.floor(price / 100)}`;
}

export function tax(val){
    const taxRate = 0.18; // 18% tax rate
    return Math.floor(val * taxRate);
}