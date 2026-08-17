import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BE_APP}/tasks`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setTasks(data);
            })
            .catch((error) => {
                console.error("Errore nel recupero dei task:", error);
            });
    }, []);

    return (
        <GlobalContext.Provider value={{ tasks, setTasks }}>
            {children}
        </GlobalContext.Provider>
    );
}