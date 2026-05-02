import { createContext, useState, useContext, type ReactNode } from 'react';

// 1. Define the shape of our User data
interface User {
    id: number;
    name: string;
    email: string;
}

// 2. Define the shape of the Context itself
interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (userData: User, jwt: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

// 3. Create the Context (with a dummy default value to satisfy TypeScript)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 4. Create the Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // We will eventually load this from localStorage, but for now, it's null
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const login = (userData: User, jwt: string) => {
        setUser(userData);
        setToken(jwt);
        // TODO: Save token to localStorage here
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        // TODO: Remove token from localStorage here
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            logout,
            isAuthenticated: !!token
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// 5. Create a Custom Hook for easy access
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};