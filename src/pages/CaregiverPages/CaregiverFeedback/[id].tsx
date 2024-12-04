import http from '@/http';
import IFeedback from '@/Interface/IFeedback';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function CaregiverFeedback() {
    const router = useRouter();
    const { id } = router.query;
    // Altere o tipo para array de feedbacks
    const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);

    useEffect(() => {
        if (id) {
            http.get(`feedback/info/${id}`)
                .then((response) => {
                    console.log(response.data); // Verifique os dados retornados pela API
                    setFeedbacks(response.data); // Defina a lista de feedbacks
                })
                .catch((error) => console.error('Erro ao buscar feedback:', error));
        }
    }, [id]);

    console.log(id);

    return (
        <div className='container mx-auto p-4'>
            <h1 className='mb-4 text-2xl font-bold'>Feedback</h1>
            {feedbacks.length > 0 ? (
                <ul className='space-y-4'>
                    {/* Mapear os feedbacks para renderizar cada um */}
                    {feedbacks.map((feedback) => (
                        <li key={feedback.id} className='rounded border p-4 shadow'>
                            <p className='text-lg font-semibold'>Comentário: {feedback.comment}</p>
                            <p className='text-gray-600'>Avaliação: {feedback.rating}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-gray-500'>Nenhum feedback encontrado.</p>
            )}
        </div>
    );
}
