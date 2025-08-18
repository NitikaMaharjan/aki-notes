import React from 'react';
import { Link } from "react-router";

export default function TopNavbar(props) {

  return (
    <>
      <Link to="/login"><button className={`login-btn${props.alt==="light"?"":"-dark"}`}>Log in</button></Link>
      <Link to="/signup"><button className={`signup-btn${props.alt==="light"?"":"-dark"}`}>Sign up</button></Link>
      <div className={`theme-icon-wrapper${props.alt==="light"?"-light":"-dark"}`} onClick={props.ChangeTheme} title="change theme">
        <img src={props.src} height="20px" width="20px" alt={`${props.alt} theme button`}/>
      </div>
    </>
  )
}
