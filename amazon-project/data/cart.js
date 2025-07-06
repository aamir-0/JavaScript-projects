export const cart=[];

function addtocart(pname){
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
      
}