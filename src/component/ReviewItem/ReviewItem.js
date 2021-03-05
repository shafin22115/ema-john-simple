import React from 'react';
import './ReviewItem.css'
const ReviewItem = (props) => {
    // console.log(props)
    const {name, quantity,img, key,price}= props.product;
    return (
        <div className="review-item">
            <div><img src={img} alt=""/></div>
            <div><h3 className="product-name">{name}</h3>
            <br/>
            <p>Quantity: {quantity}</p>
            <br/>
            <p>{price}</p>
            <button onClick={() => props.removeItem(key)} className="main-btn">Remove</button></div>
            
        </div>
    );
};

export default ReviewItem;