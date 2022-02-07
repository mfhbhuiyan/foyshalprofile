import React,{Fragment,useEffect } from "react";
import "./MyOrders.css"
import { DataGrid } from "@material-ui/data-grid";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../Loader.js";
import {Link} from "react-router-dom";
import {useAlert} from "react-alert";
import MetaData from "../../components/MetaData";
import { Typography } from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";
import {clearErrors, myOrders} from "../../actions/orderAction";

const MyOrders = () =>{
      
const dispatch = useDispatch();
const alert = useAlert();
const {loading, error, orders} = useSelector((state) => state.myOrders);
const {user} = useSelector((state)=> state.user);

  
const columns = [
    {
        field: "id", 
        headerName: "Order Id",
        minWidth: 300,
        flex: 1,
    },

    {
        field: "status", 
        headerName: "Status",
        minWidth: 150,
        flex: 0.5,
        cellClassName: (params) =>{
            return params.getValue(params.id, "status") === "Delivered"
            ? "greenColor"
            : "redColor";
        },
    },

    {
        field: "itemsQty", 
        headerName: "Items Qty",
        type: "number",
        minWidth: 150,
        flex: 0.3,
    },

    {
        field: "amount", 
        headerName: "Amount", 
        type: "number",
        minWidth: 270,
        flex: 0.5,
    },
    {
        field: "actions", 
        flex: 0.3,
        headerName: "Actions", 
        type: "number",
        minWidth: 150,
        sortable:false,
        renderCell : (params) => {
            return(
<Link to = {`/order/${params.getValue(params.id,"id")}`}>
    <LaunchIcon/>
</Link>
            );
        }
      
    },
];


const rows = [];

orders && 
orders.forEach((item, index)=>{
rows.push({
    itemsQty: item.orderItems.length,
    id:item._id,
    status: item.orderStatus,
    amount:item.totalPrice,
});

});



useEffect(()=> {
    if(error) {
        alert.error(error);
        dispatch(clearErrors());
    }
    dispatch(myOrders());
    
    }, [dispatch,alert, error]);


    return(
        <div className="myOrdersPage">
        <DataGrid
        rows = {rows}
        columns= {columns}
        pageSize = {10}
        disableSelectionOnClick
        className="myOrdersTable"
        autoHeight
        />
<Typography id="myOrdersHeading">{user.name}'s Orders </Typography>
        </div>
        )
}
export default MyOrders;