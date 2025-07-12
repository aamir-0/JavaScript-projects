export function getproduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
  return matchingProduct;
}

export let products = [];

export function loadproducts(fun) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    try {
      products = JSON.parse(xhr.response);
      console.log('Products loaded:', products);
      fun();
    } catch (error) {
      console.error('Error parsing products:', error);
    }
  });
  xhr.addEventListener('error', () => {
    console.error('Error loading products from the URL');
  });
  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
}

// Call loadproducts with a default callback to log the products
loadproducts(() => {
  console.log('Products have been successfully loaded.');
});