
let producthtml='';
products.forEach((value)=>
{ producthtml+=
   `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${value.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${value.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${(value.rating.stars)*10}.png">
            <div class="product-rating-count link-primary">
              ${value.rating.count}
            </div>
          </div>

          <div class="product-price">
            ₹${value.priceCents}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary add-to-cart-js" data-product-Id=${value.id}>
            Add to Cart
          </button>
        </div>`
}
)
document.querySelector('.products-grid').innerHTML=producthtml;
document.querySelectorAll('.add-to-cart-js').forEach(
  (value)=>{
    value.addEventListener('click',()=>{
     const pname= value.dataset.productId; 

     let itemmatch;
     cart.forEach((item)=>{
      if(pname===item.productId){
        itemmatch=item;
      }
     }
    );
    if(itemmatch){
      itemmatch.quantity += 1;
    }
    else{cart.push(
      {productId:pname,
        quantity:1
      });}
      let cartQuantity=0;
      cart.forEach((item)=>{
        cartQuantity+=item.quantity;
        document.querySelector('.cart-quantity').innerHTML=cartQuantity;
      })

       
      console.log(cartQuantity);
    } );
 
  }
)