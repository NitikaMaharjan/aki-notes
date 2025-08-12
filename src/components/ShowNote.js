import React, { useState, useContext } from 'react';
import NoteContext from "../context/notes/NoteContext";
import NoteItem from './NoteItem';

export default function Note() {
    const {notes, setNotes} = useContext(NoteContext);
    const [selectedNote, setSelectedNote] = useState(null);
    const [date, setDate] = useState("");
    const [time, setTime] = useState(null);
    
    const OpenModal = (note) => {
        setSelectedNote(note);
        setDate(new Date(note.date.slice(0,10)));
        setTime(new Date(note.date));
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

            <div className="modal fade bd-example-modal-lg" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between" style={{border: "none"}}>
                            <h5 className="modal-title" id="exampleModalLabel">{selectedNote?.title}</h5>
                            <div>
                                <button className="modal-btn"><img src="/icons/edit.png" alt="edit" title="edit"/></button>
                                <button className="modal-btn"><img src="/icons/delete.png" alt="edit" title="delete"/></button>
                                <button className="modal-btn" data-bs-dismiss="modal" aria-label="Close"><img src="/icons/close.png" alt="edit" title="close"/></button>
                            </div>
                        </div>
                        <div style={{display: "flex", alignItems: "center", margin: "0px", padding: "0px 16px"}}>
                            <h6 style={{margin: "0px", padding: "0px", color: "#212529bf"}}>{selectedNote?.tag}</h6>
                            <h6 className="mx-2" style={{margin: "0px", padding: "0px", color: "#212529bf"}}>|</h6>
                            <p style={{margin: "0px", padding: "0px", color: "#212529bf"}}>{new Intl.DateTimeFormat('en-US', { year: 'numeric', day: 'numeric', month: 'short' }).format(date)}</p>                           
                            <h6 className="mx-2" style={{margin: "0px", padding: "0px", color: "#212529bf"}}>|</h6>
                            <p style={{margin: "0px", padding: "0px", color: "#212529bf"}}>{time?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                            <h6 className="mx-2" style={{margin: "0px", padding: "0px", color: "#212529bf"}}>|</h6>
                            <p style={{margin: "0px", padding: "0px", color: "#212529bf"}}>{selectedNote?.description.trim().length} characters</p>
                        </div>
                        <div className="modal-body">
                            {selectedNote?.description}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
