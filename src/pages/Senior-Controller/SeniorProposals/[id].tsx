import IServiceRequest from '@/Interface/IServiceRequest';
import { Button } from '@/_components/ui/button';
import http from '@/http';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const ServiceRequestDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [serviceRequests, setServiceRequests] = useState<IServiceRequest[]>([]);

    useEffect(() => {
        fetchServiceRequests();
    }, []);

    const fetchServiceRequests = async () => {
        try {
            const response = await http.get(`/service-request`);
            setServiceRequests(response.data);
        } catch (error) {
            console.error('Erro ao carregar solicitações de serviço', error);
        }
    };

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

    return (
        <div className='max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg'>
            <h1 className='text-3xl font-semibold mb-6 text-center'>Propostas de Serviço</h1>

            {serviceRequests.length === 0 ? (
                <p className='text-center text-gray-500'>Nenhuma proposta de serviço encontrada.</p>
            ) : (
                <ul className='divide-y divide-gray-300'>
                    {serviceRequests.map((request) => (
                        <li key={request.id} className='py-4'>
                            <div className='flex justify-between items-center'>
                                <div className='flex-1'>
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

                                    <p
                                        className={`font-bold ${getStatusColor(
                                            request.accepted,
                                        )} p-2 rounded-md inline-block mt-2`}
                                    >
                                        <span className='font-semibold'>Contrato: </span>
                                        {request.accepted ? 'ACEITO' : 'NÃO ACEITO'}
                                    </p>
                                </div>
                                {!request.accepted && (
                                    <div className='flex space-x-2'>
                                        <Button
                                            onClick={() => handleAcceptRequest(request.id)}
                                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                        >
                                            Aceitar
                                        </Button>
                                        <Button
                                            onClick={() => handleDeclineRequest(request.id)}
                                            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
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
                    onClick={() => router.push(`/Senior-Controller/SeniorServiceCreated/${id}`)}
                    className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
                >
                    Voltar
                </Button>
            </div>
        </div>
    );
};

export default ServiceRequestDetails;
