import React, { useEffect } from 'react';
import { Link, useLocation } from "react-router";

export default function Navbar() {
  const location = useLocation();
  useEffect(() => {  
    console.log(location.pathname);
  }, [location]);
  
  return (
    <div style={{margin: "24px", padding: "12px", borderRadius: "12px", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.15)", backgroundColor: "white"}}>
        <div style={{borderBottom: "1px solid #bebebeff", marginBottom: "12px"}}>
            <h4 style={{margin: "0px 0px 12px 0px"}}>Aki Notes</h4>
        </div>
        <div className={`navbar-link-div${location.pathname==="/"? "-active": ""}`}>
            <Link to="/" className={`navbar-link${location.pathname==="/"? "-active": ""}`}>Home</Link>
        </div>
        <div className={`navbar-link-div${location.pathname==="/notes"? "-active": ""}`}>
            <Link to="/notes" className={`navbar-link${location.pathname==="/notes"? "-active": ""}`}>Notes</Link>
        </div>
        <div className={`navbar-link-div${location.pathname==="/todolists"? "-active": ""}`}>
            <Link to="/todolists" className={`navbar-link${location.pathname==="/todolists"? "-active": ""}`}>To-Do Lists</Link>
        </div>
        <div className={`navbar-link-div${location.pathname==="/bulletjournal"? "-active": ""}`}>
            <Link to="/bulletjournal" className={`navbar-link${location.pathname==="/bulletjournal"? "-active": ""}`}>Bullet Journal</Link>
        </div>
        <div className={`navbar-link-div${location.pathname==="/tracker"? "-active": ""}`}>
            <Link to="/tracker" className={`navbar-link${location.pathname==="/tracker"? "-active": ""}`}>Tracker</Link>
        </div>
    </div>
  );
}
