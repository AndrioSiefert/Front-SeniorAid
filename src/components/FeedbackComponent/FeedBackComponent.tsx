import http from '@/http';
import { useRouter } from 'next/router';
import { useState, useContext } from 'react';
import { LoginContext } from '@/context/LoginContext';
import { FeedbackStars } from './FeedbackStars/FeedbackStars';
import IFeedback from '@/Interface/IFeedback';

export default function FeedBackComponent() {
    const router = useRouter();
    const { id } = router.query;
    const [comment, setComment] = useState<string>('');
    const [rating, setRating] = useState<number>(0);
    const { seniorId } = useContext(LoginContext);
    console.log('seniorId:', seniorId);
    console.log('id:', id);

    const submit = async () => {
        if (rating === 0) {
            alert('Por favor, selecione uma avaliação!');
            return;
        }

        const feedback: IFeedback = {
            giverId: seniorId,
            receiverId: id,
            comment: comment,
            rating: rating,
        };
        console.log('feedback:', feedback);

        try {
            await http.post(`/feedback`, feedback);

            alert('Feedback enviado com sucesso!');
            router.push('/');
        } catch (error) {
            console.error('Erro ao enviar feedback:', error);
            alert('Erro ao enviar feedback');
        }
    };

    return (
        <>
            <h1>Feedback para o usuário</h1>
            <div className='my-4'>
                <h2>Avaliação</h2>
                <FeedbackStars setRating={setRating} />
                <textarea
                    className='mt-2 w-full rounded border border-gray-300 p-2'
                    placeholder='Deixe seu comentário'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button className='mt-4 rounded bg-blue-500 px-4 py-2 text-white' onClick={submit}>
                    Enviar Feedback
                </button>
            </div>
        </>
    );
}
