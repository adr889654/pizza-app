
import { useState } from "react";
import styles from "./NavigationPage.module.css"
import OrderPage from "./orderpage/Orderpage";
import DefaultPage from "./defaultpage/DefaultPage";
import ViewOrdersPage from "./vieworderspage/ViewOrdersPage";

const NavigationPage = () =>{

    const uiOrderDefault = 0;
    const uiOrderMode = 1;
    
    const uiViewOrderMode = 3;

    const [uiMode,setUiMode] = useState(uiOrderDefault)

    const orderNewHandler = () =>{
        setUiMode(uiOrderMode)
    }
   
    const viewOrderHandler = () =>{
        setUiMode(uiViewOrderMode)
    }
    const defaultOrderHandler = () =>{
        setUiMode(uiOrderDefault)
    }


    let uiBody = null;
    if(uiMode === uiOrderMode){
        uiBody = (
            <OrderPage
                defaultOrderHandler={defaultOrderHandler}
            />
        )
    }else if(uiMode === uiViewOrderMode){
        uiBody = (
            <ViewOrdersPage
                
            />
        )
    }else{
        uiBody = (
            <DefaultPage/>
        )
    }

    


    return (
        <div>
            <div className={styles.mainHeaderStyles}>
            <span className={styles.navigationStyle} onClick={orderNewHandler}>Order New Pizza</span>
            {/* <span className={styles.navigationStyle} onClick={cancelOrderHandler}>Cancel Order</span> */}
            <span className={styles.navigationStyle} onClick={viewOrderHandler}>View Orders</span>
            </div>
            {uiBody}
        </div>
    );
};

export default NavigationPage;