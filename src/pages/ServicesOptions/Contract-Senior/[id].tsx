import ISeniorService from '@/Interface/ISenior-Service';
import { Button } from '@/_components/ui/button';
import { LoginContext } from '@/context/LoginContext';
import http from '@/http';
import { formatISODateToBrazilian } from '@/utils/dateUtils';
import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';

const ContractSenior = () => {
    const router = useRouter();
    const { id } = router.query;
    const { userId } = useContext(LoginContext);
    const [service, setService] = useState<ISeniorService | null>(null);

    useEffect(() => {
        if (id) {
            http.get(`/seniorService/${id}`).then((response) => {
                setService(response.data);
                console.log('Service:', response.data);
            });
        }
    }, [id]);

    const requestService = () => {
        if (service && userId) {
            const serviceRequest = {
                caregiverId: userId,
                serviceId: service.id
            };

            http.post('http://localhost:8000/service-request', serviceRequest)
                .then((response) => {
                    alert('Serviço solicitado com sucesso!');
                })
                .catch((error) => {
                    console.error('Erro ao solicitar serviço:', error);
                });
        } else {
            console.error('Caregiver ID or Service is missing');
        }
    };

    if (!service) {
        return <div>Carregando...</div>;
    }

    return (
        <div className='p-4 bg-white rounded-lg shadow-md'>
            <h3 className='text-lg font-semibold'>{service.serviceType}</h3>

            <p className='text-gray-600'>Nome: {service.senior.name}</p>
            <p className='text-gray-600'>
                Data: {formatISODateToBrazilian(service.dateService)}
            </p>
            <p className='text-gray-600'>Valor: {service.price}</p>
            <p className='text-gray-600'>Localização: {service.location}</p>
            <p className='text-gray-600'>
                Nível de Urgência: {service.urgencyLevel}
            </p>
            <p className='text-gray-600'>Descrição: {service.description}</p>

            <Button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
                onClick={requestService}
            >
                Solicitar Serviço
            </Button>

            <Button
                className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4'
                onClick={() =>
                    router.push('/List-Service/Order-SeniorList/page')
                }
            >
                Voltar
            </Button>
        </div>
    );
};

export default ContractSenior;
