
import { useContext, useEffect, useState } from "react";
import styles from "./ViewOrdersPage.module.css"
import axios from "axios";
import AppContext from "../../AppContext/AppContext";
import OrderTable from "./orderTable/OrderTable";

const ViewOrdersPage = () =>{
    const appContext = useContext(AppContext);
    const [orders,setOrders] = useState(null);
    const [reloadToggle,setReloadToggle] = useState(false);
    

    useEffect( () =>{
        const api = "/api/orders"
        axios(api,{
            method:"get"            
        }).then((response) => {                       
            setOrders(response.data)
        }).catch(error => {
            appContext.networkErrorHandler(error);                        
        })
    },[appContext,reloadToggle])


    const getSelectedOrder = () =>{    
        let selOrder = null;    
        orders.forEach( p  => {
            if(p.isSelected === true){
                selOrder = p;
            }
        });
        return selOrder;
    }
    const cancelOrderHandler = () =>{
        const selectedOrder = getSelectedOrder()
        if(selectedOrder == null){
            window.alert("Please selected an order to cancel")
            return;
        }

        if(window.confirm("Are you sure you want to cancel this order?")){
            cancelOrderCall(selectedOrder.Order_ID)
        }
    }
    
    const cancelOrderCall = (orderId) =>{
        const api = "/api/orders/"+orderId
        axios(api,{
            method:"delete"            
        }).then((response) => {                       
            window.alert("Your order has been cancelled")
            setReloadToggle(!reloadToggle) 
        }).catch(error => {
            appContext.networkErrorHandler(error);                        
        })
    }


    return (
        <div className={styles.mainDiv}>
            <p className={styles.mainLineStyle}>These are your current pizza orders</p>
            <span className={styles.cancelOrderStyle} onClick={cancelOrderHandler}>Cancel Order</span>
            {<OrderTable 
                orders = {orders}
            />}
            

        </div>
    )
}

export default ViewOrdersPage;