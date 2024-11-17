import ISeniorService from '@/Interface/ISenior-Service';
import { Button } from '@/components/ui/button';
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
            http.get(`/seniorService/id/${id}`).then((response) => {
                setService(response.data);
                console.log('Service:', response.data);
            });
        }
    }, [id]);

    const requestService = () => {
        if (service && userId) {
            const serviceRequest = {
                caregiverId: userId,
                serviceId: service.id,
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
        <div className='rounded-lg bg-white p-4 shadow-md'>
            <h3 className='text-lg font-semibold'>{service.serviceName}</h3>

            <div className='my-4 border-b-2 border-t-2 border-gray-300 py-2'>
                <h4 className='text-lg font-semibold'>Informações do Idoso:</h4>
                <p className='text-gray-600'>Nome: {service.senior.name}</p>
                <p className='text-gray-600'>Idade: {service.senior.age} anos</p>
                <p className='text-gray-600'>
                    Localização: {service.senior.street}, {service.senior.neighborhood}, {service.senior.city}
                </p>
                <p className='text-gray-600'>Número da Casa: {service.senior.address_number}</p>
            </div>

            <div className='my-4 border-b-2 border-t-2 border-gray-300 py-2'>
                <h4 className='text-lg font-semibold'>Informações do Serviço:</h4>
                <p className='text-gray-600'>
                    Data do serviço:{' '}
                    {service.dateService ? formatISODateToBrazilian(service.dateService) : 'Data não disponível'}
                </p>
                <p className='text-gray-600'>Hora do serviço: {service.time}</p>
                <p className='text-gray-600'>Valor R$: {service.price}</p>
                <p className='text-gray-600'>Medicamentos: {service.medications}</p>
                <p className='text-gray-600'>Descrição: {service.description}</p>
            </div>

            <Button
                className='mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
                onClick={requestService}
            >
                Solicitar Serviço
            </Button>

            <Button
                className='mt-4 rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700'
                onClick={() => router.push('/Services-Controller/ServiceCaregiverList/page')}
            >
                Voltar
            </Button>
        </div>
    );
};

export default ContractSenior;
