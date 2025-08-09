import React, { useContext } from 'react';
import ThemeContext from "../context/theme/ThemeContext";

export default function NoteItem(props) {
  const theme = useContext(ThemeContext);
  const date = new Date(props.note.date.slice(0,10));
  return (
    <div className="card" data-bs-theme={`${theme=="light"?"light":"dark"}`} style={{cursor: "pointer"}}>
        <div className="card-body">
            <h5 className="card-title" style={{color: `${theme=="light"?"black":"white"}`}}>{props.note.title.length<=18?props.note.title:props.note.title.slice(0,18)+"..."}</h5>
            <h6 className="card-subtitle my-2 text-body-secondary">{props.note.tag}</h6>
            <p className="card-subtitle my-2 text-body-secondary">{props.note.description.length<=100?props.note.description:props.note.description.slice(0,100)+"..."}</p>
            <p className="card-subtitle text-body-secondary">{new Intl.DateTimeFormat('en-US', { year: 'numeric', day: 'numeric', month: 'short' }).format(date)}</p>
        </div>
    </div>
  )
}
