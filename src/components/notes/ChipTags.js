import { useContext } from 'react';
import ThemeContext from "../../context/theme/ThemeContext";
import TextContext from '../../context/text/TextContext';

export default function ChipTags(props) {
  
  const {theme} = useContext(ThemeContext);
  const {handleCapitalizeFirstLetter} = useContext(TextContext);

  return (
    <>
        <button className={`chip${theme==="light"?"-light":"-dark"}`}>{handleCapitalizeFirstLetter(props.tag)}</button>
    </>
  )
}