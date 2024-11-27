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
    const { caregiverId } = useContext(LoginContext);
    const [service, setService] = useState<ISeniorService | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // Estado para controle de carregamento

    useEffect(() => {
        const fetchService = async () => {
            try {
                if (id) {
                    const response = await http.get(`/seniorService/id/${id}`);
                    setService(response.data);
                    console.log('Service:', response.data);
                }
            } catch (error) {
                console.error('Erro ao carregar serviço:', error);
                // Aqui você pode definir um estado de erro, caso queira exibir uma mensagem para o usuário
            } finally {
                setLoading(false); // Finaliza o carregamento
            }
        };

        fetchService();
    }, [id]);

    const requestService = async () => {
        if (service && caregiverId) {
            const serviceRequest = {
                caregiverId: caregiverId,
                serviceId: service.id, // Verifique o nome correto da propriedade
            };

            console.log('Dados do serviço:', service); // Verifica o serviço carregado
            console.log('ID do usuário:', caregiverId); // Verifica o ID do usuário logado
            console.log('Objeto enviado para a API:', serviceRequest); // Verifica o objeto antes de enviar

            try {
                const response = await http.post('/service-request', serviceRequest);
                console.log('Resposta da API:', response.data); // Verifica a resposta da API
                alert('Serviço solicitado com sucesso!');
            } catch (error) {
                console.error('Erro ao solicitar serviço:', error);
                alert('Erro ao solicitar o serviço. Tente novamente mais tarde.');
            }
        } else {
            console.error('Caregiver ID ou Serviço está ausente');
            alert('Informações do cuidador ou serviço estão faltando.');
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!service) {
        return <div>Serviço não encontrado</div>; // Caso não encontre o serviço
    }

    return (
        <div className='flex flex-col justify-center rounded-lg bg-white p-4 shadow-md'>
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

                <h3 className='text-lg'>{service.serviceName}</h3>

                <p className='text-gray-600'>
                    Data do serviço:{' '}
                    {service.dateService ? formatISODateToBrazilian(service.dateService) : 'Data não disponível'}
                </p>
                <p className='text-gray-600'>Hora do serviço: {service.time}</p>
                <p className='text-gray-600'>Valor R$: {service.price}</p>
                <p className='text-gray-600'>Medicamentos: {service.medications}</p>
                <p className='text-gray-600'>Descrição: {service.description}</p>
            </div>

            <div className='flex justify-center gap-3'>
                <Button
                    className='mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
                    onClick={requestService}
                >
                    Solicitar Serviço
                </Button>

                <Button
                    className='mt-4 rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700'
                    onClick={() => router.push('/List/ServiceToCaregiver/page')}
                >
                    Voltar
                </Button>
            </div>
        </div>
    );
};

export default ContractSenior;
