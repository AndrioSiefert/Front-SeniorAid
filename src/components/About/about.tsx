import { useState, useEffect } from 'react';

export default function About() {
    const slides = [
        {
            title: 'Quem Somos?',
            content: 'Na nossa empresa, acreditamos no poder da conexão...',
        },
        {
            title: 'Nossa Missão',
            content: 'Simplificar a vida daqueles que cuidam dos que mais amam...',
        },
        {
            title: 'Por que Escolher-nos?',
            content: 'Unimos cuidadores dedicados a pessoas que precisam de cuidados especiais...',
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
        }, 3000);

        return () => clearInterval(interval);
    }, [slides.length]);

    const goToSlide = (index: any) => setCurrentSlide(index);

    return (
        <section className='flex bg-colorTextHeader px-8 py-20 text-white md:px-20'>
            <div className='relative mx-auto max-w-4xl overflow-hidden text-center'>
                <div
                    className='flex w-full transition-transform duration-500 ease-in-out'
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {slides.map((slide, index) => (
                        <div key={index} className='w-full flex-shrink-0'>
                            <h1 className='oleoScript-regular mb-8 text-4xl font-bold md:text-6xl'>{slide.title}</h1>
                            <p className='MontaguSlab text-lg leading-relaxed md:text-2xl'>{slide.content}</p>
                        </div>
                    ))}
                </div>
                <div className='mt-8 flex justify-center space-x-4'>
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-3 w-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-gray-500'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
