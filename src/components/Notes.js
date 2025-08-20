import React, { useState, useContext } from 'react';
import ThemeContext from "../context/theme/ThemeContext";
import ShowNote from './ShowNote';
import AddNote from './AddNote';

export default function Notes() {
  const [switchContent, setSwitchContent] = useState(localStorage.getItem("activeContent")?localStorage.getItem("activeContent"):"yourNotes");

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
  
  const {theme} = useContext(ThemeContext);
  return (
    <div className="content" style={{color: `${theme==="light"?"black":"white"}`}}>
      {theme==="light"?
        <div>
          {/* <button onClick={ChangeContent(1)}>Your Notes</button> // this would execute the function instantly during rendering instead of on click causing infinite loop */}
          <button className={`notes-btn${switchContent==="yourNotes"?"-active":""}`} onClick={() => ChangeContent(1)}>Your Notes</button>{/* We wrap it in an arrow function so it doesn’t run immediately when the component renders. It will run only when the click happens, not every render.*/}
          <button className={`notes-btn${switchContent==="addNote"?"-active":""} mx-3`} onClick={() => ChangeContent(2)}>Add Note</button>
        </div>
      :
        <div>
          <button className={`notes-btn-dark${switchContent==="yourNotes"?"-active":""}`} onClick={() => ChangeContent(1)}>Your Notes</button>
          <button className={`notes-btn-dark${switchContent==="addNote"?"-active":""} mx-3`} onClick={() => ChangeContent(2)}>Add Note</button>
        </div>
      }
      {switchContent==="yourNotes"?
        <ShowNote/>
      :
        <AddNote/>
      }
    </div>
  )
}
