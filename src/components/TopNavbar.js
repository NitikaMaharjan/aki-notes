import React, { useContext }from 'react';
import { Link, useNavigate } from "react-router";
import ThemeContext from '../context/theme/ThemeContext';

export default function TopNavbar() {

  const {theme, ChangeTheme} = useContext(ThemeContext);
  let navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("activeContent");
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      {localStorage.getItem("token")?
        <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <div>
            <h5 style={{margin: "0px 0px 0px 22px", padding: "0px", color: `${theme==="light"?"black":"white"}`}}>Hello, {localStorage.getItem("username")?localStorage.getItem("username"):"User"}</h5>
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
