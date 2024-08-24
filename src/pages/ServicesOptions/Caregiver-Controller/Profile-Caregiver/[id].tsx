import ICaregiver from '@/Interface/ICaregiver';
import http from '@/http';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ProfileCaregiver() {
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = useState<ICaregiver | null>(null);
    const [editing, setEditing] = useState(false);
    const [editFormData, setEditFormData] = useState<ICaregiver | null>(null);
    const [originalData, setOriginalData] = useState<ICaregiver | null>(null);

    const params = useParams();
    useEffect(() => {
        if (id) {
            http.get(`caregiver/${id}`)
                .then((res) => {
                    setUser(res.data);
                    setEditFormData(res.data);
                    setOriginalData(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [id]);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (editFormData) {
                const updatedUser = await http.put(
                    `caregiver/${params.id}`,
                    editFormData
                );
                setUser(updatedUser.data);
                setEditing(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { id, value } = e.target;
        if (editFormData) {
            setEditFormData({
                ...editFormData,
                [id]: value
            });
        }
    };

    const handleEditClick = () => {
        setEditing(true);
        if (user) {
            setEditFormData(user);
        }
    };

    const handleCancelEdit = () => {
        setEditing(false);
        if (originalData) {
            setEditFormData(originalData);
        }
    };

    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-2xl font-bold mb-4'>Perfil do Usuário</h1>
            {editing ? (
                <form onSubmit={handleSubmit} className='w-full max-w-md'>
                    <div className='mb-4'>
                        <label
                            htmlFor='name'
                            className='block text-gray-700 font-bold mb-2'
                        >
                            Nome:
                        </label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            value={editFormData?.name || ''}
                            onChange={handleChange}
                            placeholder='Nome'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            htmlFor='cpf'
                            className='block text-gray-700 font-bold mb-2'
                        >
                            CPF:
                        </label>
                        <input
                            type='text'
                            id='cpf'
                            name='cpf'
                            value={editFormData?.cpf || ''}
                            onChange={handleChange}
                            placeholder='CPF'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            htmlFor='description'
                            className='block text-gray-700 font-bold mb-2'
                        >
                            Descrição:
                        </label>
                        <textarea
                            id='description'
                            name='description'
                            value={editFormData?.description || ''}
                            onChange={handleChange}
                            placeholder='Descrição'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            htmlFor='phone'
                            className='block text-gray-700 font-bold mb-2'
                        >
                            Telefone:
                        </label>
                        <input
                            type='text'
                            id='phone'
                            name='phone'
                            value={editFormData?.phone || ''}
                            onChange={handleChange}
                            placeholder='Telefone'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            htmlFor='cep'
                            className='block text-gray-700 font-bold mb-2'
                        >
                            CEP:
                        </label>
                        <input
                            type='text'
                            id='cep'
                            name='cep'
                            value={editFormData?.cep || ''}
                            onChange={handleChange}
                            placeholder='CEP'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            htmlFor='street'
                            className='block text-gray-700 font-bold mb-2'
                        >
                            Rua:
                        </label>
                        <input
                            type='text'
                            id='street'
                            name='street'
                            value={editFormData?.street || ''}
                            onChange={handleChange}
                            placeholder='Rua'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            htmlFor='neighborhood'
                            className='block text-gray-700 font-bold mb-2'
                        >
                            Bairro:
                        </label>
                        <input
                            type='text'
                            id='neighborhood'
                            name='neighborhood'
                            value={editFormData?.neighborhood || ''}
                            onChange={handleChange}
                            placeholder='Bairro'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            htmlFor='city'
                            className='block text-gray-700 font-bold mb-2'
                        >
                            Cidade:
                        </label>
                        <input
                            type='text'
                            id='city'
                            name='city'
                            value={editFormData?.city || ''}
                            onChange={handleChange}
                            placeholder='Cidade'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            htmlFor='state'
                            className='block text-gray-700 font-bold mb-2'
                        >
                            Estado:
                        </label>
                        <input
                            type='text'
                            id='state'
                            name='state'
                            value={editFormData?.state || ''}
                            onChange={handleChange}
                            placeholder='Estado'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            htmlFor='address_number'
                            className='block text-gray-700 font-bold mb-2'
                        >
                            Número do Endereço:
                        </label>
                        <input
                            type='text'
                            id='address_number'
                            name='address_number'
                            value={editFormData?.address_number || ''}
                            onChange={handleChange}
                            placeholder='Nmero do Endereço'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            htmlFor='photo'
                            className='block text-gray-700 font-bold mb-2'
                        >
                            Foto:
                        </label>
                        <input
                            type='text'
                            id='photo'
                            name='photo'
                            value={editFormData?.photo || ''}
                            onChange={handleChange}
                            placeholder='URL da Foto'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                    <button
                        type='submit'
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    >
                        Salvar
                    </button>
                </form>
            ) : (
                <div className='text-left'>
                    <p>
                        <strong>Nome:</strong> {user?.name}
                    </p>
                    <p>
                        <strong>CPF:</strong> {user?.cpf}
                    </p>
                    <p>
                        <strong>Descrição:</strong> {user?.description}
                    </p>
                    <p>
                        <strong>Telefone:</strong> {user?.phone}
                    </p>
                    <p>
                        <strong>CEP:</strong> {user?.cep}
                    </p>
                    <p>
                        <strong>Rua:</strong> {user?.street}
                    </p>
                    <p>
                        <strong>Bairro:</strong> {user?.neighborhood}
                    </p>
                    <p>
                        <strong>Cidade:</strong> {user?.city}
                    </p>
                    <p>
                        <strong>Estado:</strong> {user?.state}
                    </p>
                    <p>
                        <strong>Número do Endereço:</strong>{' '}
                        {user?.address_number}
                    </p>
                    <p>
                        <strong>Foto:</strong> {user?.photo}
                    </p>
                    <button
                        onClick={handleEditClick}
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
                    >
                        Editar
                    </button>
                </div>
            )}
        </div>
    );
}
