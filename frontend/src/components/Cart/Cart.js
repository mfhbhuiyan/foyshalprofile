import React, { Fragment,useState } from 'react';
import "./Cart.css";
import CartItemCart from "./CartItemCart.js";
import {addItemsToCart,removeItemsFromCart} from "../../actions/cartAction";
import {useSelector, useDispatch} from "react-redux";
import {Typography} from "@material-ui/core";
import  RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from 'react-router-dom';

const Cart = ({history}) => {

    const dispatch = useDispatch();

    const {cartItems} = useSelector((state)=> state.cart);

    // const item = {
    //     product : "ProductID",
    //     price: "200",
    //     name: "abhi",
    //     quantity:1,
    //     image: "http://i.ibb.co/DRST11n/1.webp"
    // };

    const increaseQuantity =(id, quantity, stock) =>{
    const newQty = quantity + 1;
    if(stock <= quantity){
    return;
    }
    dispatch(addItemsToCart(id,newQty))
    };

    const decreaseQuantity =(id, quantity, stock) =>{
    const newQty = quantity - 1;
    if(1>= quantity){
    return;
    }
    dispatch(addItemsToCart(id,newQty))
    };


   const deleteCartItems= (id)=>{
       dispatch(removeItemsFromCart(id));

   };

   const checkoutHandler = () => {
      history.push("/login?redirect=shipping") 
   }

    return (
        <Fragment>
            {cartItems.length === 0 ? (
                <div className='emptyCart'>
                    <RemoveShoppingCartIcon/>
                    <Typography>No Product In Your Cart</Typography>
                    <Link to = "/products">View Products</Link>
                </div>

            ) : (
                <Fragment>
    <div className = "cartPage">
        <div className= "cartHeader">
            <p>Product</p>
            <p>Quantity</p>
            <p>Subtotal</p>           
        </div>

{cartItems && cartItems.map((item)=> (
   
<div className='cartContainer'>
<CartItemCart item={item} deleteCartItems = {deleteCartItems}/>
<div className='cartInput'>
    <button onClick={()=>decreaseQuantity(item.product, item.quantity, item.stock)}>-</button>
    <input type="number" readOnly value={item.quantity}/>
    <button onClick={()=>increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
</div>
<p className='cartSubtotal'>ট {`${item.price * item.quantity}`}</p>
</div>
)



)}

      


        <div className="cartGrossProfit">
            <div></div>
            <div className='cartGrossProfitBox'>
                <p>Gross Total</p>
                <p>{`${cartItems.reduce(
                    (acc,item)=> acc + item.quantity * item.price,
                    0
                )}`}</p>
            </div>
            <div></div>
            <div className='checkOutBtn'>
                <button onClick={checkoutHandler}>Check Out</button>
            </div>

        </div>



    </div>
        
    </Fragment>
            )
            
        }
        </Fragment> 
    

    )
}

export default Cart;
