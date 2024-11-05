import IServiceRequest from '@/Interface/IServiceRequest';
import { Button } from '@/_components/ui/button';
import http from '@/http';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ServiceRequestDetailsCaregiver = () => {
    const router = useRouter();
    const { id } = router.query;
    const [serviceRequests, setServiceRequests] = useState<IServiceRequest[]>([]);

    const fetchServiceRequests = async () => {
        try {
            const response = await http.get(`/service-request`);
            setServiceRequests(response.data);

            console.log(response.data);
        } catch (error) {
            console.error('Erro ao carregar solicitações de serviço', error);
        }
    };
    useEffect(() => {
        fetchServiceRequests();
    }, []);

    const getStatusColor = (accepted: boolean) => {
        return accepted ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800';
    };

    return (
        <div className='max-w-3xl mx-auto mt-8'>
            <h1 className='text-2xl font-bold mb-4'>Status do Serviço Solicitado</h1>

            {serviceRequests.length === 0 ? (
                <p>Nenhuma proposta de serviço encontrada.</p>
            ) : (
                <ul className='divide-y divide-gray-300'>
                    {serviceRequests.map((request) => (
                        <li key={request.id} className='py-4'>
                            <div className='flex justify-between items-center'>
                                <div>
                                    <h2 className='text-lg font-semibold'>{request.service.serviceName}</h2>
                                    <p
                                        className={`font-bold ${getStatusColor(
                                            request.accepted,
                                        )} p-2 rounded-md inline-block mt-2`}
                                    >
                                        Contrato: {request.accepted ? 'ACEITO' : 'NÃO FOI ACEITO'}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <div className='mt-8'>
                <Button onClick={() => router.push(`/ServicesOptions/Caregiver-Controller/List-Service/${id}`)}>
                    Voltar
                </Button>
            </div>
        </div>
    );
};

export default ServiceRequestDetailsCaregiver;
