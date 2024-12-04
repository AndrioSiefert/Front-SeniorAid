import axios from 'axios';
import { useState, useEffect } from 'react';

interface IFavorito {
    id: number;
    comment: string;
    rating: number;
    receiverId: number;
}

export default function AvaliacoesComponents() {
    const [favoritos, setFavoritos] = useState<IFavorito[]>([]);

    useEffect(() => {
        axios
            .get('http://localhost:8000/feedback')
            .then((response) => setFavoritos(response.data))
            .catch((error) => console.error('Erro ao buscar favoritos:', error));
    }, []);

    return (
        <div className='container mx-auto p-4'>
            <h1 className='mb-4 text-2xl font-bold'>Favoritos</h1>
            {favoritos.length > 0 ? (
                <ul className='space-y-4'>
                    {favoritos.map((favorito) => (
                        <li key={favorito.id} className='rounded border p-4 shadow'>
                            <p className='text-lg font-semibold'>Comentário: {favorito.comment}</p>
                            <p className='text-gray-600'>Avaliação: {favorito.rating}</p>
                            <p className='text-gray-600'>Cuidador: {favorito.receiverId}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-gray-500'>Nenhum favorito encontrado.</p>
            )}
        </div>
    );
}
