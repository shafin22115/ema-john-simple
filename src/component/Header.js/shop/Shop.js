import React, { useEffect, useState } from 'react';
import fakeData from "../../../fakeData"
import { addToDatabaseCart, getDatabaseCart } from '../../../utilities/databaseManager';
import Cart from '../../cart/Cart';
import Product from '../../product/Product';
import "./shop.css"
import { Link } from 'react-router-dom';
const Shop = () => {
    const first10 = fakeData.slice(0, 10)
    const [product, setProduct] = useState(first10)
    const [cart, setCart] = useState([])
    useEffect(()=> {
      const savedCart = getDatabaseCart()
      const productKey = Object.keys(savedCart)
      const previousCart = productKey.map(existingKey => {
          const product = fakeData.find(pd => pd.key === existingKey)
          product.quantity = savedCart[existingKey]
          return product;
        
      })
      setCart(previousCart)
    },[])


    const handleAdd = (product) => {
        // console.log('added', product)
        const productToBeAdded = product.key
        let count = 1
        let newCart
        const sameProduct= cart.find(pd=> pd.key === product.key)
        if(sameProduct){
             count = sameProduct.quantity + 1
            sameProduct.quantity = count
            const other = cart.filter(pd => pd.key !== productToBeAdded)
            newCart =[...other, sameProduct]
        }
        else{
            product.quantity = 1
            newCart = [...cart, product]
        }
        

        
        setCart(newCart)
        
        addToDatabaseCart(product.key, count)
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    product.map(pk => <Product showAddToCart={true} handleClick={handleAdd} product={pk}></Product>)
                }
            </div>
            <div className="card-container">
                <Cart cart={cart}>
                <Link to='/review'>
            <button className="main-btn">Review Order</button>
            </Link>
                </Cart>
            </div>


        </div>
    );
};

export default Shop;