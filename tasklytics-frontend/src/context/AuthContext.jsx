import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    const loginUser = (newToken) => {
        setToken(newToken);
        localStorage.setItem("token", newToken);
    };

    const logoutUser = () => {
        setToken(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ token, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};