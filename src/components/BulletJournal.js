import React, { useContext } from 'react';
import ThemeContext from '../context/theme/ThemeContext';

export default function BulletJournal() {
  const {theme} = useContext(ThemeContext);
  return (
    <div className="content" style={{color: `${theme=="light"?"black":"white"}`}}>
      This is bullet journal page.
    </div>
  )
}
