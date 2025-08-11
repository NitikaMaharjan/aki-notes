import React, { useState, useContext } from 'react';
import NoteContext from "../context/notes/NoteContext";
import NoteItem from './NoteItem';

export default function Note() {
    const {notes, setNotes} = useContext(NoteContext);
    const [selectedNote, setSelectedNote] = useState(null);
    
    const OpenModal = (note) => {
        setSelectedNote(note);
        const modal = new window.bootstrap.Modal(document.getElementById("exampleModal"));
        modal.show();
    };
    return (
        <>
            <h5 style={{margin: "24px 0px 0px 0px",padding: "0px", textAlign: "center"}}>Your Notes</h5>
            <div className="notes-collection">
                {notes.map((note)=>{
                    return <NoteItem key={note._id} note={note} OpenModal={() => OpenModal(note)}/>
                })}
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">{selectedNote?.title}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    {selectedNote?.description}
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}
