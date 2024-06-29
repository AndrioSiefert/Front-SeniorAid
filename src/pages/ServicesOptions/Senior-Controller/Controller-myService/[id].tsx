import IServiceRequest from '@/Interface/IServiceRequest';
import { Button } from '@/_components/ui/button';
import http from '@/http';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ServiceRequestDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [serviceRequests, setServiceRequests] = useState<IServiceRequest[]>(
        []
    );

    useEffect(() => {
        fetchServiceRequests();
    }, []);

    const fetchServiceRequests = async () => {
        try {
            const response = await http.get(`/service-request/all`);
            setServiceRequests(response.data);
        } catch (error) {
            console.error('Erro ao carregar solicitações de serviço', error);
        }
    };

    const handleAcceptRequest = async (id: number) => {
        try {
            const response = await http.put(`/service-request/accept/${id}`, {
                accepted: true
            });
            console.log('Solicitação aceita com sucesso', response.data);
            fetchServiceRequests();
        } catch (error) {
            console.error('Erro ao aceitar solicitação', error);
        }
    };

    const handleDeclineRequest = async (id: number) => {
        try {
            const response = await http.delete(`/service-request/${id}`);
            console.log('Solicitação recusada com sucesso', response.data);
            fetchServiceRequests();
        } catch (error) {
            console.error('Erro ao recusar solicitação', error);
        }
    };

    return (
        <div className='max-w-3xl mx-auto mt-8'>
            <h1 className='text-2xl font-bold mb-4'>Propostas de Serviço</h1>

            {serviceRequests.length === 0 ? (
                <p>Nenhuma proposta de serviço encontrada.</p>
            ) : (
                <ul className='divide-y divide-gray-300'>
                    {serviceRequests.map((request) => (
                        <li key={request.id} className='py-4'>
                            <div className='flex justify-between items-center'>
                                <div>
                                    <p>
                                        <span className='font-bold'>ID:</span>{' '}
                                        {request.id}
                                    </p>
                                    <p>
                                        <span className='font-bold'>
                                            Caregiver:
                                        </span>{' '}
                                        {request.caregiver.name}
                                    </p>
                                    <p>
                                        <span className='font-bold'>
                                            Serviço:
                                        </span>{' '}
                                        {request.service.serviceType}
                                    </p>
                                    <p>
                                        <span className='font-bold'>
                                            Aceito:
                                        </span>{' '}
                                        {request.accepted ? 'Sim' : 'Não'}
                                    </p>
                                </div>
                                {!request.accepted && (
                                    <div className='space-x-2'>
                                        <Button
                                            onClick={() =>
                                                handleAcceptRequest(request.id)
                                            }
                                        >
                                            Aceitar
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                handleDeclineRequest(request.id)
                                            }
                                        >
                                            Recusar
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <div className='mt-8'>
                <Button
                    onClick={() =>
                        router.push(
                            `/ServicesOptions/Senior-Controller/List-Service/${id}`
                        )
                    }
                >
                    Voltar
                </Button>
            </div>
        </div>
    );
};

export default ServiceRequestDetails;
