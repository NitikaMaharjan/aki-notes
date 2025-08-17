import React, { useState, useContext } from 'react';
import ThemeContext from '../context/theme/ThemeContext';
import NoteContext from '../context/notes/NoteContext';

export default function AddNote() {
    const theme = useContext(ThemeContext);
    const {addNote} = useContext(NoteContext);
    
    const [note, setNote] = useState({
        title: "", 
        description: "", 
        tag: "Default"
    });

    const handleChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }

    return (
        <div className="add-note-form">
            <div style={{padding: "20px", width: "600px", backgroundColor: `${theme=="light"?"white":"#212529"}`, border: `${theme=="light"?"1px solid rgba(0, 0, 0, 0.15)":"1px solid #424549"}`, borderRadius: "6px", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.15)"}}>
                <form data-bs-theme={`${theme=="light"?"light":"dark"}`}>
                    <div className="form-group mb-1">
                        <label className="mb-1" style={{fontWeight: "500"}}>Title</label>
                        <input type="text" className="form-control" id="title" name="title" placeholder="Enter title" onChange={handleChange}/>
                    </div>
                    <div className="form-group mb-1">
                        <label className="mb-1" style={{fontWeight: "500"}}>Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" placeholder="Enter tag" onChange={handleChange}/>
                    </div>
                    <div className="form-group mb-3">
                        <label className="mb-1" style={{fontWeight: "500"}}>Description</label>
                        <textarea className="form-control" id="description" name="description" placeholder="Enter description" rows="3" onChange={handleChange}></textarea>
                    </div>
                    <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                        <button type="submit" className="add-note-btn" onClick={handleSubmit}>Add Note</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
