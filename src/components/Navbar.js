import React from 'react';
import { Link } from "react-router";

export default function Navbar() {
  return (
    <div className="side-navbar">
        <div style={{borderBottom: "1px solid #dee2e6", marginBottom: "12px"}}>
            <h4 style={{margin: "0px 0px 18px 0px"}}>Aki Notes</h4>
        </div>
        <div style={{marginBottom: "8px"}}>
            <Link to="/" className="navbar-link">Home</Link>
        </div>
        <div style={{marginBottom: "8px"}}>
            <Link to="/about" className="navbar-link">About</Link>
        </div>
    </div>
  );
}
