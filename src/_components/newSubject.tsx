import React from 'react';

export default function News() {
    const news = [
        {
            title: 'Posso ser um Cuidador de Idosos?',
            description: 'PROJETO DE LEI N.º 4.702, DE 2012',
            site: 'https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=1053572&fis',
            date: '2024-07-17'
        },
        {
            title: 'Título da Notícia 2',
            description: 'PROJETO DE LEI N.º 4.702, DE 2012',
            date: '2024-07-16'
        }
    ];

    return (
        <section className='bg-gray-100 py-8'>
            <div className='container mx-auto px-4'>
                <h1 className='text-3xl font-bold mb-6'>Novas Notícias</h1>
                <div className='grid gap-6'>
                    {news.map((item, index) => (
                        <div
                            key={index}
                            className='bg-white p-6 rounded-lg shadow-md'
                        >
                            <h2 className='text-xl font-semibold mb-2'>
                                {item.title}
                            </h2>
                            {item.site && (
                                <a
                                    href={item.site}
                                    target='_blank'
                                    rel='noreferrer'
                                    className='text-blue-500'
                                >
                                    Leia mais
                                </a>
                            )}
                            <p className='text-gray-700 mb-4'>
                                {item.description}
                            </p>
                            <p className='text-gray-500 text-sm'>{item.date}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
