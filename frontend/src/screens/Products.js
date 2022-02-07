import React,{Fragment, useEffect, useState } from "react";
import "./Products.css"
import Product from "../components/Product.js"
import {clearErrors, getProduct} from "../actions/productAction";
import {useSelector, useDispatch} from "react-redux";
import Loader from '../components/Loader.js';
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import MetaData from "../components/MetaData.js"

const categories = [
  "Body & Massage Oils",
  "Body Moisturizers",
  "Body Scrubs",
  "Body Soaps & Shower Gels",
  "Foot Care",
  "Hair Removal",
  "Hand Care",
  "Sun Care for Body",
  "Bath & Body Accessories",
];


const Products = ({match}) =>{

     
    const dispatch = useDispatch(); 

    const [currentPage, setCurrentPage]=useState(1);

    const [category, setCategory] = useState("")
    
   
   const {loading,error,products,productsCount,resultPerPage,filteredProductsCount} = useSelector(
    (state) => state.products
    );

      const keyword = match.params.keyword;

const setCurrentPageNo=(e)=>{
  setCurrentPage(e)
}


         useEffect(() => {
    
          dispatch(getProduct(keyword,currentPage,category));
            }, [dispatch,keyword,currentPage,category]);

        // let count = filteredProductsCount;
    
       return ( 
          <Fragment>
       {loading ? (
           <Loader/>
           ) : (
       <Fragment>
          <MetaData title="Ecommerce Site"/>
       <h2 className="ProductsHeading">Products</h2>
           <div className="Products">
           {products && products.map((product) => (
               <Product key={product} product={product}/>
   
           ))}
           </div> 

<div className="filterBox">
             

<Typography>Category</Typography>

<ul className="categoryBox">
  {categories.map((category)=>(
<li
  className = "category-link"
  key={category}
  onClick={()=> setCategory(category)}
>
  {category}

</li>

  ))}

</ul>


</div>

          {resultPerPage < productsCount && (
           <div className="paginationBox">
             <Pagination
             activePage={currentPage}
             itemsCountPerPage={resultPerPage}
             totalItemsCount={productsCount}
             onChange = {setCurrentPageNo}
             nextPageText = "Next"
             prevPageText="Prev"
             firstPageText="1st" 
             lastPageText="Last" 
             itemClass="page-item"
             linkClass = "page-link"
             activeClass="pageItemActive"
             activeLinkClass="pageLinkActive"
             />

            

           </div>
           )}
      
   </Fragment>
       )}
       </Fragment>    
       
              )
      
   };

export default Products;