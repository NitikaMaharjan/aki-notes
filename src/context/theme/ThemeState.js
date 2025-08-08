import ThemeContext from "./ThemeContext";

export default function ThemeState(props) {

    return (
        <ThemeContext.Provider value={props.theme}>
            {props.children}
        </ThemeContext.Provider>
    );
}
