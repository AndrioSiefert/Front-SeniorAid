import IJwtPayload from '@/Interface/IJwtPayLoad';
import { jwtDecode } from 'jwt-decode';
import { createContext, useState, useEffect } from 'react';

interface LoginContextData {
    userId: number | null;
    userName: string;
    userType: string;
    caregiverId: number | null;
    seniorId: number | null;
    photo: string;
    mudaId: (id: number | null) => void;
    mudaNome: (name: string) => void;
    mudaUserType: (type: string) => void;
    mudaCaregiverId: (id: number | null) => void;
    mudaSeniorId: (id: number | null) => void;
    mudaPhoto: (photo: string) => void;
}

interface LoginProviderProps {
    children: React.ReactNode;
}

export const LoginContext = createContext<LoginContextData>({} as LoginContextData);

function LoginProvider({ children }: LoginProviderProps) {
    const [userId, setUserId] = useState<number | null>(null);
    const [userName, setUserName] = useState<string>('');
    const [userType, setUserType] = useState<string>('');
    const [caregiverId, setCaregiverId] = useState<number | null>(null);
    const [seniorId, setSeniorId] = useState<number | null>(null);
    const [photo, setPhoto] = useState<string>('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded: IJwtPayload = jwtDecode(token);
                console.log('Decoded Token:', decoded);
                setUserId(decoded.id);
                setUserName(decoded.name);
                setUserType(decoded.userType);
                setCaregiverId(decoded.caregiverId || null);
                setSeniorId(decoded.seniorId || null);
                setPhoto(decoded.photo || '');
                console.log('User Type:', decoded.userType);
                console.log('Caregiver ID:', decoded.caregiverId);
                console.log('Senior ID:', decoded.seniorId);
                console.log('Photo:', decoded.photo);
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

    function mudaCaregiverId(id: number | null) {
        setCaregiverId(id);
    }

    function mudaSeniorId(id: number | null) {
        setSeniorId(id);
    }

    function mudaPhoto(photo: string) {
        setPhoto(photo);
    }

    return (
        <LoginContext.Provider
            value={{
                userId,
                userName,
                userType,
                caregiverId,
                seniorId,
                mudaId,
                mudaNome,
                mudaUserType,
                mudaCaregiverId,
                mudaSeniorId,
                photo,
                mudaPhoto,
            }}
        >
            {children}
        </LoginContext.Provider>
    );
}

export default LoginProvider;
