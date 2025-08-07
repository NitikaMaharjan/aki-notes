import React, { useState } from 'react';

export default function TopNavbar() {

  const [iconSrc, setIconSrc] = useState({
      src: "/icons/sun.png",
      alt: "light"
    });

  const ChangeTheme = () =>{
    if (iconSrc.alt=="light"){
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
    <div className={`theme-icon-wrapper${iconSrc.alt=="light"?"-light":"-dark"}`}>
      <img src={iconSrc.src} height="20px" width="20px" alt={`${iconSrc.alt} theme button`} onClick={ChangeTheme}/>
    </div>
  )
}
