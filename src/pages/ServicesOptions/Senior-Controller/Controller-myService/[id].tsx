import IServiceRequest from '@/Interface/IServiceRequest';
import { Button } from '@/_components/ui/button';
import http from '@/http';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ServiceRequestDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [requestDetails, setRequestDetails] =
        useState<IServiceRequest | null>(null);

    useEffect(() => {
        if (id) {
            http.get(`/service-request/details/${id}`)
                .then((response) => {
                    setRequestDetails(response.data);
                })
                .catch((error) => {
                    console.error(
                        'Erro ao carregar detalhes da solicitação',
                        error
                    );
                });
        }
    }, [id]);

    const handleAcceptRequest = async () => {
        try {
            const response = await http.put(`/service-request/accept/${id}`, {
                accepted: true
            });
            console.log('Solicitação aceita com sucesso', response.data);

            setRequestDetails((prevState) => {
                if (prevState) {
                    return {
                        ...prevState,
                        accepted: true
                    };
                }
                return prevState;
            });
        } catch (error) {
            console.error('Erro ao aceitar solicitação', error);
        }
    };

    const handleDeclineRequest = async () => {
        try {
            const response = await http.delete(`/service-request/${id}`);
            console.log('Solicitação recusada com sucesso', response.data);

            router.push('/');
        } catch (error) {
            console.error('Erro ao recusar solicitação', error);
        }
    };

    if (!requestDetails) {
        return (
            <div className='flex justify-center items-center h-screen'>
                Carregando...
            </div>
        );
    }

    return (
        <div className='max-w-3xl mx-auto mt-8 p-8 border rounded-lg shadow-md'>
            <h1 className='text-2xl font-bold mb-4'>
                Detalhes da Solicitação de Serviço
            </h1>

            <p>
                <span className='font-bold'>ID:</span> {requestDetails.id}
            </p>
            <p>
                <span className='font-bold'>Caregiver:</span>{' '}
                {requestDetails.caregiver.name}
            </p>
            <p>
                <span className='font-bold'>Serviço:</span>{' '}
                {requestDetails.service.serviceType}
            </p>
            <p>
                <span className='font-bold'>Aceito:</span>{' '}
                {requestDetails.accepted ? 'Sim' : 'Não'}
            </p>

            <div className='mt-8 flex justify-between'>
                {!requestDetails.accepted && (
                    <>
                        <Button onClick={handleAcceptRequest}>Aceitar</Button>
                        <Button onClick={handleDeclineRequest}>Recusar</Button>
                    </>
                )}

                <Button onClick={() => router.push('/')}>Voltar</Button>
            </div>
        </div>
    );
};

export default ServiceRequestDetails;
