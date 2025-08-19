import React, { useEffect, useContext }from 'react';
import { Link, useNavigate } from "react-router";
import ThemeContext from '../context/theme/ThemeContext';
import UserContext from '../context/user/UserContext';

export default function TopNavbar(props) {

  const theme = useContext(ThemeContext);
  const {userInfo, fetchUserInfo} = useContext(UserContext);
  let navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      fetchUserInfo();
    }
  }, [localStorage.getItem('token')]);

  return (
    <>
      {localStorage.getItem('token')?
        <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <div>
            <h5 style={{margin: "0px 0px 0px 22px", padding: "0px", color: `${theme==="light"?"black":"white"}`}}>Hello, {`${userInfo.name}`}</h5>
          </div>
          <div style={{display: "flex", gap: "8px"}}>
            <button className={`login-btn${props.alt==="light"?"":"-dark"}`} onClick={handleLogout}>Log out</button>
            <div className={`theme-icon-wrapper${props.alt==="light"?"-light":"-dark"}`} onClick={props.ChangeTheme} title="change theme">
              <img src={props.src} height="20px" width="20px" alt={`${props.alt} theme button`}/>
            </div>
          </div>
        </div>
      :
      <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "right", gap: "8px"}}>
        <Link to="/login"><button className={`login-btn${props.alt==="light"?"":"-dark"}`}>Log in</button></Link>
        <Link to="/signup"><button className={`signup-btn${props.alt==="light"?"":"-dark"}`}>Sign up</button></Link>
        <div className={`theme-icon-wrapper${props.alt==="light"?"-light":"-dark"}`} onClick={props.ChangeTheme} title="change theme">
          <img src={props.src} height="20px" width="20px" alt={`${props.alt} theme button`}/>
        </div>
      </div>
      }
    </>
  )
}
