import React,  { useEffect, useContext } from 'react';
import ThemeContext from "../context/theme/ThemeContext";
import { useNavigate } from 'react-router';

export default function ToDo() {

  const {theme} = useContext(ThemeContext);
  let navigate = useNavigate();

  useEffect(() => {
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
