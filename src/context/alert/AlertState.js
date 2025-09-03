import { useState } from "react";
import AlertContext from "./AlertContext";

export default function AlertState(props) {

    const [alert, setAlert] = useState(false);
    const [imgSrc, setImgSrc] = useState("");
    const [msg, setMsg] = useState("");

    const showAlert = (status, msg) => {
        setAlert(true);
        setImgSrc(status);
        setMsg(msg);

        setTimeout(() => {
            setAlert(false);
        }, 3000);
    }

    return(
        <>
            <AlertContext.Provider value={{showAlert}}>
                {props.children}
            </AlertContext.Provider>

            {
                alert 
                
                &&

                <div className="alert-box">
                    <div className="alert-content">
                        <img src={`/icons/${imgSrc}.png`} height="28px" width="28px" alt={`${imgSrc} icon`}/>&nbsp;
                        <p className="m-0 p-0" style={{fontSize: "13px", color: "#212529e0"}}>
                            {msg}
                        </p>
                    </div>
                </div>
            }
        </>
    );
}