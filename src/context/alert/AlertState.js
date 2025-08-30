import { useState } from "react";
import AlertContext from "./AlertContext";

export default function AlertState(props) {

    const [alert, setAlert] = useState(false);

    const showAlert = () => {
        setAlert(true);

        setTimeout(() => {
            setAlert(false);
        }, 2000);
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
                        <p className="m-0 p-0">YOLO</p>
                    </div>
                </div>
            }
        </>
    );
}