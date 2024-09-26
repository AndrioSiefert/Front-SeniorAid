import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

export default function Experience() {
    const UserExperience = [
        {
            name: 'Maria',
            category: 'Senior',
            comment: 'Eu Amei a experiência de contratar um cuidador.',
            photo: 'https://randomuser.me/api/portraits/women/60.jpg'
        },
        {
            name: 'José',
            category: 'Cuidador',
            comment: 'Trabalhar com idosos me trouxe muita gratificação.',
            photo: 'https://randomuser.me/api/portraits/men/16.jpg'
        },
        {
            name: 'Ana',
            category: 'Senior',
            comment: 'Ter um cuidador fez toda a diferença na minha vida.',
            photo: 'https://randomuser.me/api/portraits/women/55.jpg'
        },
        {
            name: 'Lucas',
            category: 'Cuidador',
            comment: 'Cada experiência me enriquece como profissional.',
            photo: 'https://randomuser.me/api/portraits/men/20.jpg'
        },
        {
            name: 'Maicon',
            category: 'Cuidador',
            comment: 'Cada experiência me enriquece como profissional.',
            photo: 'https://randomuser.me/api/portraits/men/44.jpg'
        }
    ];

    return (
        <div className='max-w-7xl mx-auto py-10 px-4'>
            <h1 className='text-4xl font-bold text-center text-gray-800 mb-10 oleoScript-regular'>
                Como foi a experiência dos nossos usuários?
            </h1>

            <div className='flex space-x-6  '>
                {UserExperience.map((item, index) => (
                    <div
                        key={index}
                        className='min-w-[250px] bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg rounded-lg p-4 text-center hover:scale-105 transform transition-all duration-300'
                    >
                        <Image
                            src={item.photo}
                            alt={item.name}
                            width={100}
                            height={100}
                            className='mx-auto rounded-full border-4 border-blue-300'
                        />

                        <h2 className='text-lg font-semibold text-gray-900 mt-4'>
                            {item.name}
                        </h2>
                        <h3 className='text-sm font-medium text-gray-600'>
                            {item.category}
                        </h3>
                        <p className='mt-2 text-gray-700 italic'>
                            {item.comment}
                        </p>

                        <div className='flex justify-center mt-4 text-yellow-400'>
                            {[...Array(5)].map((_, starIndex) => (
                                <FaStar
                                    key={starIndex}
                                    className='animate-pulse'
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
