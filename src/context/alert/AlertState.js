import { useState } from "react";
import AlertContext from "./AlertContext";

export default function AlertState(props) {

    const [alert, setAlert] = useState(false);

    const showAlert = () => {
        setAlert(true);

        setTimeout(() => {
            setAlert(false);
        }, 5000);
    }

    return(
        <>
            <AlertContext.Provider value={{showAlert}}>
                {props.children}
            </AlertContext.Provider>
            {
                alert &&

                <div class="alert alert-primary" role="alert">
                    This is a primary alert—check it out!
                </div>
            }
        </>
    );
}