import { useContext, useState } from "react";
import axios from "axios";
import AppContext from "../AppContext/AppContext";
import styles from "./Authenticate.module.css"

const Authenticate = (props) =>{

    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const appContext = useContext(AppContext);
    const enterKey = 13

    const userNameHandler = (event) =>{
        setUserName(event.target.value)
    }
    const passwordHandler = (event) =>{
        setPassword(event.target.value) 
    }
    const passwordKeyDownHandler = (event) =>{
        if(event.keyCode === enterKey){
            loginButtonHandler();
        }
    }
    const loginButtonHandler = () =>{
        // Perform user input validation

        const authPayload = {password:password,username:userName};
        AuthenticateUser(authPayload);
    }

    const AuthenticateUser = (payload) =>{
        
        const api = "/api/auth"
        axios(api,{
            method:"post",
            data: payload
        }).then((response) => {                       
            const acToken = response.data.access_token;
            axios.defaults.headers.common['Authorization'] = 'Bearer '+acToken;

            props.loginHandler(true);
        }).catch(error => {
            if(error.response && error.response.status === 401){
                window.alert("Bad user name or password")
            }else{
                appContext.networkErrorHandler(error);
            }
        })
    }

    return(
        <div className={styles.mainAuthDiv}>
            <p className={styles.mainLineStyle}>Please Log in</p>

            <table>
                <tbody>
                    <tr>
                        <td>User Name</td>
                        <td>
                            <input 
                                type="text"
                                placeholder="..."
                                value={userName}
                                onChange={userNameHandler}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td>
                            <input 
                                type="password"
                                placeholder="..."
                                value={password}
                                onChange={passwordHandler}
                                onKeyDown={passwordKeyDownHandler}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <input 
                type="button"
                value="Log In"
                onClick={loginButtonHandler}
            />

        </div>
    );
}

export default Authenticate;