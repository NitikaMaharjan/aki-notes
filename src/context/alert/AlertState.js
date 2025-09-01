import { useState } from "react";
import AlertContext from "./AlertContext";

export default function AlertState(props) {

    const [alert, setAlert] = useState(false);
    const [img, setImg] = useState("");
    const [msg, setMsg] = useState("");

    const showAlert = (state, msg) => {
        setAlert(true);
        setImg(state);
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
                        <img src={`${img==="1"?"/icons/success.png":"/icons/unsuccess.png"}`} height="28px" width="28px" alt={`${img==="1"?"success":"fail"}`}/>&nbsp;
                        <p className="m-0 p-0" style={{fontSize: "13px", color: "#212529e0"}}>
                            {msg}
                        </p>
                    </div>
                </div>
            }
        </>
    );
}