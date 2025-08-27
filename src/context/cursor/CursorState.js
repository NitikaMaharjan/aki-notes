import CursorContext from "./CursorContext";
import React,  { useState, useEffect } from 'react';

export default function CursorState(props) {

    const [cursorDot, setCursorDot] = useState(null);
    const [cursorOutline, setCursorOutline] = useState(null);
    
    const handleCursor = (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        if (cursorDot && cursorOutline) {
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 250, fill: "forwards" });
        }
    };

    const getCursor = () => {
        setCursorDot(document.getElementById("dot"));
        setCursorOutline(document.getElementById("outline"));
    }

    useEffect(() => {
        setCursorDot(document.getElementById("dot"));
        setCursorOutline(document.getElementById("outline"));

        window.addEventListener("mousemove", handleCursor);

        return () => {
            window.removeEventListener("mousemove", handleCursor);
        };
    }, [cursorDot, cursorOutline]);

    return(
        <>
            <CursorContext.Provider value={{cursorDot, cursorOutline, getCursor}}>
                {props.children}
            </CursorContext.Provider>

            <div>
                <div id="dot" className="cursor-dot"></div>
                <div id="outline" className="cursor-outline"></div>
            </div>
        </>
    );
}