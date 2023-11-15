
import Authenticate from "./auth/Authenticate";
import AppContext from "./AppContext/AppContext";
import axios from "axios";
import { useState } from "react";
import PizzaHeader from "./header/PizzaHeader";
import Logout from "./logout/Logout";
import NavigationPage from "./navigationpage/NavigationPage";

const PizzaMain  = () =>{

    const [loggedIn,setLoggedIn] = useState(false);


    axios.defaults.baseURL = "https://pizza-api-app.herokuapp.com";

    const networkErrorHandler = (error) => {
        if(!error.response){
            window.alert('Network Error')
        }
        else if (error.response.status === 401){
            logoutHandler();
        }
        else{
            window.alert('Internal Server Error')
        }
    }

    const logoutHandler = () =>{
        // clear any session Cookies 
        loginHandler(false)
    }
    const loginHandler = (loginState) => {
        setLoggedIn(loginState)

    }

    let mainBodyUI = null;
    let logoutUi = null;
    if(loggedIn){
        mainBodyUI = (
            <NavigationPage/>
        )

        logoutUi = (
            <Logout logoutHandler={logoutHandler}/>
        )
    }
    else{
        mainBodyUI = (
            <Authenticate
                loginHandler={loginHandler}
            />
        )
    }

    return (
        <div>   
            <AppContext.Provider value={{
                authToken: null,                
                networkErrorHandler: networkErrorHandler
            }}>         
                <PizzaHeader/>
                {logoutUi}
                {mainBodyUI}
            </AppContext.Provider>
        </div>
    );
}

export default PizzaMain; 