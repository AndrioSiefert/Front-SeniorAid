import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface LoginContextData {
    userId: number | null;
    userName: string;
    mudaId: (id: number | null) => void;
    mudaNome: (name: string) => void;
}

interface LoginProviderProps {
    children: React.ReactNode;
}

export const LoginContext = createContext<LoginContextData>(
    {} as LoginContextData
);

function LoginProvider({ children }: LoginProviderProps) {
    const [userId, setUserId] = useState<number | null>(null);
    const [userName, setUserName] = useState<string>('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded: any = jwtDecode(token);
            setUserId(decoded.id);
            setUserName(decoded.name);
        }
    }, []);

    function mudaId(id: number | null) {
        setUserId(id);
    }
    function mudaNome(name: string) {
        setUserName(name);
    }

    return (
        <LoginContext.Provider value={{ userId, userName, mudaId, mudaNome }}>
            {children}
        </LoginContext.Provider>
    );
}

export default LoginProvider;
