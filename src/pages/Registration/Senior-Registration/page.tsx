import { Button } from '@/_components/ui/button';
import { useState } from 'react';

interface Cep {
    cep?: string;
    rua?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
}

export default function CadastroSenior() {
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
        <div>
            <div className='p-4'>
                <h1>CADASTRO SENIOR</h1>
            </div>

            <div className='flex items-start justify-center min-h-screen bg-gradient-to-b from-blue-200 to-blue-500'>
                <form className='w-96 bg-white p-6 rounded-lg shadow-lg'>
                    <label htmlFor='name'>Nome:</label>
                    <input
                        className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        id='name'
                        type='text'
                        placeholder='Nome'
                    ></input>
                    <label htmlFor='name'>CPF:</label>
                    <input
                        className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        id='cpf'
                        type='text'
                        placeholder='CPF'
                    ></input>

                    <label htmlFor='name'>Data de Nascimento:</label>
                    <input
                        className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        id='date'
                        type='text'
                        placeholder='Data de Nascimento'
                    ></input>
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

                    <label htmlFor='name'>Telefone:</label>
                    <input
                        className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        id='telefone'
                        type='text'
                        placeholder='Telefone'
                    ></input>
                    <label htmlFor='name'>Email:</label>
                    <input
                        className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        id='email'
                        type='text'
                        placeholder='E-mail'
                    ></input>
                    <label htmlFor='name'>Senha:</label>
                    <input
                        className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        id='password'
                        type='text'
                        placeholder='Senha'
                    ></input>
                </form>

                <Button>Cadastrar</Button>
            </div>
        </div>
    );
}
