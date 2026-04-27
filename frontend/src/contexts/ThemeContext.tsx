import { createContext, useContext, type Dispatch, type ReactNode, type SetStateAction } from 'react';

type ThemeContextValue = {
    isDark: boolean;
    setIsDark: Dispatch<SetStateAction<boolean>>;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ value, children }: { value: ThemeContextValue; children: ReactNode }) => {
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};
