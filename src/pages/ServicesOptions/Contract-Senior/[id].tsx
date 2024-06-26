import ISeniorService from '@/Interface/ISenior-Service';
import { Button } from '@/_components/ui/button';
import http from '@/http';
import { formatISODateToBrazilian } from '@/utils/dateUtils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ContractSenior = () => {
    const router = useRouter();
    const { id } = router.query;
    const [contract, setContract] = useState<ISeniorService | null>(null);

    useEffect(() => {
        if (id) {
            http.get(`/seniorService/${id}`).then((response) => {
                setContract(response.data);
            });
        }
    }, [id]);

    if (!contract) {
        return (
            <div className='flex justify-center items-center h-screen'>
                Carregando...
            </div>
        );
    }

    const handleServiceRequest = async () => {
        try {
            const response = await http.post('/service-request', {
                contractId: id
            });
            console.log('Serviço solicitado com sucesso', response.data);
            // Redirecione para outra página se necessário
            router.push('/');
        } catch (error) {
            console.error('Erro ao solicitar serviço', error);
        }
    };

    return (
        <div className='max-w-3xl mx-auto mt-8 p-8 border rounded-lg shadow-md'>
            <h1 className='text-2xl font-bold mb-4'>{contract.serviceType}</h1>

            <p>
                <span className='font-bold'>Data:</span>{' '}
                {contract.dateService
                    ? formatISODateToBrazilian(contract.dateService.toString())
                    : ''}
            </p>
            <p>
                <span className='font-bold'>Horário:</span> {contract.startTime}{' '}
                - {contract.endTime}
            </p>
            <p>
                <span className='font-bold'>Medicação:</span>{' '}
                {contract.medication}
            </p>
            <p>
                <span className='font-bold'>Localização:</span>{' '}
                {contract.location}
            </p>
            <p>
                <span className='font-bold'>Descrição:</span>{' '}
                {contract.description}
            </p>
            <p>
                <span className='font-bold'>Preço:</span> {contract.price}
            </p>
            <p>
                <span className='font-bold'>Nível de Urgência:</span>{' '}
                {contract.urgencyLevel}
            </p>
            {contract.senior && (
                <div className='mt-4'>
                    <h2 className='text-xl font-bold mb-2'>Dados do Senior</h2>
                    <p>
                        <span className='font-bold'>Nome:</span>{' '}
                        {contract.senior.name}
                    </p>
                    <p>
                        <span className='font-bold'>CPF:</span>{' '}
                        {contract.senior.cpf}
                    </p>
                    <p>
                        <span className='font-bold'>Descrição:</span>{' '}
                        {contract.senior.description}
                    </p>
                    <p>
                        <span className='font-bold'>Tipo de Usuário:</span>{' '}
                        {contract.senior.userType}
                    </p>
                </div>
            )}

            <div className='mt-8 flex justify-between'>
                <Button onClick={handleServiceRequest}>
                    Solicitar Serviço
                </Button>

                <Button
                    onClick={() =>
                        router.push(
                            '/ServicesOptions/List-Service/Order-SeniorList/page'
                        )
                    }
                >
                    Voltar
                </Button>
            </div>
        </div>
    );
};

export default ContractSenior;
