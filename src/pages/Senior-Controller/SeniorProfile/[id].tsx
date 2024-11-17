import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ISenior from '@/Interface/ISenior';
import http from '@/http';
import { Button } from '@/components/ui/button';

const ProfileSenior = () => {
    const [senior, setSenior] = useState<ISenior | null>(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            http.get<ISenior>(`/senior/${id}`)
                .then((response) => setSenior(response.data))
                .catch((error) => console.error('Error fetching senior profile:', error));
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSenior((prevSenior) => (prevSenior ? { ...prevSenior, [name]: value } : null));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (senior && id) {
            http.put(`/senior/${id}`, senior)
                .then(() => alert('Alterado com sucesso!'))
                .catch((error) => console.error('Error updating profile:', error));
        }
    };

    if (!senior) return <div className='text-center text-xl'>Loading...</div>;

    return (
        <div className='mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md'>
            <h1 className='mb-6 text-center text-2xl font-bold'>Meu Perfil</h1>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <label className='block'>
                        <span className='text-gray-700'>Name:</span>
                        <input
                            type='text'
                            name='name'
                            value={senior.name}
                            onChange={handleChange}
                            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                        />
                    </label>

                    <label className='block'>
                        <span className='text-gray-700'>CPF:</span>
                        <input
                            type='text'
                            name='cpf'
                            value={senior.cpf}
                            onChange={handleChange}
                            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                        />
                    </label>
                    <label className='block'>
                        <span className='text-gray-700'>Age:</span>
                        <input
                            type='number'
                            name='age'
                            value={senior.age}
                            onChange={handleChange}
                            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                        />
                    </label>
                    <label className='block'>
                        <span className='text-gray-700'>Phone:</span>
                        <input
                            type='text'
                            name='phone'
                            value={senior.phone}
                            onChange={handleChange}
                            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                        />
                    </label>
                    <label className='block'>
                        <span className='text-gray-700'>CEP:</span>
                        <input
                            type='text'
                            name='cep'
                            value={senior.cep}
                            onChange={handleChange}
                            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                        />
                    </label>
                    <label className='block'>
                        <span className='text-gray-700'>Street:</span>
                        <input
                            type='text'
                            name='street'
                            value={senior.street}
                            onChange={handleChange}
                            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                        />
                    </label>
                    <label className='block'>
                        <span className='text-gray-700'>Neighborhood:</span>
                        <input
                            type='text'
                            name='neighborhood'
                            value={senior.neighborhood}
                            onChange={handleChange}
                            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                        />
                    </label>
                    <label className='block'>
                        <span className='text-gray-700'>City:</span>
                        <input
                            type='text'
                            name='city'
                            value={senior.city}
                            onChange={handleChange}
                            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                        />
                    </label>
                    <label className='block'>
                        <span className='text-gray-700'>State:</span>
                        <input
                            type='text'
                            name='state'
                            value={senior.state}
                            onChange={handleChange}
                            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                        />
                    </label>
                    <label className='block'>
                        <span className='text-gray-700'>Address Number:</span>
                        <input
                            type='text'
                            name='address_number'
                            value={senior.address_number}
                            onChange={handleChange}
                            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                        />
                    </label>
                </div>
                <Button
                    type='submit'
                    className='w-full rounded-md bg-blue-500 px-4 py-2 text-white shadow-sm hover:bg-blue-600'
                >
                    Salvar
                </Button>
            </form>
        </div>
    );
};

export default ProfileSenior;
