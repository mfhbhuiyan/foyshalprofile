import {createStore,applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { newProductReducer, newReviewReducer, productReducer, productsReducer,productReviewsReducer,reviewReducer } from "./reducers/prductReducer";
import { productDetailsReducer } from "./reducers/prductReducer";
import { profileReducer, userReducer,forgotPasswordReducer,allUsersReducer,userDetailsReducer} from "./reducers/userReducer";
import {cartReducer} from "./reducers/cartReducer";
import { newOrderReducer,myOrderReducer, orderDetailsReducer,allOrderReducer, OrderReducer } from "./reducers/orderReducer";

 const reducer = combineReducers({
      products:productsReducer,
      productDetails:productDetailsReducer,
      user:userReducer,
      profile:profileReducer,
      forgotPassword:forgotPasswordReducer,
      cart: cartReducer,
      newOrder: newOrderReducer,
      myOrders: myOrderReducer,
      orderDetails:orderDetailsReducer,
      newReview:newReviewReducer,
      newProduct:newProductReducer,
      product:productReducer,
      allOrders:allOrderReducer,
      order:OrderReducer,
      allUsers: allUsersReducer,
      userDetails: userDetailsReducer,
      productReviews: productReviewsReducer,
      review: reviewReducer,
      }); 

const cartFromLocalStorage = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []

const shippingInfoStorage = localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")): {}
 
 let initialState = {

     cart: {
          cartItems: cartFromLocalStorage,
          shippingInfo: shippingInfoStorage
     }

     };



const middleware = [thunk];

 const store= createStore(
     reducer,
     initialState,
     composeWithDevTools(applyMiddleware(...middleware))
     );

     export default store;
