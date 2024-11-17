import React, { useContext, useEffect, useState } from 'react';
import http from '@/http';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { LoginContext } from '@/context/LoginContext';
import ISeniorService from '@/Interface/ISenior-Service';

const SeniorProposals = () => {
    const router = useRouter();
    const [seniorServices, setSeniorServices] = useState<ISeniorService[]>([]);
    const { seniorId } = useContext(LoginContext);

    useEffect(() => {
        if (seniorId) {
            http.get(`/seniorService/senior/${seniorId}`)
                .then((response) => {
                    console.log('Resposta da API:', response.data);
                    setSeniorServices(response.data);
                })
                .catch((error) => {
                    console.error('Erro ao carregar serviços do senior', error);
                });
        }
    }, [seniorId]);

    const deleteContract = (id: number) => {
        http.delete(`/seniorService/${id}`)
            .then(() => {
                console.log(`Contrato ${id} excluído com sucesso.`);
                // Atualiza a lista removendo o serviço excluído
                setSeniorServices((prevServices) => prevServices.filter((service) => service.id !== id));
            })
            .catch((error) => {
                console.error('Erro ao excluir contrato:', error);
            });
    };

    if (!seniorServices.length) {
        return (
            <div className='flex h-screen items-center justify-center'>
                <h1>Serviços não encontrados</h1>
            </div>
        );
    }

    return (
        <div className='mx-auto mt-8 max-w-5xl rounded-lg border p-8 shadow-md'>
            <h1 className='mb-4 text-2xl font-bold'>Detalhes dos Serviços do Senior</h1>
            {seniorServices.map((service) => (
                <div key={service.id} className='mb-4 border-b pb-4'>
                    <p>
                        <span className='font-bold'>Tipo de Serviço:</span> {service.serviceName}
                    </p>
                    <p>
                        <span className='font-bold'>Valor:</span> {service.price}
                    </p>
                    <p>
                        <span className='font-bold'>Descrição:</span> {service.description}
                    </p>
                    <div className='mt-2 flex justify-between'>
                        <Button onClick={() => router.push(`/Senior-Controller/SeniorServiceEdit/${service.id}`)}>
                            Editar Serviço
                        </Button>
                        <Button onClick={() => router.push(`/Senior-Controller/SeniorProposals/${service.id}`)}>
                            Ver Propostas
                        </Button>
                        <Button
                            onClick={() => service.id && deleteContract(service.id)}
                            className='rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700'
                        >
                            Excluir contrato
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SeniorProposals;
