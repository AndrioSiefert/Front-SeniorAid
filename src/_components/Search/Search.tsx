import React from 'react';

interface Props {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function Search({ search, setSearch }: Props) {
    return (
        <div>
            <input
                type={search}
                placeholder='Buscar'
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    );
}
