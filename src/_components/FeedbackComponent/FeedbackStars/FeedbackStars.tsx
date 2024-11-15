import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

interface FeedbackStarsProps {
    setRating: (rating: number) => void; // Função para atualizar a avaliação
}

export const FeedbackStars = ({ setRating }: FeedbackStarsProps) => {
    const [hovered, setHovered] = useState<number | null>(null); // Para mostrar o destaque ao passar o mouse
    const [rating, setLocalRating] = useState<number>(0); // Estado local para controle de rating

    // Função para lidar com a seleção de uma estrela
    const handleRating = (ratingValue: number) => {
        setLocalRating(ratingValue); // Atualiza o estado local
        setRating(ratingValue); // Atualiza o estado do componente pai
    };

    return (
        <div className='flex items-center'>
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;

                return (
                    <label key={index}>
                        <FaStar
                            onClick={() => handleRating(ratingValue)}
                            onMouseEnter={() => setHovered(ratingValue)}
                            onMouseLeave={() => setHovered(null)}
                            className='cursor-pointer'
                            color={
                                hovered
                                    ? ratingValue <= hovered
                                        ? '#ffc107'
                                        : '#e4e5e9'
                                    : ratingValue <= rating
                                      ? '#ffc107'
                                      : '#e4e5e9'
                            }
                            size={24}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default FeedbackStars;
