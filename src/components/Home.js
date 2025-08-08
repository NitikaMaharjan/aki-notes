import React,  { useContext, useEffect } from 'react';
import ThemeContext from "../context/theme/ThemeContext";

export default function Home() {

  const theme = useContext(ThemeContext);
  
  return (
    <div className="content" style={{color: `${theme=="light"?"black":"white"}`}}>
      This is home page.
    </div>
  )
}
