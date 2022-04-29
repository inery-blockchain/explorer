import { useState, createContext } from 'react'

export const MenuContext = createContext();

export default function MenuContextProvider(props) {

    const [menuState, setMenuState] = useState(false);

    return <MenuContext.Provider value={[menuState, setMenuState]}>{props.children}</MenuContext.Provider>
}