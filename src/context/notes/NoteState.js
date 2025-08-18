import NoteContext from "./NoteContext";
import { useState } from "react";

export default function NoteState(props) {
    const host = "http://localhost:5000"; // our backend is running at port 5000
    const allNotes = [];
    const [notes, setNotes] = useState(allNotes);

    const fetchNote = async()=>{
        const response = await fetch(`${host}/api/notes/getnote`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
            }
        });
        const json = await response.json();
        setNotes(json);
    }

    const addNote = async(title, description, tag)=>{
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
            },
            body: JSON.stringify({title, description, tag})
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }

    const deleteNote = async(id)=>{
        // const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        //     method: 'DELETE',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
        //     }
        // });
        // const json = await response.json();
        setNotes(notes.filter((note)=>{return note._id!==id}));
    }

    const editNote = async(id, title, description, tag)=>{
        // const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
        //     },
        //     body: JSON.stringify({title, description, tag})
        // });
        // const json = await response.json();
        setNotes(prevNotes =>
            prevNotes.map(note =>
            note._id === id ? {...note, title, description, tag: tag === ""?"Default":tag} : note
            )
        );
    }

    return (
        <NoteContext.Provider value={{ notes, fetchNote, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    );
}
