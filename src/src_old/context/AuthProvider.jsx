import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../services/auth.service';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setIsAuthenticated(true);
            setCurrentUser(user);
        }else{
            setIsAuthenticated(false);
            setCurrentUser(null);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
