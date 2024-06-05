import { ReactNode, createContext, useState } from 'react';

interface ChildProps {
    children: ReactNode;
}

interface LoginContextProps {
    userId: string | null;
    setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const LoginContext = createContext<LoginContextProps | undefined>(
    undefined
);

export const LoginProvider = ({ children }: ChildProps) => {
    const [userId, setUserId] = useState<string | null>(null);

    return (
        <LoginContext.Provider value={{ userId, setUserId }}>
            {children}
        </LoginContext.Provider>
    );
};
