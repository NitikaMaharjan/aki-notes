import React, { useContext } from 'react';
import ThemeContext from '../context/theme/ThemeContext';

export default function Tracker() {
  const theme = useContext(ThemeContext);
  return (
    <div className="content" style={{color: `${theme=="light"?"black":"white"}`}}>
      This is tracker page.
    </div>
  )
}
