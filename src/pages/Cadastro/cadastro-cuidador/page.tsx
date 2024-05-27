import ErrorMessage from '@/_components/ErrorMessage/error';
import { Button } from '@/_components/ui/button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

// interface Cep {
//     cep?: string;
//     rua?: string;
//     bairro?: string;
//     cidade?: string;
//     estado?: string;
// }

interface FormProps {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    cpf: string;
    description: string;
    address: string;
    address_number: string;
    phone: string;
}

export default function CadastroCuidador() {
    // const [enderecoCep, setCep] = useState<Cep>({});
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<FormProps>();

    const senha = watch('password');
    const validaSenha = {
        obrigatorio: (e: string) =>
            !!e || 'Por favor, preencha este campo novamente',
        tamanhoMinimo: (e: string) =>
            e.length >= 6 || 'Senha deve ter no mínimo 6 caracteres',
        senhaIgual: (e: string) => e === senha || 'As senhas não são iguais'
    };

    // function manipularCep(e: React.ChangeEvent<HTMLInputElement>) {
    //     let cep = e.target.value.replace(/\D/g, '');
    //     setCep({
    //         cep
    //     });
    //     if (cep.length === 8) {
    //         fetch(`https://viacep.com.br/ws/${cep}/json/`)
    //             .then((resposta) => resposta.json())
    //             .then((dados) => {
    //                 setCep((cepAntigo) => ({
    //                     ...cepAntigo,
    //                     rua: dados.logradouro,
    //                     bairro: dados.bairro,
    //                     cidade: dados.localidade,
    //                     estado: dados.uf
    //                 }));
    //             });
    //     }
    // }

    async function onSubmit(data: FormProps) {
        //    console.log(data);
        const user = await fetch('http://localhost:8000/user', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ ...data })
        });
        if (user.status == 200) {
            alert('Ok! user cadastrado com sucesso');
        } else {
            alert('Erro ao cadastrar o user');
        }
    }

    return (
        <div className='flex items-start justify-center min-h-screen bg-gradient-to-b from-blue-200 to-blue-500'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='w-96 bg-white p-6 rounded-lg shadow-lg'
            >
                <label htmlFor='name' className='block'>
                    Nome:
                </label>
                <input
                    id='name'
                    type='text'
                    className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                        errors.name ? 'border-red-500' : ''
                    }`}
                    placeholder='Digite seu nome'
                    {...register('name', { required: 'O nome é obrigatório' })}
                />
                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}

                <label htmlFor='email' className='block mt-4'>
                    Email:
                </label>
                <input
                    id='email'
                    type='email'
                    className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1  ${
                        errors.email ? 'border-red-500' : ''
                    }`}
                    placeholder='Digite seu e-mail'
                    {...register('email', { required: 'Email obrigatório' })}
                />
                {errors.email && (
                    <ErrorMessage>{errors.email.message}</ErrorMessage>
                )}

                <label htmlFor='password' className='block mt-4'>
                    Senha:
                </label>
                <input
                    id='password'
                    type='password'
                    className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1 ${
                        errors.password ? 'border-red-500' : ''
                    }`}
                    placeholder='Digite uma senha'
                    {...register('password', {
                        required: 'Senha obrigatória',
                        minLength: {
                            value: 6,
                            message: 'Senha deve ter no mínimo 6 caracteres'
                        }
                    })}
                />
                {errors.password && (
                    <ErrorMessage>{errors.password.message}</ErrorMessage>
                )}

                <label htmlFor='password_confirmation' className='block mt-4'>
                    Confirmação de Senha:
                </label>
                <input
                    id='password_confirmation'
                    type='password'
                    className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1 ${
                        errors.password_confirmation ? 'border-red-500' : ''
                    }`}
                    placeholder='Repita a senha'
                    {...register('password_confirmation', {
                        required: 'Repita a senha',
                        validate: validaSenha
                    })}
                />
                {errors.password_confirmation && (
                    <ErrorMessage>
                        {errors.password_confirmation.message}
                    </ErrorMessage>
                )}

                <label htmlFor='cpf' className='block mt-4'>
                    CPF:
                </label>
                <input
                    id='cpf'
                    type='text'
                    maxLength={11}
                    className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1'
                    placeholder='Digite seu CPF'
                    {...register('cpf')}
                />

                <label htmlFor='description' className='block mt-4'>
                    Descrição:
                </label>
                <textarea
                    id='description'
                    className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1'
                    placeholder='Digite uma descrição sobre você'
                    {...register('description')}
                ></textarea>
                {/* 
                <label htmlFor='cep' className='block mt-4'>
                    CEP:
                </label>
                <input
                    id='cep'
                    type='text'
                    className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1'
                    placeholder='Digite o CEP'
                    onChange={manipularCep}
                    maxLength={8}
                />
                <ul>
                    <li id='neighborhood'>Bairro: {enderecoCep.bairro}</li>
                    <li id='city'>Cidade: {enderecoCep.cidade}</li>
                    <li id='state'>Estado: {enderecoCep.estado}</li>
                </ul> */}

                <label htmlFor='address' className='block mt-4'>
                    Endereço
                </label>
                <input
                    id='address'
                    type='text'
                    className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1'
                    placeholder='Digite seu endereço'
                    {...register('address')}
                />

                <label htmlFor='address_number' className='block mt-4'>
                    Número da Casa:
                </label>
                <input
                    id='address_number'
                    type='text'
                    className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1'
                    placeholder='Digite o número da casa'
                    {...register('address_number')}
                />

                <label htmlFor='phone' className='block mt-4'>
                    Telefone:
                </label>
                <input
                    id='phone'
                    type='text'
                    className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1'
                    placeholder='Exemplo: (99) 99999-9999'
                    {...register('phone')}
                />

                <Button
                    type='submit'
                    className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                >
                    Criar Conta
                </Button>
            </form>
        </div>
    );
}
