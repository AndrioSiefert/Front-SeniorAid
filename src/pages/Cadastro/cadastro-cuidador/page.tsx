import { Button } from '@/_components/ui/button';
import { useState } from 'react';

interface Cep {
    cep?: string;
    rua?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
}

export default function CadastroCuidador() {
    const [enderecoCep, setCep] = useState<Cep>({});

    function manipularCep(e: React.ChangeEvent<HTMLInputElement>) {
        let cep = e.target.value.replace(/\D/g, '');
        setCep({
            cep
        });
        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then((resposta) => resposta.json())
                .then((dados) => {
                    setCep((cepAntigo) => ({
                        ...cepAntigo,
                        rua: dados.logradouro,
                        bairro: dados.bairro,
                        cidade: dados.localidade,
                        estado: dados.uf
                    }));
                });
        }
    }

    return (
        <div className='flex items-start justify-center min-h-screen bg-gradient-to-b from-blue-200 to-blue-500'>
            <form className='w-96 bg-white p-6 rounded-lg shadow-lg'>
                <label htmlFor='name' className='block'>
                    Nome:
                </label>
                <input
                    id='name'
                    type='text'
                    name='name'
                    className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    placeholder='Digite seu nome'
                />

                <label htmlFor='email' className='block mt-4'>
                    Email:
                </label>
                <input
                    id='email'
                    type='email'
                    name='email'
                    className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1'
                    placeholder='Digite seu e-mail'
                />

                <label htmlFor='password' className='block mt-4'>
                    Senha:
                </label>
                <input
                    id='password'
                    type='password'
                    name='password'
                    className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1'
                    placeholder='Digite uma senha'
                />

                <label htmlFor='password' className='block mt-4'>
                    Digite novamente a sua Senha:
                </label>
                <input
                    id='password'
                    type='password'
                    name='password'
                    className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1'
                    placeholder='Digite novamente a sua senha'
                />

                <label htmlFor='cpf' className='block mt-4'>
                    CPF:
                </label>
                <input
                    id='cpf'
                    type='text'
                    name='cpf'
                    maxLength={11}
                    className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1'
                    placeholder='Digite seu CPF'
                />

                <label htmlFor='description' className='block mt-4'>
                    Descrição:
                </label>
                <textarea
                    id='description'
                    name='description'
                    className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1'
                    placeholder='Digite uma descrição sobre você'
                ></textarea>

                <label htmlFor='cep' className='block mt-4'>
                    CEP:
                </label>
                <input
                    id='cep'
                    type='text'
                    name='cep'
                    className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1'
                    placeholder='Digite o CEP'
                    onChange={manipularCep}
                    maxLength={8}
                />
                <ul>
                    <li>CEP: {enderecoCep.cep}</li>
                    <li>Bairro: {enderecoCep.bairro}</li>
                    <li>Cidade: {enderecoCep.cidade}</li>
                    <li>Estado: {enderecoCep.estado}</li>
                </ul>
                <label htmlFor='phone' className='block mt-4'>
                    Telefone:
                </label>
                <input
                    id='phone'
                    type='text'
                    name='phone'
                    className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1'
                    placeholder='Digite seu telefone'
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
