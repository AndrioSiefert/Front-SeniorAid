import ISeniorService from '@/Interface/ISenior-Service';
import { Button } from '@/_components/ui/button';
import http from '@/http';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const EditContractSenior = () => {
    const router = useRouter();
    const { id } = router.query;
    const [contract, setContract] = useState<ISeniorService | null>(null);
    const [formData, setFormData] = useState({
        serviceType: '',
        dateService: '',
        startTime: '',
        endTime: '',
        medication: '',
        location: '',
        description: '',
        price: '',
        urgencyLevel: ''
    });

    useEffect(() => {
        if (id) {
            http.get(`/seniorService/${id}`).then((response) => {
                setContract(response.data);
                setFormData({
                    serviceType: response.data.serviceType,
                    dateService: response.data.dateService,
                    startTime: response.data.startTime,
                    endTime: response.data.endTime,
                    medication: response.data.medication,
                    location: response.data.location,
                    description: response.data.description,
                    price: response.data.price,
                    urgencyLevel: response.data.urgencyLevel
                });
            });
        }
    }, [id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (id) {
            http.put(`/seniorService/${id}`, formData).then((response) => {
                setContract(response.data);
                router.push(`/Senior-Controller/List-Service/${id}`);
            });
        }
    };

    if (!contract) {
        return (
            <div className='flex justify-center items-center h-screen'>
                Carregando...
            </div>
        );
    }

    return (
        <div className='max-w-3xl mx-auto mt-8 p-8 border rounded-lg shadow-md'>
            <h1 className='text-2xl font-bold mb-4'>
                Editar Contrato #{contract.id}
            </h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block font-bold'>Tipo de Serviço</label>
                    <input
                        type='text'
                        name='serviceType'
                        value={formData.serviceType}
                        onChange={handleChange}
                        className='w-full p-2 border rounded'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block font-bold'>Data</label>
                    <input
                        type='date'
                        name='dateService'
                        value={formData.dateService}
                        onChange={handleChange}
                        className='w-full p-2 border rounded'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block font-bold'>Horário</label>
                    <input
                        type='time'
                        name='startTime'
                        value={formData.startTime}
                        onChange={handleChange}
                        className='w-full p-2 border rounded'
                    />
                    <input
                        type='time'
                        name='endTime'
                        value={formData.endTime}
                        onChange={handleChange}
                        className='w-full p-2 border rounded mt-2'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block font-bold'>Medicação</label>
                    <input
                        type='text'
                        name='medication'
                        value={formData.medication}
                        onChange={handleChange}
                        className='w-full p-2 border rounded'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block font-bold'>Localização</label>
                    <input
                        type='text'
                        name='location'
                        value={formData.location}
                        onChange={handleChange}
                        className='w-full p-2 border rounded'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block font-bold'>Descrição</label>
                    <textarea
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                        className='w-full p-2 border rounded'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block font-bold'>Preço</label>
                    <input
                        type='text'
                        name='price'
                        value={formData.price}
                        onChange={handleChange}
                        className='w-full p-2 border rounded'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block font-bold'>Nível de Urgência</label>
                    <input
                        type='text'
                        name='urgencyLevel'
                        value={formData.urgencyLevel}
                        onChange={handleChange}
                        className='w-full p-2 border rounded'
                    />
                </div>
                <div className='mt-8 flex justify-between'>
                    <Button type='submit'>Salvar Alterações</Button>
                    <Button
                        onClick={() =>
                            router.push(`/Senior-Controller/MyService/${id}`)
                        }
                    >
                        Voltar
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditContractSenior;
