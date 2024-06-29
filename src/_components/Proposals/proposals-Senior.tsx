import ISeniorService from '@/Interface/ISenior-Service';
import http from '@/http';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SeniorProposals = () => {
    const router = useRouter();
    const [proposals, setProposals] = useState<ISeniorService[]>([]);

    useEffect(() => {
        http.get('/seniorService').then((response) => {
            setProposals(response.data);
        });
    }, []);

    const redirectToContract = (id: number | undefined) => {
        router.push(`/ServicesOptions/Contract-Senior/${id}`);
    };

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {proposals.map((service: ISeniorService) => (
                <div
                    key={service.id}
                    className='p-4 bg-white rounded-lg shadow-md'
                >
                    <h3 className='text-lg font-semibold'>
                        {service.serviceType}
                    </h3>
                    <p className='text-gray-600'>Valor: {service.price}</p>
                    <p className='text-gray-600'>
                        Localização: {service.location}
                    </p>
                    <p className='text-gray-600'>
                        Nível de Urgência: {service.urgencyLevel}
                    </p>
                    <p className='text-gray-600'>
                        Descrição: {service.description}
                    </p>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
                        onClick={() => redirectToContract(service.id)}
                    >
                        Ver contrato
                    </button>
                </div>
            ))}
        </div>
    );
};

export default SeniorProposals;