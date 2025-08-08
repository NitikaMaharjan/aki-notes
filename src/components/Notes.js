import React, { useContext } from 'react';
import ThemeContext from "../context/theme/ThemeContext";
import Note from './Note';

export default function Notes() {
  const theme = useContext(ThemeContext);
  return (
    <div className="content" style={{color: `${theme=="light"?"black":"white"}`}}>
      <Note/>
    </div>
  )
}
