import { createContext, FC, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

type MyToken = {
    userID: string,
    userEmail: string,
    userRole: string,
    Username: string,
    exp: number
}

type User = {
    userID : string,
    Username: string,
    userRole: string,
    userEmail: string
}

type AuthContextType = {
    currentUser: User | null,
    userLoggedIn: boolean,
    login: (username: string, password: string) => void,
    logout: () => void,
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider : FC<{ children: React.ReactNode }> = ({ children }) => {

    const [ currentUser, setCurrentUser ] = useState<User | null>(null);
    const [ userLoggedIn, setUserLoggedIn ] = useState<boolean>(false);
    const [ loading, setLoading] = useState<boolean>(true);

    console.log("currentUser", currentUser);

    const isTokenExpired = (token: string) => {
        const decoded: MyToken = jwtDecode(token);
        return decoded.exp * 1000 < Date.now(); // ตรวจสอบว่า expired หรือไม่
    };

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken && !isTokenExpired(accessToken)) {
            const user = jwtDecode<MyToken>(accessToken);
            setCurrentUser(user);
            setUserLoggedIn(true);
        } else {
            logout();
        }
        setLoading(false);
    },[]);

    const login = async (username: string, password: string) => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    Username : username, 
                    Password: password 
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to log in");
            }

            const { accessToken } = await response.json();
            localStorage.setItem("accessToken", accessToken);

            const user = jwtDecode<MyToken>(accessToken);
            setCurrentUser(user);
            setUserLoggedIn(true);
        } catch (error) {
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        setCurrentUser(null);
        setUserLoggedIn(false);
    };

    const value = {
        currentUser,
        userLoggedIn,
        loading,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}