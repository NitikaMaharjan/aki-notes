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
    <div className="content" style={{color: `${theme==="light"?"black":"white"}`, padding: `0px ${switchContent==="yourNotes"?"24px":"0px"}`}}>
      {switchContent==="yourNotes"?
        <div>
          <ShowNote/>
          <button className="add-btn" onClick={() => {ChangeContent(2)}}><img src="/icons/add.png" height="12px" width="12px"/>&nbsp;&nbsp;Add Note</button>
        </div>
      : 
        <div>
          <button className={`notes-btn${theme==="light"?"":"-dark"}`} onClick={() => {ChangeContent(1)}}>Back</button>
          <AddNote/>
        </div>
      }
    </div>
  )
}
