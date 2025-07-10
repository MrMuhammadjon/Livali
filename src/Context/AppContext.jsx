import { createContext, use, useContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [user, SetUser] = useState(null);
    const [responsive, setResponsive] = useState(window.innerWidth <= 768);
    const [showFilters, setShowFilters] = useState(false);
    const [active, setActive] = useState("all");
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });


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


    const toggleFavorite = (product) => {
        setFavorites((prev) => {
            const exists = prev.find((item) => item.id === product.id);
            if (exists) {
                return prev.filter((item) => item.id !== product.id); // remove
            } else {
                return [...prev, product]; // add
            }
        });
    };

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    



    const ContextValue = {
        user,
        SetUser,
        DarkMode,
        setDarkMode,
        responsive,
        setResponsive,
        showFilters,
        setShowFilters,
        favorites,
        toggleFavorite,
        active,
        setActive
    }

    return (
        <AppContext.Provider value={ContextValue}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)