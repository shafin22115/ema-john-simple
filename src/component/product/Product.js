import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';
const Product = (props) => {
    // console.log(props.product.name)
    const {img, name, seller, price, stock,key} = props.product;
    // console.log(props)
    return (
        <div className="product">
             <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h4 className="pd-name"><Link to={'/product/'+key}>{name}</Link></h4>
                <br/>
                <p><small> by: {seller}</small></p>
                <br/>
                <p>${price}</p>
                <br/>
                <p><small>Only {stock} left in stoct - Order Now</small></p>
                <br/>
               {props.showAddToCart && <button className="main-btn" onClick={() => props.handleClick(props.product)}><FontAwesomeIcon icon={faShoppingCart} />Add Cart</button>}
            </div>
            
        </div>
    );
};

export default Product;