import { Button } from '@/_components/ui/button';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { StarRating } from '@/_components/StarRating/starRanting';
import { calculateRating } from '@/utils/calculateUtils';
import http from '@/http';
import { LoginContext } from '@/context/LoginContext';
import Image from 'next/image';
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
        <div className='max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg'>
            <h2 className='text-2xl font-bold mb-6 text-gray-800'>
                Avalie o Cuidador
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='flex flex-col items-center'>
                    <Image
                        src='/path-to-caregiver-photo.jpg'
                        alt='Foto do Cuidador'
                        width={128}
                        height={128}
                        className='w-32 h-32 rounded-full mb-4 object-cover'
                    />
                    <h3 className='text-xl font-semibold text-gray-700'>
                        Nome do Cuidador
                    </h3>
                    <p className='text-gray-600'>
                        Informações do cuidador aqui...
                    </p>
                </div>
                <div>
                    <form>
                        <div className='mb-4'>
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
                                className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 '
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </div>
                        <div className='mb-4'>
                            <label
                                htmlFor='rating'
                                className='block text-sm font-medium text-gray-700'
                            >
                                Avaliação:
                            </label>
                            <StarRating rating={rating} setRating={setRating} />
                        </div>
                        <div className='flex space-x-4'>
                            <Button onClick={handleSubmit}>Enviar</Button>
                            <Button onClick={() => router.push('/')}>
                                Cancelar
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
