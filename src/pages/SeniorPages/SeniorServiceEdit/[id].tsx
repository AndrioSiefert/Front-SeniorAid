import ISeniorService from '@/Interface/ISenior-Service';
import { Button } from '@/components/ui/button';
import http from '@/http';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const EditContractSenior = () => {
    const router = useRouter();
    const { id } = router.query;
    const [contract, setContract] = useState<ISeniorService | null>(null);
    const [formData, setFormData] = useState({
        serviceName: '',
        dateService: '',
        time: '',
        place: '',
        medications: '',
        description: '',
        price: '',
    });

    useEffect(() => {
        if (id) {
            http.get(`/seniorService/${id}`).then((response) => {
                setContract(response.data);
                setFormData({
                    serviceName: response.data.serviceName,
                    dateService: response.data.dateService,
                    time: response.data.time,
                    place: response.data.place,
                    medications: response.data.medications,
                    description: response.data.description,
                    price: response.data.price,
                });
            });
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (id) {
            http.put(`/seniorService/${id}`, formData).then((response) => {
                setContract(response.data);
                router.push(`/SeniorPages/SeniorServiceCreated/${id}`);
            });
        }
    };

    if (!contract) {
        return <div className='flex h-screen items-center justify-center'>Carregando...</div>;
    }

    return (
        <div className='mx-auto mt-8 max-w-3xl rounded-lg border p-8 shadow-md'>
            <h1 className='mb-4 text-2xl font-bold'>Editar Contrato #{contract.id}</h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block font-bold'>Tipo de Serviço</label>
                    <input
                        type='text'
                        name='serviceName'
                        value={formData.serviceName}
                        onChange={handleChange}
                        className='w-full rounded border p-2'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block font-bold'>Data</label>
                    <input
                        type='date'
                        name='dateService'
                        value={formData.dateService}
                        onChange={handleChange}
                        className='w-full rounded border p-2'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block font-bold'>Horário</label>
                    <input
                        type='time'
                        name='time'
                        value={formData.time}
                        onChange={handleChange}
                        className='w-full rounded border p-2'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block font-bold'>Medicação</label>
                    <input
                        type='text'
                        name='medications'
                        value={formData.medications}
                        onChange={handleChange}
                        className='w-full rounded border p-2'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block font-bold'>Localização</label>
                    <input
                        type='text'
                        name='place'
                        value={formData.place}
                        onChange={handleChange}
                        className='w-full rounded border p-2'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block font-bold'>Descrição</label>
                    <textarea
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                        className='w-full rounded border p-2'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block font-bold'>Preço</label>
                    <input
                        type='text'
                        name='price'
                        value={formData.price}
                        onChange={handleChange}
                        className='w-full rounded border p-2'
                    />
                </div>

                <div className='mt-8 flex justify-between'>
                    <Button type='submit'>Salvar Alterações</Button>
                    <Button onClick={() => router.push(`/SeniorPages/SeniorServiceCreated/${id}`)}>Voltar</Button>
                </div>
            </form>
        </div>
    );
};

export default EditContractSenior;
