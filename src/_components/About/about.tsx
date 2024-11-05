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
            setCurrentSlide(prevSlide => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
        }, 3000);

        return () => clearInterval(interval);
    }, [slides.length]);

    const goToSlide = (index: any) => setCurrentSlide(index);

    return (
        <section className='flex bg-colorTextHeader text-white py-20 px-8 md:px-20'>
            <div className='max-w-4xl mx-auto text-center relative overflow-hidden'>
                <div
                    className='w-full flex transition-transform ease-in-out duration-500'
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {slides.map((slide, index) => (
                        <div key={index} className='w-full flex-shrink-0'>
                            <h1 className='text-4xl md:text-6xl font-bold mb-8 oleoScript-regular'>
                                {slide.title}
                            </h1>
                            <p className='text-lg md:text-2xl leading-relaxed MontaguSlab'>
                                {slide.content}
                            </p>
                        </div>
                    ))}
                </div>
                <div className='flex justify-center space-x-4 mt-8'>
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full ${
                                currentSlide === index ? 'bg-white' : 'bg-gray-500'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
