import IFeedback from '@/Interface/IFeedback';
import IServiceRequest from '@/Interface/IServiceRequest';
import { Button } from '@/components/ui/button';
import http from '@/http';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ProposalsCaregiverSubmitted = () => {
    const router = useRouter();
    const { id } = router.query;
    const [serviceRequests, setServiceRequests] = useState<IServiceRequest[]>([]);
    const [feedback, setFeedback] = useState<IFeedback | null>(null);

    const fetchServiceRequests = async () => {
        try {
            const response = await http.get(`/service-request`);
            setServiceRequests(response.data);
        } catch (error) {
            console.error('Erro ao carregar solicitações de serviço', error);
        }
    };

    useEffect(() => {
        fetchServiceRequests();
    }, []);

    if (!serviceRequests) {
        return (
            <div className='flex h-screen items-center justify-center'>
                <h1>Nenhuma proposta encontrada</h1>
            </div>
        );
    }

    const getStatusColor = (accepted: boolean) => {
        return accepted ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800';
    };

    return (
        <div className='mx-auto mt-8 max-w-3xl'>
            <h1 className='mb-4 text-2xl font-bold'>Status do Serviço Solicitado</h1>

            {serviceRequests.length === 0 ? (
                <p>Nenhuma proposta de serviço encontrada.</p>
            ) : (
                <ul className='divide-y divide-gray-300'>
                    {serviceRequests.map((request) => (
                        <li key={request.id} className='py-4'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p
                                        className={`font-bold ${getStatusColor(
                                            request.accepted,
                                        )} mt-2 inline-block rounded-md p-2`}
                                    >
                                        Contrato: {request.accepted ? 'ACEITO' : 'NÃO FOI ACEITO'}
                                    </p>
                                    {request.accepted && (
                                        <Button onClick={() => router.push(`/Feedback/${request.id}`)} className='mt-2'>
                                            Dar Feedback
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <div className='mt-8'>
                <Button onClick={() => router.push(`/CaregiverPages/CaregiverServicesCreated/${id}`)}>Voltar</Button>
            </div>
        </div>
    );
};

export default ProposalsCaregiverSubmitted;
