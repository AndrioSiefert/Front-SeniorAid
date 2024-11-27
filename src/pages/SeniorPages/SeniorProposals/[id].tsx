import IServiceRequest from '@/Interface/IServiceRequest';
import { Button } from '@/components/ui/button';
import http from '@/http';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const ServiceRequestDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [serviceRequests, setServiceRequests] = useState<IServiceRequest[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchServiceRequests = async () => {
        try {
            const response = await http.get(`/service-request`);
            console.log(response.data);
            setServiceRequests(response.data);
        } catch (error) {
            console.error('Erro ao carregar solicitações de serviço', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchServiceRequests();
        }
    }, [id]);

    const handleAcceptRequest = async (id: number) => {
        try {
            const response = await http.put(`/service-request/accept/${id}`, {
                accepted: true,
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

    const getStatusColor = (accepted: boolean) => {
        return accepted ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800';
    };

    if (loading) {
        return (
            <div className='text-center'>
                <p>Carregando...</p>
            </div>
        );
    }

    return (
        <div className='mx-auto mt-8 max-w-3xl rounded-lg bg-white p-6 shadow-lg'>
            <h1 className='mb-6 text-center text-3xl font-semibold'>Propostas de Serviço</h1>

            {serviceRequests.length === 0 ? (
                <p className='text-center text-gray-500'>Nenhuma proposta de serviço encontrada.</p>
            ) : (
                <ul className='divide-y divide-gray-300'>
                    {serviceRequests.map((request) => (
                        <li key={request.id} className='py-4'>
                            <div className='flex items-center justify-between'>
                                <div className='flex-1'>
                                    {request.caregiver ? (
                                        <>
                                            <p className='text-lg font-bold'>
                                                <span className='font-semibold'>Nome do cuidador: </span>
                                                {request.caregiver.name}
                                            </p>
                                            <p className='text-md'>
                                                <span className='font-semibold'>Telefone: </span>
                                                {request.caregiver.phone}
                                            </p>
                                            <div className='my-2'>
                                                <Image
                                                    width={100}
                                                    height={100}
                                                    src={`http://localhost:8000/images/${request.caregiver.photo}`}
                                                    alt='Foto do cuidador'
                                                    className='rounded-full shadow-md'
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <p className='text-gray-500'>Informações do cuidador não disponíveis.</p>
                                    )}

                                    <p
                                        className={`font-bold ${getStatusColor(request.accepted)} mt-2 inline-block rounded-md p-2`}
                                    >
                                        <span className='font-semibold'>Contrato: </span>
                                        {request.accepted ? 'ACEITO' : 'NÃO ACEITO'}
                                    </p>
                                    <Button
                                        onClick={() => router.push(`/Feedback/${request.caregiver?.id}`)}
                                        className='mt-2'
                                        disabled={!request.caregiver}
                                    >
                                        Dar Feedback
                                    </Button>
                                </div>
                                {!request.accepted && request.caregiver && (
                                    <div className='flex space-x-2'>
                                        <Button
                                            onClick={() => handleAcceptRequest(request.id)}
                                            className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
                                        >
                                            Aceitar
                                        </Button>
                                        <Button
                                            onClick={() => handleDeclineRequest(request.id)}
                                            className='rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700'
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
                    onClick={() => router.push(`/SeniorPages/SeniorServiceCreated/${id}`)}
                    className='rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700'
                >
                    Voltar
                </Button>
            </div>
        </div>
    );
};

export default ServiceRequestDetails;
