import React, { useEffect, useContext }from 'react';
import { Link, useNavigate } from "react-router";
import ThemeContext from '../context/theme/ThemeContext';
import UserContext from '../context/user/UserContext';

export default function TopNavbar() {

  const {theme, ChangeTheme} = useContext(ThemeContext);
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
    // eslint-disable-next-line
  }, [localStorage.getItem('token')]);

  return (
    <>
      {localStorage.getItem('token')?
        <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <div>
            <h5 style={{margin: "0px 0px 0px 22px", padding: "0px", color: `${theme==="light"?"black":"white"}`}}>Hello, {`${userInfo.name}`}</h5>
          </div>
          <div style={{display: "flex", gap: "8px"}}>
            <button className={`login-btn${theme==="light"?"":"-dark"}`} onClick={handleLogout}>Log out</button>
            <div className={`theme-icon-wrapper${theme==="light"?"-light":"-dark"}`} onClick={()=>ChangeTheme()} title="change theme">
              <img src={theme==="light"?"/icons/moon.png":"/icons/sun.png"} height="20px" width="20px" alt={`${theme==="light"?"dark":"light"} theme button`}/>
            </div>
          </div>
        </div>
      :
      <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "right", gap: "8px"}}>
        <Link to="/login"><button className={`login-btn${theme==="light"?"":"-dark"}`}>Log in</button></Link>
        <Link to="/signup"><button className={`signup-btn${theme==="light"?"":"-dark"}`}>Sign up</button></Link>
        <div className={`theme-icon-wrapper${theme==="light"?"-light":"-dark"}`} onClick={()=>ChangeTheme()} title="change theme">
          <img src={theme==="light"?"/icons/moon.png":"/icons/sun.png"} height="20px" width="20px" alt={`${theme==="light"?"dark":"light"} theme button`}/>
        </div>
      </div>
      }
    </>
  )
}
