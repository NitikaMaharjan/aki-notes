import TextContext from "./TextContext";

export default function TextState(props) {

    let date_object;

    const handleCapitalizeFirstLetter = (text) => {
        let words = text.split(' ');
        for (let i=0; i<words.length; i++){
            words[i] = words[i].charAt(0).toUpperCase()+words[i].substring(1).toLowerCase();
        }
        text = (words.join(' '));
        return text;
    }

    const checkDate = (date) => {
        date_object = (typeof date === "string")?new Date(date):date;
    }

    const giveMeDay = (date) => {
        checkDate(date);
        return date_object.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } 
    
    const giveMeTime = (date) => {
        checkDate(date);
        return date_object.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    }

    const trimTitle = (text) => {
        return  text.length<=18?text:text.slice(0,18)+"...";
    }
    
    const trimDescription = (text) => {
        return  text.length<=80?text:text.slice(0,80)+"...";
    }

    return (
        <TextContext.Provider value={{handleCapitalizeFirstLetter, giveMeDay, giveMeTime, trimTitle, trimDescription}}>
            {props.children}
        </TextContext.Provider>
    )
}