import './App.css';
import React, { useState } from 'react';
import NoteState from "./context/notes/NoteState";
import ThemeState from "./context/theme/ThemeState";
import { BrowserRouter, Routes, Route } from "react-router";
import SideNavbar from './components/SideNavbar';
import TopNavbar from './components/TopNavbar';
import Home from './components/Home';
import Notes from './components/Notes';
import ToDo from './components/ToDo';
import BulletJournal from './components/BulletJournal';
import Tracker from './components/Tracker';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {

  const [iconSrc, setIconSrc] = useState({
      src: "/icons/sun.png",
      alt: "light"
    });

  const ChangeTheme = () =>{
    if (iconSrc.alt==="light"){
      setIconSrc({
        src: "/icons/moon.png",
        alt: "dark"
      });
      document.body.style.backgroundColor= "#0e1011";
    }else{
      setIconSrc({
        src: "/icons/sun.png",
        alt: "light"
      });
      document.body.style.backgroundColor= "rgb(247, 247, 247)";
    }
  }

  return (
    <>
      <ThemeState theme={iconSrc.alt}> 
        <NoteState>
          <BrowserRouter>
            <div style={{display: "flex"}}>
              <div className="side-navbar">
                <SideNavbar/>
              </div>
              <div className="top-navbar" style={{backgroundColor: `${iconSrc.alt==="light"?"rgb(247, 247, 247)":"#0e1011"}`}}>
                <TopNavbar src={iconSrc.src} alt={iconSrc.alt} ChangeTheme={ChangeTheme}/>
              </div>
            </div>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/notes' element={<Notes/>}/>
              <Route path='/todolists' element={<ToDo/>}/>
              <Route path='/bulletjournal' element={<BulletJournal/>}/>
              <Route path='/tracker' element={<Tracker/>}/>
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/login' element={<Login/>}/>
            </Routes>
          </BrowserRouter>
        </NoteState>
      </ThemeState>  
    </>
  );
}

export default App;
