import React from 'react';


const Cart = (props) => {
    const cart = props.cart
    
    let total = 0;
    for(let i = 0; i< cart.length; i++){
        const product = cart[i]
        total = total + product.price * product.quantity;
    }
    let shipping= 0;
    if(total > 35){
        shipping = 0
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99
    }

    const tax = (total / 10).toFixed(2)
    const GrandTotal = (total + shipping + Number(tax)).toFixed(2);

    const formatNumber = num => {
        const precition = num.toFixed(2)
        return Number(precition)
    }
    return (
        <div>
            <h4>Order Summery:</h4>
            <p>Items Orderd: {cart.length}</p>
            <p>Product Price:${formatNumber(total)}</p>
            <p><small>Shipping Card: {shipping}</small></p>
            <p>Tax + Vat: {tax}</p>
            <p>Total Price: {GrandTotal}</p>
            <br/>
           {
               props.children
           }
        </div>
    );
};

export default Cart;