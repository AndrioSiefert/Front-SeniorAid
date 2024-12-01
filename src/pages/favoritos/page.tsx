import axios from 'axios';
import { useState, useEffect } from 'react';

interface IFavorito {
    id: number;
    comment: string;
    rating: number;
}

export default function FavoritosPage() {
    const [favoritos, setFavoritos] = useState<IFavorito[]>([]);

    useEffect(() => {
        axios
            .get('http://localhost:3000/favoritos')
            .then((response) => setFavoritos(response.data))
            .catch((error) => console.error('Erro ao buscar favoritos:', error));
    }, []);

    return (
        <div>
            <h1>Favoritos</h1>
            <ul>
                {favoritos.map((favorito) => (
                    <li key={favorito.id}>
                        <p>Comentário: {favorito.comment}</p>
                        <p>Avaliação: {favorito.rating}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
