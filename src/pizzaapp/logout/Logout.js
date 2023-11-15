
import styles from "./Logout.module.css"

const Logout = (props) =>{

    
    return (
        <div className={styles.mainDiv}><p onClick={props.logoutHandler}>Log out</p></div>
    )
};

export default Logout;