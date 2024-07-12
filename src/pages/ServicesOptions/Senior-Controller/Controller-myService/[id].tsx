import IServiceRequest from '@/Interface/IServiceRequest';
import { Button } from '@/_components/ui/button';
import http from '@/http';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';

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

    const getStatusColor = (accepted: boolean) => {
        return accepted
            ? 'bg-green-200 text-green-800'
            : 'bg-red-200 text-red-800';
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
                                        <span className='font-bold'>
                                            Nome do cuidador:{' '}
                                        </span>
                                        {request.caregiver.name}
                                    </p>
                                    <p>
                                        <span className='font-bold'>
                                            Informações do cuidador{' '}
                                        </span>
                                        {request.caregiver.description}
                                    </p>
                                    <Image
                                        width={100}
                                        height={100}
                                        src={request.caregiver.photo}
                                        alt='Foto do cuidador'
                                    />

                                    <p
                                        className={`font-bold ${getStatusColor(
                                            request.accepted
                                        )} p-2 rounded-md inline-block mt-2`}
                                    >
                                        <span className='font-bold'>
                                            Contrato:{' '}
                                        </span>
                                        {request.accepted
                                            ? 'ACEITO'
                                            : 'NÃO ACEITO'}
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
