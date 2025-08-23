import './App.css';
import React, { useContext } from 'react';
import ThemeContext from './context/theme/ThemeContext';
import UserState from './context/user/UserState';
import TextState from './context/text/TextState';
import NoteState from "./context/notes/NoteState";
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

  const {theme} = useContext(ThemeContext);
  document.body.style.backgroundColor= localStorage.getItem("bgColor")?localStorage.getItem("bgColor"):"rgb(247, 247, 247)";

  const form_contorl_style = document.createElement("style");
  form_contorl_style.textContent = `
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
      -webkit-box-shadow: 0 0 0px 1000px ${theme==="light"?"white":"#212529"} inset !important;
    }
  `;
  document.head.appendChild(form_contorl_style);

  return (
    <>
      <UserState>
        <TextState>
          <NoteState>
            <BrowserRouter>
              <div style={{display: "flex"}}>
                <div className="side-navbar">
                  <SideNavbar/>
                </div>
                <div className="top-navbar" style={{backgroundColor: `${theme==="light"?"rgb(247, 247, 247)":"#0e1011"}`}}>
                  <TopNavbar/>
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
        </TextState>
      </UserState> 
    </>
  );
}

export default App;
