import React, { createContext, useState, useContext } from 'react';

// Créez le contexte d'authentification
export const AuthContext = createContext();

// Fonction pour utiliser le contexte
export const useAuth = () => useContext(AuthContext);

// Fournisseur d'authentification
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => {
        setIsAuthenticated(true); // Simulez une connexion réussie
    };

    const logout = () => {
        setIsAuthenticated(false); // Simulez une déconnexion
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
