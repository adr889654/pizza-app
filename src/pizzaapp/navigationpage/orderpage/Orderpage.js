import { useContext, useState } from "react";
import styles from "./OrderPage.module.css"
import axios from "axios";
import AppContext from "../../AppContext/AppContext";

const OrderPage = (props) =>{
    const appContext = useContext(AppContext);
    const [crust,setCrust] = useState("");
    const [flavor,setFlavor] = useState("");
    const [size,setSize] = useState("");
    const [table,setTable] = useState("");


    const crustHandler = (event) =>{
        setCrust(event.target.value)
    }
    const flavorHandler = (event) =>{
        setFlavor(event.target.value)
    }
    const sizeHandler = (event) =>{
        setSize(event.target.value)
    }
    const tableHandler = (event) =>{
        setTable(event.target.value)
    }

    const toInt = (strVal) =>{
        const intVal = parseInt(strVal);
        if(isNaN(intVal)) return 0;
        return intVal;
    }

    const orderButtonHandler = () =>{


        const orderPayload = {
            Crust:crust,
            Flavor:flavor,
            Size:size,
            Table_No:toInt(table)
        }
        
        placeOrder(orderPayload)
    }
    const placeOrder = (payload) =>{
        
        const api = "/api/orders"
        axios(api,{
            method:"post",
            data: payload
        }).then((response) => {                       
            window.alert("Your order has been placed")
            props.defaultOrderHandler();
        }).catch(error => {
            if(error.response && error.response.status === 409){
                window.alert(error.response.data.detail)
            }else{                
                appContext.networkErrorHandler(error);            
            }
        })
    }

    return(
        <div className={styles.mainDiv}>
            <p className={styles.mainLineStyle}>Choose your pizza type</p>

            <table>
                <tbody>
                    <tr>
                        <td>Crust</td>
                        <td>
                        <input 
                                type="text"
                                placeholder="Crust"
                                value={crust}
                                onChange={crustHandler}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Flavor</td>
                        <td>
                        <input 
                                type="text"
                                placeholder="Flavor"
                                value={flavor}
                                onChange={flavorHandler}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Size</td>
                        <td>
                        <input 
                                type="text"
                                placeholder="Size"
                                value={size}
                                onChange={sizeHandler}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Table No</td>
                        <td>
                        <input 
                                type="text"
                                placeholder="Table"
                                value={table}
                                onChange={tableHandler}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <input 
                type="button"
                value="Order"
                onClick={orderButtonHandler}
            />

        </div>
    )
};

export default OrderPage;