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
      <div>
        {/* <button onClick={ChangeContent(1)}>Your Notes</button> // this would execute the function instantly during rendering instead of on click causing infinite loop */}
        <button className={`notes-btn${theme==="light"?"":"-dark"}${switchContent==="yourNotes"?"-active":""}`} onClick={() => {ChangeContent(1)}}>Your Notes</button>{/* We wrap it in an arrow function so it doesn’t run immediately when the component renders. It will run only when the click happens, not every render.*/}
        <button className={`notes-btn${theme==="light"?"":"-dark"}${switchContent==="addNote"?"-active":""} mx-3`} onClick={() => {ChangeContent(2)}}>Add Note</button>
      </div>
      {switchContent==="yourNotes"?
        <ShowNote/>
      :
        <AddNote/>
      }
    </div>
  )
}
