import React, { useState, useEffect, useContext } from 'react';
import CursorContext from "../context/cursor/CursorContext";
import ThemeContext from "../context/theme/ThemeContext";
import { useNavigate } from 'react-router';
import ShowNote from './ShowNote';
import AddNote from './AddNote';

export default function Notes() {
  
  const {handleCursorEnter, handleCursorLeave} = useContext(CursorContext);
  const {theme} = useContext(ThemeContext);
  const [switchContent, setSwitchContent] = useState(localStorage.getItem("activeContent")?localStorage.getItem("activeContent"):"yourNotes");
  let navigate = useNavigate();
  
  useEffect(() => {
    if (!localStorage.getItem("token")){
      navigate("/login");
    }
    // eslint-disable-next-line
  },[]);  

  const ChangeContent = (contentInfo) => {
    switch(contentInfo){
      case 1:
        localStorage.setItem("activeContent", "yourNotes");
        break;
      case 2:
        localStorage.setItem("activeContent", "addNote");
        break;
      default:
        localStorage.setItem("activeContent", "yourNotes");
        break;      
    }
    setSwitchContent(localStorage.getItem("activeContent"));
  }
  
  return (
    <div className="content" style={{color: `${theme==="light"?"black":"white"}`, padding: `0px ${switchContent==="yourNotes"?"24px":"0px"}`}}>
      {switchContent==="yourNotes"?
        <div>
          <ShowNote/>
          <button className="add-btn" onClick={() => {ChangeContent(2)}} onMouseEnter={handleCursorEnter} onMouseLeave={handleCursorLeave}>&#43;&nbsp;&nbsp;Add Note</button>
        </div>
      : 
        <div>
          <button className={`back-btn${theme==="light"?"":"-dark"}`} onClick={() => {ChangeContent(1)}}>Back</button>
          <AddNote/>
        </div>
      }
    </div>
  )
}
