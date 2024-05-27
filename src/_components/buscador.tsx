import React from 'react';

interface Props {
    busca: string;
    setBusca: React.Dispatch<React.SetStateAction<string>>;
}

export default function Buscador({ busca, setBusca }: Props) {
    return (
        <div>
            <input
                type={busca}
                placeholder='Buscar'
                onChange={(e) => setBusca(e.target.value)}
            />
        </div>
    );
}
