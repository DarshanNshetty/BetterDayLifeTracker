import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface AuthContextType {
    user: any;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if token exists
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['x-auth-token'] = token;
            setIsAuthenticated(true);
        } else {
            // Demo mode: auto-authenticate for development/showcase
            const demoToken = 'demo-token-' + Date.now();
            localStorage.setItem('token', demoToken);
            axios.defaults.headers.common['x-auth-token'] = demoToken;
            setIsAuthenticated(true);
        }
    }, []);

    const login = (token: string) => {
        localStorage.setItem('token', token);
        axios.defaults.headers.common['x-auth-token'] = token;
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['x-auth-token'];
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};