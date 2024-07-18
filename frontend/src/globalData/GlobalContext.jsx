import { createContext, useState } from "react";

export const GlobalContext=createContext();

export const GlobalProvider=({children})=>{

    const [user,setUser]=useState();
    const [cart,setCart]=useState(false)
    return(
        <GlobalContext.Provider value={{user,setUser,cart,setCart}}>
            {children}
        </GlobalContext.Provider>
    );
}