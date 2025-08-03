import React,  { useContext, useEffect } from 'react';
import NoteContext from "../context/notes/NoteContext";

export default function Home() {

  const valueFromNoteContext = useContext(NoteContext);

  useEffect(() => {  
    return () => {
      valueFromNoteContext.userInfoUpdate();
      // eslint-disable-next-line
    }
  }, [])
  
  return (
    <div className="content">
      hi this is {valueFromNoteContext.userInfo.name} {valueFromNoteContext.userInfo.age} years old.
    </div>
  )
}
