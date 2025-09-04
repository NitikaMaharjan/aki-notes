import  { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router";
import CursorContext from "../context/cursor/CursorContext";
import ThemeContext from "../context/theme/ThemeContext";
import ProgressContext from '../context/progress/ProgressContext';
import AlertContext from '../context/alert/AlertContext';

export default function Signup() {
  
  let navigate = useNavigate();
  
  const {handleCursorEnter, handleCursorLeave} = useContext(CursorContext);
  const {theme} = useContext(ThemeContext);
  const {showProgress} = useContext(ProgressContext);
  const {showAlert} = useContext(AlertContext);

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: ""
  });
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  const handleChange = (e) =>{
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  const changePasswordType = () => {
    if(passwordType==="password"){
      setPasswordType("text");
    }else{
      setPasswordType("password");
    }
  }
  
  const changeConfirmPasswordType = () => {
    if(confirmPasswordType==="password"){
      setConfirmPasswordType("text");
    }else{
      setConfirmPasswordType("password");
    }
  }

  const clearText = (input) => {
    switch (input){
      case "name":
        setCredentials({
          name: "",
          email: credentials.email,
          password: credentials.password,
          confirm_password: credentials.confirm_password
        });
        break;
      case "email":
        setCredentials({
          name: credentials.name,
          email: "",
          password: credentials.password,
          confirm_password: credentials.confirm_password
        });
        break;
      case "password":
        setCredentials({
          name: credentials.name,
          email: credentials.email,
          password: "",
          confirm_password: credentials.confirm_password
        });
        break;
      case "confirm password":
        setCredentials({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          confirm_password: ""
        });
        break;
      default:
        setCredentials({
          name: "",
          email: "",
          password: "",
          confirm_password: ""
        });
        break;
    }
  }

  const clientSideValidation = () => {
    if(credentials.name==="" && credentials.email!=="" && credentials.password!=="" && credentials.confirm_password!==""){
      showAlert("warning", "Name is required. Please try again!");
      return false;
    }else if(credentials.name!=="" && credentials.email==="" && credentials.password!=="" && credentials.confirm_password!==""){
      showAlert("warning", "Email is required. Please try again!");
      return false;
    }else if(credentials.name!=="" && credentials.email!=="" && credentials.password==="" && credentials.confirm_password!==""){
      showAlert("warning", "Password is required. Please try again!");
      return false;
    }else if(credentials.name!=="" && credentials.email!=="" && credentials.password!=="" && credentials.confirm_password===""){
      showAlert("warning", "Confirm Password is required. Please try again!");
      return false;
    }else if (credentials.name==="" || credentials.email==="" || credentials.password==="" || credentials.confirm_password===""){
      showAlert("warning", "Please enter your credentials to sign up!");
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
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
      });
      const json = await response.json();
      if (json.success){
          handleCursorLeave();
          navigate("/login");
          showAlert("success", "Your account is ready!");
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
    <div className="content" style={{color: `${theme==="light"?"black":"white"}`, paddingTop: "10px"}}>
      <h5 style={{textAlign: "center"}}>Create your account to get started!</h5>
      <div className="add-note-form">
        <div style={{padding: "20px", width: "400px", backgroundColor: `${theme==="light"?"white":"#212529"}`, border: `${theme==="light"?"1px solid rgba(0, 0, 0, 0.15)":"1px solid #424549"}`, borderRadius: "6px", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.15)"}}>
          <form data-bs-theme={`${theme==="light"?"light":"dark"}`}>
            <div className="form-group mb-2">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <img src={`${theme==="light"?"/icons/user_black.png":"/icons/user_white.png"}`} height="18px" width="19px" alt="user icon"/>
                  <label htmlFor="name" style={{fontWeight: "500"}}>Name</label>
                </div>
                <div className="d-flex align-items-center">
                  <input type="text" className="form-control" id="name" name="name" placeholder="Enter Name" onChange={handleChange} autoComplete="true" value={credentials.name}/>
                  <img src={`${theme==="light"?"/icons/close.png":"/icons/close2.png"}`} height="18px" width="18px" alt="close icon" onClick={()=>{clearText("name");}} style={{margin: "0px 2px 0px 6px", opacity: `${credentials.name===""?"0":"1"}`}}/>
                </div>
            </div>
            <div className="form-group mb-2">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <img src={`${theme==="light"?"/icons/email_black.png":"/icons/email_white.png"}`} height="20px" width="20px" alt="email icon"/>
                  <label htmlFor="email" style={{fontWeight: "500"}}>Email</label>
                </div>
                <div className="d-flex align-items-center">
                  <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" onChange={handleChange} autoComplete="true" value={credentials.email}/>
                  <img src={`${theme==="light"?"/icons/close.png":"/icons/close2.png"}`} height="18px" width="18px" alt="close icon" onClick={()=>{clearText("email");}} style={{margin: "0px 2px 0px 6px", opacity: `${credentials.email===""?"0":"1"}`}}/>
                </div>
            </div>
            <div className="form-group mb-2">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <img src={`${passwordType==="password"?theme==="light"?"/icons/eye_hide_black.png":"/icons/eye_hide_white.png":theme==="light"?"/icons/eye_black.png":"/icons/eye_white.png"}`} height="20px" width="20px" alt="eye icon" onClick={changePasswordType}/>
                  <label htmlFor="password" style={{fontWeight: "500"}}>Password</label>
                </div>
                <div className="d-flex align-items-center">
                  <input type={passwordType} className="form-control" id="password" name="password" placeholder="Enter password" onChange={handleChange} autoComplete="true" value={credentials.password}/>
                  <img src={`${theme==="light"?"/icons/close.png":"/icons/close2.png"}`} height="18px" width="18px" alt="close icon" onClick={()=>{clearText("password");}} style={{margin: "0px 2px 0px 6px", opacity: `${credentials.password===""?"0":"1"}`}}/>
                </div>
                
            </div>
            <div className="form-group mb-3">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <img src={`${confirmPasswordType==="password"?theme==="light"?"/icons/eye_hide_black.png":"/icons/eye_hide_white.png":theme==="light"?"/icons/eye_black.png":"/icons/eye_white.png"}`} height="20px" width="20px" alt="eye icon" onClick={changeConfirmPasswordType}/>
                  <label htmlFor="confirm_password" style={{fontWeight: "500"}}>Confirm Password</label>
                </div>
                <div className="d-flex align-items-center">
                  <input type={confirmPasswordType} className="form-control" id="confirm_password" name="confirm_password" placeholder="Enter confirm password" onChange={handleChange} autoComplete="true" value={credentials.confirm_password}/>
                  <img src={`${theme==="light"?"/icons/close.png":"/icons/close2.png"}`} height="18px" width="18px" alt="close icon" onClick={()=>{clearText("confirm password");}} style={{margin: "0px 2px 0px 6px", opacity: `${credentials.confirm_password===""?"0":"1"}`}}/>
                </div>
            </div>
            <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                <button type="submit" className="add-note-btn" onClick={handleSubmit} onMouseEnter={handleCursorEnter} onMouseLeave={handleCursorLeave}>Sign up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
