import styles from "./OrderTable.module.css"
import OrderRow from "../orderRow/OrderRow";
import { useEffect, useState } from "react";

const OrderTable = (props) =>{

    const [reloadToggle,setReloadToggle] = useState(false);
    useEffect( () =>{
                             
    },[reloadToggle]);

    

    const uncheckAll = () => {
        props.orders.forEach( p  => {
            p.isSelected = false;
        });
    }
    const clickHandler = (order) =>{
        const clickState = !order.isSelected;
        uncheckAll();
        order.isSelected = clickState;
        setReloadToggle(!reloadToggle)        
    }

    let orderRowsUi = null;
    if(props.orders !== null){
        
        orderRowsUi = props.orders.map( (p,index) =>{

            if(p.isSelected == null){
                p.isSelected = false;
            }

            return <OrderRow 
                order={p}
                clickHandler={clickHandler}
                key={"order"+index}
                isSelected={p.isSelected}
            />
        })
        
    }


    return (
            <table className={styles.tableClass}>
                <thead>
                    <tr>
                    <th></th>
                        <th className={styles.colStyle}>Order ID</th>
                        <th className={styles.colStyle}>Crust</th>
                        <th className={styles.colStyle}>Flavor</th>                        
                        <th className={styles.colStyle}>Size</th>
                        <th className={styles.colStyle}>Table Number</th>
                        <th className={styles.colStyle}>Time Stamp</th>
                    </tr>                   
                </thead>
                <tbody>
                    {orderRowsUi}
                </tbody>
            </table>
    )
}

export default OrderTable;