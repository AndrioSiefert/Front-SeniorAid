import React from 'react';

export default function News() {
    const news = [
        {
            title: 'Título da Notícia 1',
            description: 'Descrição breve da notícia 1.',
            date: '2024-07-17'
        },
        {
            title: 'Título da Notícia 2',
            description: 'Descrição breve da notícia 2.',
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
