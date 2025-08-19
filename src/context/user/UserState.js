import UserContext from "./UserContext";
import { useState } from "react";

export default function UserState(props) {
    const host = "http://localhost:5000"; // our backend is running at port 5000
    const [userInfo, setUserInfo] = useState([]);

    const fetchUserInfo = async()=>{
        const response = await fetch(`${host}/api/auth/fetchuserdetails`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "authtoken": localStorage.getItem('token')
            }
        });
        const fetchedUserInfo = await response.json();
        setUserInfo(fetchedUserInfo);
    }

    return(
        <UserContext.Provider value={{userInfo, fetchUserInfo}}>
            {props.children}
        </UserContext.Provider>
    );
}
