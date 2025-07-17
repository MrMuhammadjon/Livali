import { createContext, useContext, useState, useEffect } from "react";

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
    const [searcgquery, setSearchQuery] = useState("");
    const [isSeller, setIsSeller] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    
    const [AddToCart, setAddToCart] = useState(() => {
        const savedcart = localStorage.getItem('cart');
        try {
            const parsed = JSON.parse(savedcart);
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            return []; // fallback if JSON is invalid
        }
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
    }, [])


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

    const toggleCart = (product) => {
        console.log("Toggle Cart:", product);

        setAddToCart((prev) => {
            const cart = prev.find((item) => item.id === product.id);
            if (cart) {
                return prev.filter((item) => item.id !== product.id); // remove
            } else {
                return [...prev, { ...product, qty: 1 }]; // add with qty
            }
        });
    };



    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);


    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searcgquery);
        }, 400); // foydalanuvchi yozishni 400ms ichida tugatmasa, so‘rov yuboriladi

        return () => {
            clearTimeout(handler); // keyin harf yozilsa, avvalgi timeout to‘xtatiladi
        };
    }, [searcgquery]);



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
        setActive,
        searcgquery,
        setSearchQuery,
        isSeller,
        setIsSeller,
        debouncedSearchTerm,
        setDebouncedSearchTerm,
        AddToCart,
        setAddToCart,
        toggleCart
    }

    return (
        <AppContext.Provider value={ContextValue}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)