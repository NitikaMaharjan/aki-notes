import React, { useState, useContext } from 'react';
import ThemeContext from "../context/theme/ThemeContext";
import ShowNote from './ShowNote';
import AddNote from './AddNote';

export default function Notes() {
  const [switchContent, setSwitchContent] = useState({
    content: "yourNotes",
    state: "yourNotesActive"
  });

  const ChangeContent = (contentInfo) => {
    switch(contentInfo){
      case 1:
        setSwitchContent({
          content: "yourNotes",
          state: "yourNotesActive"
        });
        break;
      case 2:
        setSwitchContent({
          content: "addNote",
          state: "addNoteActive"
        });
        break;       
      }
  }
  
  const theme = useContext(ThemeContext);
  return (
    <div className="content" style={{color: `${theme=="light"?"black":"white"}`}}>
      {theme=="light"?
        <div>
          {/* <button onClick={ChangeContent("yourNotes")}>Your Notes</button> // this would execute the function instantly during rendering instead of on click causing infinite loop */}
          <button className={`notes-btn${switchContent.state=="yourNotesActive"?"-active":""}`} onClick={() => ChangeContent(1)}>Your Notes</button>{/* We wrap it in an arrow function so it doesn’t run immediately when the component renders. It will run only when the click happens, not every render.*/}
          <button className={`notes-btn${switchContent.state=="addNoteActive"?"-active":""} mx-3`} onClick={() => ChangeContent(2)}>Add Note</button>
        </div>
      :
        <div>
          <button className={`notes-btn-dark${switchContent.state=="yourNotesActive"?"-active":""}`} onClick={() => ChangeContent(1)}>Your Notes</button>
          <button className={`notes-btn-dark${switchContent.state=="addNoteActive"?"-active":""} mx-3`} onClick={() => ChangeContent(2)}>Add Note</button>
        </div>
      }
      {switchContent.content=="yourNotes"?
        <ShowNote/>
      :
        <AddNote/>
      }
    </div>
  )
}
