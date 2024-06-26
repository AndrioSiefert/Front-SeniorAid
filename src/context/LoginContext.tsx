import IJwtPayload from '@/Interface/IJwtPayLoad';
import { jwtDecode } from 'jwt-decode';
import { createContext, useState, useEffect } from 'react';

interface LoginContextData {
    userId: number | null;
    userName: string;
    userType: string;
    mudaId: (id: number | null) => void;
    mudaNome: (name: string) => void;
    mudaUserType: (type: string) => void;
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
    const [userType, setUserType] = useState<string>('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded: IJwtPayload = jwtDecode(token);
                console.log('Decoded Token:', decoded);
                setUserId(decoded.id);
                setUserName(decoded.name);
                setUserType(decoded.userType);
                console.log('User Type:', decoded.userType);
            } catch (error) {
                console.error('Erro ao decodificar o token:', error);
            }
        }
    }, []);

    function mudaId(id: number | null) {
        setUserId(id);
    }

    function mudaNome(name: string) {
        setUserName(name);
    }

    function mudaUserType(type: string) {
        setUserType(type);
    }

    return (
        <LoginContext.Provider
            value={{
                userId,
                userName,
                userType,
                mudaId,
                mudaNome,
                mudaUserType
            }}
        >
            {children}
        </LoginContext.Provider>
    );
}

export default LoginProvider;
