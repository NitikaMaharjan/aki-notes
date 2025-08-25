import React, { useState, useEffect, useContext } from 'react';
import ThemeContext from "../context/theme/ThemeContext";
import { useNavigate } from 'react-router';
import ShowNote from './ShowNote';
import AddNote from './AddNote';

export default function Notes() {
  
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
    <div className="content" style={{color: `${theme==="light"?"black":"white"}`}}>
      {switchContent==="yourNotes"?
        <div>
          <ShowNote/>
          <button className="add-note-btn" onClick={() => {ChangeContent(2)}} style={{position: "fixed", bottom: "32px", right: "36px", zIndex: "1"}}>+ Add Note</button>
        </div>
      : 
        <div>
          <button className={`notes-btn${theme==="light"?"":"-dark"}${switchContent==="yourNotes"?"-active":""}`} onClick={() => {ChangeContent(1)}}>Back</button>
          <AddNote/>
        </div>
      }
    </div>
  )
}
