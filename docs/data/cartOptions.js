import {cart} from '../data/cart.js';
export const cartOption = [
    {id:'1',
      daliveryDays:7,
      price:0
    },
    {id:'2',
      daliveryDays:3,
      price:232
    }

];

export function getCartOption(deliveryOptionId) {
    let deliveryOption;
    cartOption.forEach(Option => {
        if (Option.id == deliveryOptionId) {
            deliveryOption = Option;
        }
    });


    // Return the matching delivery option or the default (first option)
    return deliveryOption || cartOption[0];
}