import React, { useContext, useEffect, useState } from 'react';
import http from '@/http';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { LoginContext } from '@/context/LoginContext';
import ICaregiverServiceForm from '@/Interface/ICaregiver-Service';

const CaregiverServiceComponent = () => {
    const router = useRouter();
    const [caregiverService, setCaregiverService] = useState<ICaregiverServiceForm | null>(null);
    const { caregiverId } = useContext(LoginContext);

    useEffect(() => {
        if (caregiverId) {
            http.get(`/caregiver-service/${caregiverId}`)
                .then((response) => {
                    setCaregiverService(response.data);
                })
                .catch((error) => {
                    console.error('Erro ao carregar serviço do cuidador', error);
                });
        }
    }, [caregiverId]);

    const deleteContract = (id: number | undefined) => {
        if (id) {
            http.delete(`/caregiver-service/${id}`)
                .then(() => {
                    console.log(`Contrato ${id} excluído com sucesso.`);
                    router.push('/');
                })
                .catch((error) => {
                    console.error('Erro ao excluir contrato:', error);
                });
        }
    };

    if (!caregiverService) {
        return (
            <div className='flex h-screen items-center justify-center'>
                <h1>Nenhum serviço encontrado</h1>
            </div>
        );
    }

    return (
        <div className='mx-auto mt-8 max-w-3xl rounded-lg border p-8 shadow-md'>
            <h1 className='mb-4 text-2xl font-bold'>Detalhes do Serviço do Cuidador</h1>

            <p>
                <span className='font-bold'>Qualificação:</span> {caregiverService.preference}
            </p>
            <p>
                <span className='font-bold'>Habilidades:</span> {caregiverService.experience}
            </p>
            <p>
                <span className='font-bold'>Sobre Mim:</span> {caregiverService.about}
            </p>
            <p>
                <span className='font-bold'>Experiência:</span> {caregiverService.experience}
            </p>
            <p>
                <span className='font-bold'>Preço:</span> {caregiverService.price}
            </p>

            <div className='mt-8 flex justify-between'>
                <Button onClick={() => router.push(`/CaregiverPages/ProposalsSubmitted/${caregiverService.id}`)}>
                    Ver Propostas
                </Button>
                <Button
                    onClick={() => deleteContract(caregiverService.id)}
                    className='rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700'
                >
                    Excluir contrato
                </Button>
            </div>
        </div>
    );
};

export default CaregiverServiceComponent;
