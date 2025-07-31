import NoteContext from "./NoteContext";
import { useState } from "react";

export default function NoteState(props) {

    const [userInfo, setUserInfo] = useState({
        "name": "Nitika",
        "age": "21"
    })

    const userInfoUpdate = () => {
        setTimeout(() => {
            setUserInfo({
                "name": "Ridiculus",
                "age": "100"
            })
        }, 2000);
    }

    return (
        // NoteState is a custom wrapper component that wraps the context provider (NoteContext.Provider)
        // NoteContext.Provider is the context provider that provides/shares the state and updater function to its children components
        <NoteContext.Provider value={{ userInfo, userInfoUpdate }}>
            {/* This renders all children components passed inside <NoteState></NoteState> */}
            {props.children}
        </NoteContext.Provider>
    );
}
