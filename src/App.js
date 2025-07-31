import './App.css';
import NoteState from "./context/notes/NoteState";
import { BrowserRouter, Routes, Route } from "react-router";
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <>      
      <NoteState>
        {/* Every component inside <NoteState> becomes props.children and gets access to the context i.e state and updater function provided by context provider */}
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
