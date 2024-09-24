import { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { ThemeProvider } from '@emotion/react';
import { createTheme, PaletteMode } from '@mui/material';

type AppContextType = {
    mode: PaletteMode;
    toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
    return useContext(AppContext);
}

export const AppProvider = ({ children } : { children : ReactNode }) => {

    const [mode, setMode] = useState<PaletteMode>('light');

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    primary: {
                        main : '#B10000'
                    },
                },
                typography: {
                    fontFamily: 'Noto Sans Thai,  sans-serif', // เปลี่ยนฟอนต์ถ้าต้องการ
                },  
            }),
        [mode]
    );

    return (
        <AppContext.Provider value={{ toggleTheme, mode }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </AppContext.Provider>
    );
}

export default AppContext;