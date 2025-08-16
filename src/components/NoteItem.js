import React, { useContext } from 'react';
import ThemeContext from "../context/theme/ThemeContext";

export default function NoteItem(props) {
  const theme = useContext(ThemeContext);
  const date = new Date(props.note.date.slice(0,10));

  return (
    <>
      <div className="card" data-bs-theme={`${theme=="light"?"light":"dark"}`} style={{cursor: "pointer", width: "100%", height: "192px"}} onClick={props.OpenNoteDetailModal}>
          <div className="card-body">
              <h5 className="card-title" style={{color: `${theme=="light"?"black":"white"}`}}>{props.note.title.length<=18?props.note.title:props.note.title.slice(0,18)+"..."}</h5>
              <div className="mb-2" style={{display: "flex"}}>
                <p className="card-subtitle text-body-secondary" style={{margin: "0px", padding: "0px", fontSize: "14px", fontWeight: "500"}}>{props.note.tag}</p>
                <p className="card-subtitle text-body-secondary mx-1" style={{margin: "0px", padding: "0px", fontSize: "14px"}}>|</p>
                <p className="card-subtitle text-body-secondary" style={{margin: "0px", padding: "0px", fontSize: "14px"}}>{new Intl.DateTimeFormat('en-US', { year: 'numeric', day: 'numeric', month: 'short' }).format(date)}</p>
              </div>
              <p className="card-text">{props.note.description.length<=100?props.note.description:props.note.description.slice(0,100)+"..."}</p>
          </div>
      </div>
  </>
  )
}
