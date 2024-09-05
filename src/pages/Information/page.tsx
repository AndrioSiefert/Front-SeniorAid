import Image from 'next/image';
import { CiFileOn } from 'react-icons/ci';
import { FaRegHandshake } from 'react-icons/fa';
import { IoTriangleSharp } from 'react-icons/io5';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

export default function Information() {
    return (
        <div>
            <div className='relative flex items-center'>
                <div className='absolute top-1/2 left-4 transform -translate-y-1/2 z-10'>
                    <h1 className='text-white text-2xl font-bold'>
                        Seu Título
                    </h1>
                </div>
                <div className='relative overflow-hidden h-[50vh] w-full'>
                    <div className='relative h-full'>
                        <Image
                            src='/banner.jpg'
                            alt='Information'
                            width={1920}
                            height={1080}
                            layout='responsive'
                            objectFit='cover'
                            objectPosition='top'
                            className='w-full h-full'
                        />
                    </div>
                    <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent'></div>
                </div>
            </div>

            <div className='relative flex flex-col items-center py-4 bg-colorPageInfo text-white'>
                <h2 className='text-xl font-bold mb-2'>VEJA COMO FUNCIONA</h2>
                <div className='absolute bottom-[-16px] left-1/2 transform -translate-x-1/2'>
                    <IoTriangleSharp
                        size={50}
                        className=' rotate-180 text-colorPageInfo'
                    />
                </div>
            </div>

            <div className='flex justify-center p-4 py-[127px] pb-[115px]'>
                <div className='max-w-4xl w-full'>
                    <ul className='flex justify-center space-x-8'>
                        <li className='flex flex-col items-center space-y-4 text-colorPageInfo'>
                            <CiFileOn size={50} />
                            <h3 className='text-xl font-bold mt-2'>
                                Publique uma Vaga
                            </h3>
                            <p className='text-black text-center'>
                                Publique a sua vaga para milhares de
                                profissionais. Você irá receber propostas em
                                poucos minutos.
                            </p>
                        </li>

                        <li className='flex flex-col items-center space-y-4 text-colorPageInfo'>
                            <FaRegHandshake size={50} />
                            <h3 className='text-xl font-bold mt-2'>Contrate</h3>
                            <p className='text-black text-center'>
                                Reveja o histórico de trabalho, feedback de
                                clientes e portfólio para limitar os candidatos.
                                Então faça uma entrevista pelo chat e escolha o
                                melhor.
                            </p>
                        </li>

                        <li className='flex flex-col items-center space-y-4 text-colorPageInfo'>
                            <RiMoneyDollarCircleLine size={50} />
                            <h3 className='text-xl font-bold mt-2'>
                                Pague com segurança
                            </h3>
                            <p className='text-black text-center'>
                                Com o pagamento seguro, o pagamento será
                                repassado para o cuidador somente quando o
                                trabalho estiver concluído.
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='relative'>
                <div className='absolute top-[-25px] left-1/2 transform -translate-x-1/2'>
                    <IoTriangleSharp
                        size={50}
                        className='rotate-180 text-white'
                    />
                </div>

                <div className='flex flex-col items-center py-4 bg-colorPageInfo2 text-white'>
                    <h2 className='text-xl font-bold mb-2 mt-6 '>
                        PERGUNTAS RECENTES
                    </h2>
                </div>
            </div>
        </div>
    );
}
