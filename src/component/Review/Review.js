import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart, clearLocalShoppingCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../cart/Cart'
import happyImg from '../../images/giphy.gif'
const Review = () => {
    const [cart, setCart] = useState([])
    const [orderP, setOrderdP] = useState(false)
    const removeItem = (productKeys) => {
    const newCart = cart.filter(pd=> pd.key !== productKeys)
    setCart(newCart)
    removeFromDatabaseCart(productKeys)
    }
    const handlePlaceOrder = () => {
        setCart([])
        setOrderdP(true)
        clearLocalShoppingCart()
    }

    useEffect(()=> {
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart)

        const cartProduct = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key]
            return product;
        })
        setCart(cartProduct);
    },[])
    let thankYou;
    if(orderP){
        thankYou = <img src={happyImg} alt=""/>
    } 
    return (
        <div className='shop-container'>
          <div className='product-container'>
          
           {
               cart.map(pd=>  <ReviewItem removeItem={removeItem} product={pd}></ReviewItem>)
           }
           {
               thankYou
           }
          </div>
          <div className="card-container">
              <Cart  cart={cart}>
                  <button onClick={handlePlaceOrder} className="main-btn">Place Order</button>
              </Cart>
          </div>
        </div>
    );
};

export default Review;<h1>shafin</h1>