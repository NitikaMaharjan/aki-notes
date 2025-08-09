import React, { useContext } from 'react';
import NoteContext from "../context/notes/NoteContext";
import NoteItem from './NoteItem';

export default function Note() {
    const {notes, setNotes} = useContext(NoteContext);
    return (
        <>
            <h5 style={{margin: "24px 0px 0px 0px",padding: "0px", textAlign: "center"}}>Your Notes</h5>
            <div className="notes-collection">
                {notes.map((note)=>{
                    return <NoteItem key={note._id} note={note}/>
                })}
            </div>
        </>
    )
}
