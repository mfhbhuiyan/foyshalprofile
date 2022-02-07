import React,{useEffect,useState} from "react";
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WebFont from "webfontloader";

import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreens from './screens/CartScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginSingUp from './components/User/LoginSingUp';
import Products from './screens/Products.js';
import Search from './screens/Search.js';
import store from "./store"
import { loadUser } from './actions/userAction';
import UserOptions from "./components/User/UserOptions.js"
import {useSelector } from 'react-redux';
import Profile from './components/User/profile.js';
import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdateProfile from './components/User/UpdateProfile.js'
import UpdatePassword from "./components/User/UpdatePassword.js"
import ForgotPassword from "./components/User/ForgotPassword.js"
import ResetPassword from "./components/User/ResetPassword.js"
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping.js"
import ConfirmOrder from "./components/Cart/ConfirmOrder.js"
import Payment from "./components/Cart/Payment.js"
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Cart/MyOrders.js";
import OrderDetails from "./components/Order/OrderDetails.js"
import Dashboard from "./components/Admin/Dashboard.js"
import ProductList from "./components/Admin/ProductList.js"
import NewProduct from "./components/Admin/NewProduct.js"
import UpdateProduct from "./components/Admin/UpdateProduct.js"
import OrderList from "./components/Admin/OrderList.js"
import ProcessOrder from "./components/Admin/ProcessOrder.js"
import UsersList from "./components/Admin/UsersList.js";
import UpdateUser from "./components/Admin/UpdateUser.js";
import ProductReviews from "./components/Admin/ProductReviews.js"
import Contact from "./components/layout/Contact/Contact.js";
import About from "./components/layout/About/About.js";
import NotFound from "./components/layout/Not Found/NotFound.js";


function App() {

const {isAuthenticated, user} = useSelector((state) => state.user);

const [stripeApiKey, setStripeApiKey] = useState("");

async function getStripeApiKey() {
  
  const { data } = await axios.get("/api/vi/stripeApiKey");

  setStripeApiKey(data.stripeApiKey);
}

  React.useEffect(() => {
  WebFont.load({
  google:{families: ["Roboto", "Droid Sans", "Chilanka"],

  },
});

store.dispatch(loadUser());

getStripeApiKey();

}, []);


  return (

    <Router>

    <Header></Header>

    
    {isAuthenticated && <UserOptions user={user}/>} 
    


    <Elements stripe={loadStripe('pk_test_51K72c0SBoQoQEz8cpV7kS68aLiy2tQPrgWjpJ5w4tucuTVOBfIYDV0yMP6ZDDvG4nr0nHBvw3kiGzKACpyt8nKfl00o57sk0W7')}>
        <ProtectedRoute exact path="/process/payment" component = {Payment}></ProtectedRoute>
    </Elements>
 
   
   
    <main>
    
    <Switch>
        
   
    <Route exact path= "/" component = {HomeScreen}></Route>

    <Route exact path= "/product/:id" component = {ProductScreen}></Route>
    
    <Route exact path= "/products" component = {Products}></Route>

    <Route path= "/products/:keyword" component = {Products}></Route>

    <Route exact path= "/search" component = {Search}></Route>

    <Route exact path="/contact" component={Contact} />

    <Route exact path="/about" component={About} />
    
    <ProtectedRoute exact path="/account" component = {Profile}></ProtectedRoute>
    
    <ProtectedRoute exact path="/me/update" component = {UpdateProfile}></ProtectedRoute>
    
    <ProtectedRoute exact path="/password/update" component = {UpdatePassword}></ProtectedRoute>

    <Route exact path="/password/forgot" component = {ForgotPassword}></Route>

    <Route exact path="/password/reset/:token" component = {ResetPassword}></Route>

    <Route exact path= "/login" component = {LoginSingUp}></Route>

    <Route exact path= "/cart" component = {Cart}></Route>

    <ProtectedRoute exact path="/shipping" component = {Shipping}></ProtectedRoute>
    
    <ProtectedRoute exact path="/order/confirm" component = {ConfirmOrder}></ProtectedRoute>
    
    <ProtectedRoute exact path="/order/success" component = {OrderSuccess}></ProtectedRoute>
    
    <ProtectedRoute exact path="/orders/me" component = {MyOrders}></ProtectedRoute>
    
    <ProtectedRoute exact path="/order/:id" component = {OrderDetails}></ProtectedRoute>
    
    <ProtectedRoute isAdmin = {true} exact path="/admin/dashboard" component = {Dashboard}></ProtectedRoute>
    <ProtectedRoute isAdmin = {true} exact path="/admin/products" component = {ProductList}></ProtectedRoute>
    <ProtectedRoute isAdmin = {true} exact path="/admin/product" component = {NewProduct}></ProtectedRoute>
    <ProtectedRoute isAdmin = {true} exact path="/admin/product/:id" component = {UpdateProduct}></ProtectedRoute>
    
    <ProtectedRoute isAdmin = {true} exact path="/admin/orders" component = {OrderList}></ProtectedRoute>

    <ProtectedRoute isAdmin = {true} exact path="/admin/order/:id" component = {ProcessOrder}></ProtectedRoute>
    
    <ProtectedRoute isAdmin = {true} exact path="/admin/users" component = {UsersList}></ProtectedRoute>

    <ProtectedRoute isAdmin = {true} exact path="/admin/user/:id" component = {UpdateUser}></ProtectedRoute>

    <ProtectedRoute isAdmin = {true} exact path="/admin/reviews" component = {ProductReviews}></ProtectedRoute>
    <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
    
    </Switch>

    </main>
    <Footer></Footer>
    </Router>

    

  );
}

export default App;
   