import React, { useState, useEffect, useContext } from 'react';
import NoteContext from "../context/notes/NoteContext";
import NoteItem from './NoteItem';

export default function Note() {
    const {notes, deleteNote, editNote} = useContext(NoteContext);
    const [selectedNote, setSelectedNote] = useState(null);
    const [modal, setModal] = useState(null);
    const [date, setDate] = useState("");
    const [time, setTime] = useState(null);
    const [note, setNote] = useState({
        _id: "",
        user: "",
        title: "",
        description: "",
        tag: "",
        date: "",
        __v: ""
    });
    
    const OpenModal = (note) => {
        setSelectedNote(note);
        setDate(new Date(note.date.slice(0,10)));
        setTime(new Date(note.date));
        const myModal = new window.bootstrap.Modal(document.getElementById("noteDetailModal"));
        setModal(myModal);
    };
    
    const OpenEditModal = () => {
        setNote({
            _id: selectedNote._id,
            user: selectedNote.user,
            title: selectedNote.title,
            description: selectedNote.description,
            tag: selectedNote.tag,
            date: selectedNote.date,
            __v: selectedNote.__v
        });
        const myModal = new window.bootstrap.Modal(document.getElementById("editModal"));
        setModal(myModal);
    };

    useEffect(() => {
      if(modal!=null){
        modal.show();
      }
    }, [modal]);

    const handleChange = (e) =>{
        setNote({...note, [e.target.name]: e.target.value});
    }

    const handleSubmit = ()=>{
        editNote(note._id, note.title, note.description, note.tag);
        modal.hide();
    }
    
    return (
        <>
            <h5 style={{margin: "24px 0px 0px 0px",padding: "0px", textAlign: "center"}}>Your Notes</h5>
            <div className="notes-collection">
                {notes.map((note)=>{
                    return <NoteItem key={note._id} note={note} OpenNoteDetailModal={() => OpenModal(note)}/>
                })}
            </div>

            <div className="modal fade bd-example-modal-lg" id="noteDetailModal" tabIndex="-1" role="dialog" aria-labelledby="noteDetailModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between" style={{border: "none"}}>
                            <h5 className="modal-title" id="noteDetailModalLabel">{selectedNote?.title}</h5>
                            <div>
                                <button className="modal-btn" onClick={()=>{modal.hide(); OpenEditModal();}}><img src="/icons/edit.png" alt="edit" title="edit"/></button>
                                <button className="modal-btn" onClick={()=>{deleteNote(selectedNote?._id); modal.hide();}}><img src="/icons/delete.png" alt="edit" title="delete"/></button>
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

            <div className="modal fade bd-example-modal-lg" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between" style={{border: "none"}}>
                            <input type="text" id="title" name="title" value={note.title} onChange={handleChange}/>
                            <div>
                                <button className="modal-btn" data-bs-dismiss="modal" aria-label="Close"><img src="/icons/close.png" alt="edit" title="close"/></button>
                            </div>
                        </div>
                        <div style={{display: "flex", alignItems: "center", margin: "0px", padding: "0px 16px"}}>
                            <input type="text" id="tag" name="tag" value={note.tag} onChange={handleChange}/>
                            <h6 className="mx-2" style={{margin: "0px", padding: "0px", color: "#212529bf"}}>|</h6>
                            <p style={{margin: "0px", padding: "0px", color: "#212529bf"}}>{new Intl.DateTimeFormat('en-US', { year: 'numeric', day: 'numeric', month: 'short' }).format(date)}</p>                           
                            <h6 className="mx-2" style={{margin: "0px", padding: "0px", color: "#212529bf"}}>|</h6>
                            <p style={{margin: "0px", padding: "0px", color: "#212529bf"}}>{time?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                            <h6 className="mx-2" style={{margin: "0px", padding: "0px", color: "#212529bf"}}>|</h6>
                            <p style={{margin: "0px", padding: "0px", color: "#212529bf"}}>{note.description.trim().length} characters</p>
                        </div>
                        <div className="modal-body">
                            <input type="text" id="description" name="description" value={note.description} onChange={handleChange}/>
                            <button onClick={handleSubmit}>Edit Note</button>
                        </div>                       
                    </div>
                </div>
            </div>
        </>
    )
}
