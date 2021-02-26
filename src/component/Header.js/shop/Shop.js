import React, { useState } from 'react';
import fakeData from "../../../fakeData"
import Cart from '../../cart/Cart';
import Product from '../../product/Product';
import "./shop.css"
const Shop = () => {
    const first10 = fakeData.slice(0, 10)
    const [product, setProduct] = useState(first10)
    const [cart, setCart] = useState([])

    const handleAdd = (product) => {
        // console.log('added', product)
        const newCart =[...cart, product]
        setCart(newCart)
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    product.map(pk => <Product handleClick={handleAdd} product={pk}></Product>)
                }
            </div>
            <div className="card-container">
                <Cart cart={cart}></Cart>
            </div>


        </div>
    );
};

export default Shop;