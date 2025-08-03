import './App.css';
import NoteState from "./context/notes/NoteState";
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from './components/Navbar';
import TopNavbar from './components/TopNavbar';
import Home from './components/Home';
import Notes from './components/Notes';
import ToDo from './components/ToDo';
import BulletJournal from './components/BulletJournal';
import Tracker from './components/Tracker';

function App() {
  return (
    <>      
      <NoteState>
        {/* Every component inside <NoteState> becomes props.children and gets access to the context i.e state and updater function provided by context provider */}
        <BrowserRouter>
        <div style={{display: "flex"}}>
          <div className="side-navbar">
            <Navbar/>
          </div>
          <div className="top-navbar">
            <TopNavbar/>
          </div>
        </div>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/notes' element={<Notes/>}/>
            <Route path='/todolists' element={<ToDo/>}/>
            <Route path='/bulletjournal' element={<BulletJournal/>}/>
            <Route path='/tracker' element={<Tracker/>}/>
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
