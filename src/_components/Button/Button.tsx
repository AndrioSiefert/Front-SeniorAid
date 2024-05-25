import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
}

export default function Button({ children }: ButtonProps) {
    return (
        <button className='bg-transparent hover:bg-black text-white font-bold py-2 px-4 rounded-full'>
            {children}
        </button>
    );
}
