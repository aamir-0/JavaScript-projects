

export let cart=JSON.parse(localStorage.getItem('cart'));

if (!cart){
cart = [{
  productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity:2,
  deliveryOptionId:'1'
},
{
  productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity:1,
  deliveryOptionId:'2'
}
];
}


function saveToLocal(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addtocart(pname){
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
        quantity:1,
        deliveryOptionId:''
      });}

      saveToLocal();
      
}

export function removeFromCart(product_id){
const newcart=[];
cart.forEach((item)=>{
if(item.productId!==product_id){
  newcart.push(item);
}
})
cart=newcart;

saveToLocal();
}
