import NoteContext from "./NoteContext";
import { useState } from "react";

export default function NoteState(props) {
    const host = "http://localhost:5000"; // our backend is running at port 5000
    const [notes, setNotes] = useState([]);

    const fetchNote = async()=>{
        const response = await fetch(`${host}/api/notes/getnote`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "authtoken": localStorage.getItem("token")
            }
        });
        const fetchedNotes = await response.json();
        setNotes(fetchedNotes);
    }

    const addNote = async(title, description, tag)=>{
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "authtoken": localStorage.getItem("token")
            },
            body: JSON.stringify({title: title===""?"Untitled":title, description, tag: tag === ""?"General":tag})
        });
        const new_note = await response.json();
        setNotes(notes.concat(new_note));
    }

    const editNote = async(id, title, description, tag)=>{
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "authtoken": localStorage.getItem("token")
            },
            body: JSON.stringify({title: title===""?"Untitled":title, description, tag: tag === ""?"General":tag})
        });
        const json = await response.json();
        console.log(json);
        setNotes(prevNotes =>
            prevNotes.map(note =>
            note._id === id ? {...note, title: title===""?"Untitled":title, description, tag: tag === ""?"General":tag} : note
            )
        );
    }

    const deleteNote = async(id)=>{
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "authtoken": localStorage.getItem("token")
            }
        });
        const json = await response.json();
        console.log(json);
        setNotes(notes.filter((note)=>{return note._id!==id}));
    }

    return(
        <NoteContext.Provider value={{ notes, fetchNote, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    );
}
