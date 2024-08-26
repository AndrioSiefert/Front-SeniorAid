import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ISenior from '@/Interface/ISenior';
import http from '@/http';

const ProfileSenior = () => {
    const [senior, setSenior] = useState<ISenior | null>(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            http.get<ISenior>(`/senior/${id}`)
                .then((response) => setSenior(response.data))
                .catch((error) =>
                    console.error('Error fetching senior profile:', error)
                );
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSenior((prevSenior) =>
            prevSenior ? { ...prevSenior, [name]: value } : null
        );
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (senior && id) {
            http.put(`/senior/${id}`, senior)
                .then(() => alert('Alterado com sucesso!'))
                .catch((error) =>
                    console.error('Error updating profile:', error)
                );
        }
    };

    if (!senior) return <div className='text-center text-xl'>Loading...</div>;

    return (
        <div className='max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg'>
            <h1 className='text-2xl font-bold mb-6 text-center'>
                Edit Senior Profile
            </h1>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
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
                        <span className='text-gray-700'>Email:</span>
                        <input
                            type='email'
                            name='email'
                            value={senior.email}
                            onChange={handleChange}
                            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                        />
                    </label>
                    <label className='block'>
                        <span className='text-gray-700'>Password:</span>
                        <input
                            type='password'
                            name='password'
                            value={senior.password}
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
                    <label className='block'>
                        <span className='text-gray-700'>Description:</span>
                        <input
                            type='text'
                            name='description'
                            value={senior.description}
                            onChange={handleChange}
                            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                        />
                    </label>
                </div>
                <button
                    type='submit'
                    className='w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600'
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default ProfileSenior;
