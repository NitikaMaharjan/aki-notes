import React, { useContext } from 'react';
import { Link, useLocation } from "react-router";
import ThemeContext from '../context/theme/ThemeContext';

export default function SideNavbar() {

    const theme = useContext(ThemeContext);

    const location = useLocation();
  
    return (
        <div style={{margin: "24px", padding: "12px", borderRadius: "12px", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.15)", backgroundColor: `${theme=="light"?"white":"#272a2b"}`}}>
            <div style={{borderBottom: "1px solid #bebebeff", marginBottom: "12px"}}>
                <h4 style={{margin: "0px 0px 12px 0px", color: `${theme=="light"?"black":"white"}`}}>Aki Notes</h4>
            </div>
                {theme=="light"?
                    <div>
                        <Link to="/" className={`navbar-link${location.pathname==="/"? "-active": ""}`}>
                            <div className={`navbar-link-div${location.pathname==="/"? "-active": ""}`}>
                                Home
                            </div>
                        </Link>
                        <Link to="/notes" className={`navbar-link${location.pathname==="/notes"? "-active": ""}`}>
                            <div className={`navbar-link-div${location.pathname==="/notes"? "-active": ""}`}>
                                Notes
                            </div>
                        </Link>
                        <Link to="/todolists" className={`navbar-link${location.pathname==="/todolists"? "-active": ""}`}>
                            <div className={`navbar-link-div${location.pathname==="/todolists"? "-active": ""}`}>
                                To-Do Lists
                            </div>
                        </Link>
                        <Link to="/bulletjournal" className={`navbar-link${location.pathname==="/bulletjournal"? "-active": ""}`}>
                            <div className={`navbar-link-div${location.pathname==="/bulletjournal"? "-active": ""}`}>
                                Bullet Journal
                            </div>
                        </Link>
                        <Link to="/tracker" className={`navbar-link${location.pathname==="/tracker"? "-active": ""}`}>
                            <div className={`navbar-link-div${location.pathname==="/tracker"? "-active": ""}`}>
                                Tracker
                            </div>
                        </Link>
                    </div>
                :
                    <div>
                        <Link to="/" className={`navbar-link-dark${location.pathname==="/"? "-active": ""}`}>
                            <div className={`navbar-link-dark-div${location.pathname==="/"? "-active": ""}`}>
                                Home
                            </div>
                        </Link>
                        <Link to="/notes" className={`navbar-link-dark${location.pathname==="/notes"? "-active": ""}`}>
                            <div className={`navbar-link-dark-div${location.pathname==="/notes"? "-active": ""}`}>
                                Notes
                            </div>
                        </Link>
                        <Link to="/todolists" className={`navbar-link-dark${location.pathname==="/todolists"? "-active": ""}`}>
                            <div className={`navbar-link-dark-div${location.pathname==="/todolists"? "-active": ""}`}>
                                To-Do Lists
                            </div>
                        </Link>
                        <Link to="/bulletjournal" className={`navbar-link-dark${location.pathname==="/bulletjournal"? "-active": ""}`}>
                            <div className={`navbar-link-dark-div${location.pathname==="/bulletjournal"? "-active": ""}`}>
                                Bullet Journal
                            </div>
                        </Link>
                        <Link to="/tracker" className={`navbar-link-dark${location.pathname==="/tracker"? "-active": ""}`}>
                            <div className={`navbar-link-dark-div${location.pathname==="/tracker"? "-active": ""}`}>
                                Tracker
                            </div>
                        </Link>
                    </div>
                }
        </div>
    );
}
