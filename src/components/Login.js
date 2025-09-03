import  { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router";
import CursorContext from "../context/cursor/CursorContext";
import ThemeContext from "../context/theme/ThemeContext";
import ProgressContext from '../context/progress/ProgressContext';
import AlertContext from '../context/alert/AlertContext';
import UserContext from '../context/user/UserContext';
import TextContext from '../context/text/TextContext';

export default function Login() {

  let navigate = useNavigate();
  
  const {handleCursorEnter, handleCursorLeave} = useContext(CursorContext);
  const {theme} = useContext(ThemeContext);
  const {showProgress} = useContext(ProgressContext);
  const {showAlert} = useContext(AlertContext);
  const {fetchUserInfo} = useContext(UserContext);
  const {handleCapitalizeFirstLetter} = useContext(TextContext);
  
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) =>{
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  const clearText = (input) => {
    switch (input){
      case "email":
        setCredentials({
          email: "",
          password: credentials.password
        });
        break;
      case "password":
        setCredentials({
          email: credentials.email,
          password: ""
        });
        break;
      default:
        setCredentials({
          email: "",
          password: ""
        });
        break;
    }
  }

  const clientSideValidation = () => {
    if (credentials.email==="" && credentials.password===""){
      showAlert("warning", "Please enter your credentials to log in!");
      return false;
    }else if(credentials.email==="" && credentials.password!==""){
      showAlert("warning", "Email is required. Please try again!");
      return false;
    }else if(credentials.email!=="" && credentials.password===""){
      showAlert("warning", "Password is required. Please try again!");
      return false;
    }else if(!document.getElementById("email").checkValidity()){
      showAlert("warning", "Please enter a valid email address!");
      return false;
    }
    return true;
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    if(clientSideValidation()){
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
          showAlert("success", "Welcome back, " + handleCapitalizeFirstLetter(localStorage.getItem("username")) + "!");
      }
      else{
          showAlert("fail", "Invalid credentials. Please try again!");
      }
    }
  }

  useEffect(() => {    
    showProgress();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="content" style={{color: `${theme==="light"?"black":"white"}`}}>
      <h5 style={{textAlign: "center"}}>Hey there, welcome back!</h5>
      <div className="add-note-form">
        <div style={{padding: "20px", width: "600px", backgroundColor: `${theme==="light"?"white":"#212529"}`, border: `${theme==="light"?"1px solid rgba(0, 0, 0, 0.15)":"1px solid #424549"}`, borderRadius: "6px", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.15)"}}>
          <form data-bs-theme={`${theme==="light"?"light":"dark"}`}>
            <div className="form-group mb-1">
                <label htmlFor="email" className="mb-1" style={{fontWeight: "500"}}>Email</label>
                <div className="d-flex align-items-center">
                  <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" onChange={handleChange} autoComplete="true" value={credentials.email}/>
                  <img src={`${theme==="light"?"/icons/close.png":"/icons/close2.png"}`} height="18px" width="18px" alt="close icon" onClick={()=>{clearText("email");}} style={{margin: "0px 4px 0px 12px", opacity: `${credentials.email===""?"0":"1"}`}}/>
                </div>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="password" className="mb-1" style={{fontWeight: "500"}} value={credentials.password}>Password</label>
                <div className="d-flex align-items-center">
                  <input type="password" className="form-control" id="password" name="password" placeholder="Enter password" onChange={handleChange} autoComplete="true" value={credentials.password}/>
                  <img src={`${theme==="light"?"/icons/close.png":"/icons/close2.png"}`} height="18px" width="18px" alt="close icon" onClick={()=>{clearText("password");}} style={{margin: "0px 4px 0px 12px", opacity: `${credentials.password===""?"0":"1"}`}}/>
                </div>
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
