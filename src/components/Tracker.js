import React,  { useEffect, useContext } from 'react';
import ProgressContext from '../context/progress/ProgressContext';
import ThemeContext from "../context/theme/ThemeContext";
import { useNavigate } from 'react-router';

export default function Tracker() {

  const {showProgress} = useContext(ProgressContext);
  const {theme} = useContext(ThemeContext);
  let navigate = useNavigate();

  useEffect(() => {
    showProgress();
    if (!localStorage.getItem("token")){
      navigate("/login");
    }
    // eslint-disable-next-line
  },[]);  
  
  return (
    <div className="content" style={{color: `${theme==="light"?"black":"white"}`}}>
      WIP
    </div>
  )
}
