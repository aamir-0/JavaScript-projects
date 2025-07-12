function Cart(local){
    const cart ={
    cartItem:undefined,
    
        loadFromLocalStorage() {
            this.cartItem=JSON.parse(localStorage.getItem(local));

            if (!this.cartItem){
            this.cartItem = [{
            productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity:2,
            deliveryOptionId:'1'
            },
            {
            productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity:1,
            deliveryOptionId:'2'
            }];}
        },


        saveToLocal(){
        localStorage.setItem(local,JSON.stringify(this.cartItem));
        },

        addtocart(pname){
        let itemmatch;
        this.cartItem.forEach((item)=>{
        if(pname===item.productId){
            itemmatch=item;
        }
        }
        );
        if(itemmatch){
        itemmatch.quantity += 1;
        }
        else{this.cartItem.push(
        {productId:pname,
            quantity:1,
            deliveryOptionId:''
        });}

        this.saveToLocal();
        
    },

        removeFromCart(product_id){
        const newcart=[];
        this.cartItem.forEach((item)=>{
        if(item.productId!==product_id){
        newcart.push(item);
        }
        })
        this.cartItem=newcart;

        saveToLocal();
        }
    };
    return cart;
}
let cart =  Cart('cart-oop');
let cart2 =  Cart('cart-bussiness');
cart.loadFromLocalStorage();
cart.addtocart('3ebe75dc-64d2-4137-8860-1f5a963e534b'); // Example usage
cart2.loadFromLocalStorage();
cart2.addtocart('3ebe75dc-64d2-4137-8860-1f5a963e534b'); // Example usage

console.log('Cart loaded:', cart);

console.log('Cart-buss loaded:', cart2);




