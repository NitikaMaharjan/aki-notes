import React, { useContext } from 'react';
import ThemeContext from "../context/theme/ThemeContext";

export default function NoteItem(props) {
  const theme = useContext(ThemeContext);
  return (
    <div className="card" data-bs-theme={`${theme=="light"?"light":"dark"}`}>
        <div className="card-body">
            <h5 className="card-title" style={{color: `${theme=="light"?"black":"white"}`}}>{props.note.title}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">{props.note.tag}</h6>
            <p className="card-text">{props.note.description}</p>
        </div>
    </div>
  )
}
