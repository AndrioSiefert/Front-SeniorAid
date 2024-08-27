import { Button } from '@/_components/ui/button';
import { useRouter } from 'next/router';
import { use, useContext, useEffect, useState } from 'react';
import { StarRating } from '@/_components/StarRating/starRanting';
import { calculateRating } from '@/utils/calculateUtils';
import http from '@/http';
import { LoginContext } from '@/context/LoginContext';
export default function Feedback() {
    const router = useRouter();
    const { userId, userType } = useContext(LoginContext);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0); // rating que será feito
    const [ratings, setRatings] = useState<number[]>([]); // rating que já foi feito
    const [caregiverId, setCaregiverId] = useState(null);

    useEffect(() => {}, []);

    const handleSubmit = async () => {
        if (!userId || !caregiverId) {
            console.error('Usuário ou cuidador não identificado.');
            return;
        }
        setRatings([...ratings, rating]);
        const averageRating = calculateRating(ratings);
        console.log(`Average Rating: ${averageRating.toFixed(1)}`);
        try {
            await http.post('/feedback', {});
            router.push('/');
        } catch (error) {
            console.error('Erro ao enviar feedback', error);
        }
    };

    return (
        <div>
            <div>
                <h2>Avalie o cuidador</h2>
                <form className='flex'>
                    <label
                        htmlFor='comment'
                        className='block text-sm font-medium text-gray-700'
                    >
                        Comentário:
                    </label>
                    <input
                        type='text'
                        name='comment'
                        id='comment'
                        className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />

                    <label
                        htmlFor='rating'
                        className='block text-sm font-medium text-gray-700'
                    >
                        Avaliação:
                    </label>
                    <StarRating rating={rating} setRating={setRating} />
                </form>
                <Button onClick={handleSubmit}>Enviar</Button>
                <Button onClick={() => router.push('/')}>Cancelar</Button>
            </div>
        </div>
    );
}
