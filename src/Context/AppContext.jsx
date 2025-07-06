import { createContext, use, useContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [user, SetUser] = useState(null);
    const [responsive, setResponsive] = useState(window.innerWidth <= 768);
    const [showFilters, setShowFilters] = useState(false);


    const [DarkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });


    useEffect(() => {
        const Mode = DarkMode ? 'dark-mode' : 'light-mode';
        document.body.className = Mode;
        localStorage.setItem('themeSite', DarkMode ? 'dark' : 'light');
    }, [DarkMode])

    useEffect(() => {
        const handleResize = () => {
            setResponsive(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    })

    const ContextValue = {
        user,
        SetUser,
        DarkMode,
        setDarkMode,
        responsive,
        setResponsive,
        showFilters,
        setShowFilters
    }

    return (
        <AppContext.Provider value={ContextValue}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)