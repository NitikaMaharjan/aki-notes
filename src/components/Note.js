import React, { useContext } from 'react';
import NoteContext from "../context/notes/NoteContext";
import NoteItem from './NoteItem';

export default function Note() {
    const {notes, setNotes} = useContext(NoteContext);
    return (
        <div>
            <h4>Your Notes</h4>
            <div className="notes-collection">
                {notes.map((note)=>{
                    return <NoteItem key={note._id} note={note}/>
                })}
            </div>
        </div>
    )
}
