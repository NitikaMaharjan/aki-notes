import  { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router";
import CursorContext from "../context/cursor/CursorContext";
import ThemeContext from "../context/theme/ThemeContext";
import ProgressContext from '../context/progress/ProgressContext';
import AlertContext from '../context/alert/AlertContext';
import UserContext from '../context/user/UserContext';

export default function Login() {

  let navigate = useNavigate();
  
  const {handleCursorEnter, handleCursorLeave} = useContext(CursorContext);
  const {theme} = useContext(ThemeContext);
  const {showProgress} = useContext(ProgressContext);
  const {showAlert} = useContext(AlertContext);
  const {fetchUserInfo} = useContext(UserContext);
  
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) =>{
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    const json = await response.json();
    if (json.success){
        // Saving the auth token and redirect to home
        localStorage.setItem("token", json.authtoken); 
        await fetchUserInfo();
        handleCursorLeave();
        navigate("/");
        showAlert();
    }
    else{
        alert("Invalid credentials");
    }
  }

  useEffect(() => {    
    showProgress();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="content" style={{color: `${theme==="light"?"black":"white"}`}}>
      <h5 style={{textAlign: "center"}}>Welcome Back!</h5>
      <div className="add-note-form">
        <div style={{padding: "20px", width: "600px", backgroundColor: `${theme==="light"?"white":"#212529"}`, border: `${theme==="light"?"1px solid rgba(0, 0, 0, 0.15)":"1px solid #424549"}`, borderRadius: "6px", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.15)"}}>
          <form data-bs-theme={`${theme==="light"?"light":"dark"}`}>
            <div className="form-group mb-1">
                <label htmlFor="email" className="mb-1" style={{fontWeight: "500"}}>Email</label>
                <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" onChange={handleChange} autoComplete="true"/>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="password" className="mb-1" style={{fontWeight: "500"}}>Password</label>
                <input type="password" className="form-control" id="password" name="password" placeholder="Enter password" onChange={handleChange} autoComplete="true"/>
            </div>
            <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                <button type="submit" className="add-note-btn" onClick={handleSubmit} onMouseEnter={handleCursorEnter} onMouseLeave={handleCursorLeave}>Log in</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
