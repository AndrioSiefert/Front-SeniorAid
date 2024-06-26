import { useState } from 'react';

export default function About() {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className='p-4'>
            <section className='max-w-3xl mx-auto'>
                <h1 className=' noto-sans text-3xl font-bold mb-4 text-center'>
                    Como eu sei que preciso de um cuidador?
                </h1>
                <div
                    className={` noto-sans overflow-hidden transition-all duration-500 ${
                        isExpanded ? 'max-h-full' : 'max-h-20'
                    } rounded-lg border border-gray-300 shadow-md p-4 text-lg text-gray-800 font-medium leading-relaxed`}
                >
                    <p>
                        Veja algumas situações que demonstram que um cuidador
                        profissional pode ajudar você e sua família:
                    </p>
                    <ul className='list-disc list-inside'>
                        <li>
                            Amo meus avós mas estou cada vez mais estressada em
                            função do cuidado com eles
                        </li>
                        <li>
                            Cuido de meus pais e não consigo descansar nem aos
                            finais de semana
                        </li>
                        <li>
                            Estou preocupado com meu pai idoso e isto tem
                            atrapalhado meu sono
                        </li>
                        <li>
                            Eu e meu irmão estamos trabalhando e estudando muito
                            e não temos tempo para cuidar da minha mãe
                        </li>
                        <li>
                            Meus irmãos não ajudam no cuidado com papai e mamãe,
                            que já estão senis
                        </li>
                        <li>
                            Meu cuidador particular conseguiu um outro emprego e
                            não conheço ninguém de confiança para cuidar de meu
                            avô
                        </li>
                        <li>
                            Meu cuidador de idosos precisa tirar férias e
                            preciso de um cuidador folguista
                        </li>
                        <li>
                            É a segunda vez que minha avó cai esta semana, estou
                            com medo que quebre um braço ou uma perna
                        </li>
                        <li>
                            Não tenho mais vida social desde que passei a cuidar
                            de minha mãe
                        </li>
                        <li>
                            A cuidadora de idosos que contratei não veio
                            trabalhar
                        </li>
                        <li>
                            Gasto cada vez mais com cuidadores de idosos mas
                            isto não se reflete em mais qualidade de vida para
                            meus idosos queridos
                        </li>
                        <li>
                            Não tenho mais tempo para cuidar de mim, só tenho
                            tempo para cuidar de meus pais
                        </li>
                        <li>
                            Meus pais ofereceram o melhor para mim, só posso
                            retribuir todo esse cuidado a eles
                        </li>
                        <li>
                            Deixei minha mãe internada no hospital e deram uma
                            medicação errada, preciso de alguém que acompanhe
                            isso
                        </li>
                        <li>
                            Faço o que posso mas não é suficiente. Estou
                            cansada, preciso de ajuda!
                        </li>
                    </ul>
                </div>
                <button
                    onClick={toggleExpand}
                    className='text-blue-500 mt-2 float-right'
                >
                    {isExpanded ? 'Recolher' : 'Expandir'}
                </button>
            </section>
        </div>
    );
}
