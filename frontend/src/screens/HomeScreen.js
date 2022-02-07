import React,{Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./HomeScreen.css"
import Product from "../components/Product.js"
import MetaData from "../components/MetaData.js"
import {clearErrors, getProduct} from "../actions/productAction";
import {useSelector, useDispatch} from "react-redux";
import Loader from '../components/Loader.js';
import {useAlert} from "react-alert";

const HomeScreen = () =>{

    const alert = useAlert()

 const dispatch = useDispatch();

 const {loading,error,products,productsCount} = useSelector(
     (state) => state.products
     );

 useEffect(() => {
     if(error){
       return alert.error(error);  
     }
    dispatch(getProduct());
      }, [dispatch,error,alert] );
 
    return ( 
       <Fragment>
    {loading ? (
        <Loader/>
        ) : (
    <Fragment>
        <MetaData title="Rupshi Online Shop"/>

    <div className="banner">
        <p>Welcome to Ecommer</p>
        <h1>AMAZING PRODUCTS</h1>
        <a href = "#container">
             <button>
                 Scroll <CgMouse/>
             </button>
        </a>
    </div>

    <h2 className="homeHeading">Featured Products</h2>
        <div className="container" id = "container">
        {products && products.map((product) => (
            <Product product={product}/>

        ))}
        </div> 
   
</Fragment>
    )}
    </Fragment>    
    
           )
   
};

export default HomeScreen;