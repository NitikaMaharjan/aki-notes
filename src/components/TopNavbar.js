import React from 'react';

export default function TopNavbar(props) {

  return (
    <>
      <div className={`theme-icon-wrapper${props.alt=="light"?"-light":"-dark"}`} onClick={props.ChangeTheme}>
        <img src={props.src} height="20px" width="20px" alt={`${props.alt} theme button`}/>
      </div>
    </>
  )
}
