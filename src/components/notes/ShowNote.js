import { useState, useEffect, useContext } from 'react';
import CursorContext from "../../context/cursor/CursorContext";
import ThemeContext from '../../context/theme/ThemeContext';
import ProgressContext from '../../context/progress/ProgressContext';
import AlertContext from '../../context/alert/AlertContext';
import TextContext from '../../context/text/TextContext';
import NoteContext from "../../context/notes/NoteContext";
import Throbber from '../Throbber';
import NoteItem from './NoteItem';

export default function Note() {

    const {handleCursorEnter, handleCursorLeave} = useContext(CursorContext);
    const {theme} = useContext(ThemeContext);
    const {showProgress} = useContext(ProgressContext);
    const {showAlert} = useContext(AlertContext);
    const {handleCapitalizeFirstLetter, giveMeDay, giveMeTime, calculateCharacters, calculateWords} = useContext(TextContext);
    const {notes, fetchNote, deleteNote, editNote} = useContext(NoteContext);
    
    const [selectedNote, setSelectedNote] = useState({
        _id: "",
        user: "",
        title: "",
        description: "",
        tag: "",
        date: "",
        __v: ""
    });
    const [activeModal, setActiveModal] = useState(null);
    const [scroll, setScroll] = useState(false);
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState("");
    const [filterednotes, setFilteredNotes] = useState([]);
    
    const OpenNoteDetailModal = (note) => {
        setSelectedNote(note);
        const myModal = new window.bootstrap.Modal(document.getElementById("noteDetailModal"));
        setActiveModal(myModal);
    };
    
    const OpenEditModal = () => {
        const myModal = new window.bootstrap.Modal(document.getElementById("editModal"));
        setActiveModal(myModal);
    };

    const handleChange = (e) =>{
        setSelectedNote({...selectedNote, [e.target.name]: e.target.value});
    }

    const handleSubmit = async()=>{
        await editNote(selectedNote._id, selectedNote.title===""?"Untitled":selectedNote.title, selectedNote.description===""?" ":selectedNote.description, selectedNote.tag===""?"General":selectedNote.tag);
        await fetchNote();
        handleCursorLeave();
        activeModal.hide();
        showAlert("success", "Changes saved!");
    }

    const handleDeleteNote = (id) => {
        let ans = window.confirm("Are you sure?");
        if (ans) {
            deleteNote(id); 
            activeModal.hide(); 
            showAlert("success", "Note deleted successfully!");
        }
    }

    const handleKeywordChange = (e) =>{
        setKeyword(e.target.value);
        
        if(keyword.trim() !== ""){
            setFilteredNotes(notes.filter((note)=>{return note.title.toLowerCase().includes(keyword.toLowerCase()) || note.tag.toLowerCase().includes(keyword.toLowerCase()) || note.description.toLowerCase().includes(keyword.toLowerCase())}));
        }
    }

    const clearText = () => {
        setKeyword("");
    }

    useEffect(() => {
        if(localStorage.getItem("token")){
            fetchNote();
        }

        window.addEventListener("scroll", () => {
            if(window.scrollY){
                setScroll(true);
            }else{
                setScroll(false);
            }
        });

        // eslint-disable-next-line
    }, []);
    
    useEffect(() => {
        if(activeModal!=null){
            activeModal.show();
        }else{
            showProgress();
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
        // eslint-disable-next-line
    }, [activeModal]);
    
    return (
        <>  
            {notes.length === 0?
                <p style={{margin: "0px",padding: "40px 0px 0px 0px", textAlign: "center", color: `${theme==="light"?"#5e5959":"rgb(200, 200, 200)"}`}}>Want to share a quick thought? Tap on 'Add Note' to get started!</p>
            :
                <>
                    <div className="d-flex justify-content-center">
                        <form>
                            <div className="d-flex align-items-center" style={{width: "500px", padding: "6px 12px", borderRadius: "6px", backgroundColor: `${theme==="light"?"white":"#212529"}`, border: `${theme==="light"?"1px solid rgba(0, 0, 0, 0.15)":"1px solid #424549"}`}}> 
                                <img src="/icons/search.png" height="24px" width="24px" alt="search icon"/>&nbsp;&nbsp;
                                <input className="search-bar-input" placeholder="Search notes" value={keyword} onChange={handleKeywordChange} style={{backgroundColor: `${theme==="light"?"white":"#212529"}`, color: `${theme==="light"?"black":"white"}`}}/>&nbsp;&nbsp;
                                <img src="/icons/close3.png" height="14px" width="14px" alt="close icon" onClick={clearText} style={{opacity: `${keyword===""?"0":"1"}`}}/>
                            </div>
                        </form>
                    </div>
                    {loading?
                        <Throbber/>
                    :
                    <>
                        <div className="notes-collection">
                            {(keyword===""?notes:filterednotes).map((note)=>{
                                return <NoteItem key={note._id} note={note} OpenNoteDetailModal={() => OpenNoteDetailModal(note)}/>
                            })}
                        </div>
                        <div>
                            <a className={`up-arrow${scroll?"-show":""}`} href="#top" onMouseEnter={handleCursorEnter} onMouseLeave={handleCursorLeave}>&uarr;</a>
                        </div>
                    </>
                    }
                </>
            }

            <div className="modal fade bd-example-modal-lg" id="noteDetailModal" tabIndex="-1" role="dialog" aria-labelledby="noteDetailModalLabel" aria-hidden="true" data-bs-theme={`${theme==="light"?"light":"dark"}`}>
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between" style={{border: "none"}}>
                            <h5 className="modal-title" id="noteDetailModalLabel" style={{color: `${theme==="light"?"black":"white"}`}}>{selectedNote?.title}</h5>
                            <div>
                                <button className="modal-btn" onClick={()=>{activeModal.hide(); OpenEditModal();}}><img src={`${theme==="light"?"/icons/edit.png":"/icons/edit2.png"}`} alt="edit icon" title="edit"/></button>
                                <button className="modal-btn" onClick={()=>{handleDeleteNote(selectedNote?._id)}}><img src={`${theme==="light"?"/icons/delete.png":"/icons/delete2.png"}`} alt="delete icon" title="delete"/></button>
                                <button className="modal-btn" data-bs-dismiss="modal" aria-label="Close"><img src={`${theme==="light"?"/icons/close.png":"/icons/close2.png"}`} alt="close icon" title="close"/></button>
                            </div>
                        </div>
                        <div style={{display: "flex", alignItems: "center", margin: "0px", padding: "0px 16px"}}>
                            <h6 className="card-subtitle text-body-secondary" style={{margin: "0px", padding: "0px", color: "#212529bf"}}>{handleCapitalizeFirstLetter(selectedNote?.tag)}</h6>
                            <h6 className="card-subtitle text-body-secondary mx-2" style={{margin: "0px", padding: "0px", color: "#212529bf"}}>|</h6>
                            <p className="card-subtitle text-body-secondary" style={{margin: "0px", padding: "0px", color: "#212529bf"}}>{giveMeDay(selectedNote?.date)}</p>                           
                            <h6 className="card-subtitle text-body-secondary mx-2" style={{margin: "0px", padding: "0px", color: "#212529bf"}}>|</h6>
                            <p className="card-subtitle text-body-secondary" style={{margin: "0px", padding: "0px", color: "#212529bf"}}>{giveMeTime(selectedNote?.date)}</p>
                            <h6 className="card-subtitle text-body-secondary mx-2" style={{margin: "0px", padding: "0px", color: "#212529bf"}}>|</h6>
                            <p className="card-subtitle text-body-secondary" style={{margin: "0px", padding: "0px", color: "#212529bf"}}>{calculateCharacters(selectedNote?.description)}</p>
                            <h6 className="card-subtitle text-body-secondary mx-2" style={{margin: "0px", padding: "0px", color: "#212529bf"}}>|</h6>
                            <p className="card-subtitle text-body-secondary" style={{margin: "0px", padding: "0px", color: "#212529bf"}}>{calculateWords(selectedNote?.description)}</p>
                        </div>
                        <div className="modal-body">
                            {selectedNote?.description}
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade bd-example-modal-lg" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true" data-bs-theme={`${theme==="light"?"light":"dark"}`}>
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header justify-content-end" style={{border: "none", paddingBottom: "0px"}}>
                            <button className="modal-btn" data-bs-dismiss="modal" aria-label="Close"><img src={`${theme==="light"?"/icons/close.png":"/icons/close2.png"}`} alt="edit" title="close"/></button>
                        </div>
                        <div className="modal-body" style={{paddingTop: "0px", paddingBottom: "6px"}}>
                            <label htmlFor="title" className="mb-1" style={{fontWeight: "500"}}>Title</label>
                            <input type="text" className="form-control" id="title" name="title" value={selectedNote.title} placeholder="Enter title" onChange={handleChange} autoComplete="true"/>
                        </div>
                        <div className="modal-body" style={{paddingTop: "0px", paddingBottom: "6px"}}>
                            <label htmlFor="tag" className="mb-1" style={{fontWeight: "500"}}>Tag</label>
                            <input type="text" className="form-control" id="tag" name="tag" value={selectedNote.tag} placeholder="Enter tag" onChange={handleChange} autoComplete="true"/>
                        </div>
                        <div className="modal-body" style={{paddingTop: "0px", paddingBottom: "6px"}}>
                            <label htmlFor="description" className="mb-1" style={{fontWeight: "500"}}>Description</label>
                            <textarea className="form-control" id="description" name="description" value={selectedNote.description} placeholder="Enter description" rows="3" onChange={handleChange} autoComplete="true"></textarea>                          
                        </div>                       
                        <div className="modal-body" style={{display: "flex", justifyContent: "center", paddingTop: "4px"}}>
                            <button className="add-note-btn" onClick={handleSubmit} onMouseEnter={handleCursorEnter} onMouseLeave={handleCursorLeave}>Edit Note</button>
                        </div>                       
                    </div>
                </div>
            </div>
        </>
    )
}
