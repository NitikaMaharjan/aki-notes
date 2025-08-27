import React, { useRef, useEffect } from 'react'

export default function Cursor() {
  const cursorDot = useRef(null);
  const cursorOutline = useRef(null);

  const handleCursor = (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    if (cursorDot.current && cursorOutline.current) {
      cursorDot.current.style.left = `${posX}px`;
      cursorDot.current.style.top = `${posY}px`;

      cursorOutline.current.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 250, fill: "forwards" });
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleCursor);

    return () => {
      window.removeEventListener("mousemove", handleCursor);
    };
  }, []);

  return (
    <>
      <div ref={cursorDot} className="cursor-dot"></div>
      <div ref={cursorOutline} className="cursor-outline"></div>
    </>
  );
}
