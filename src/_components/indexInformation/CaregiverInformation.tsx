import Image from 'next/image';

export default function CaregiverInformation() {
    return (
        <div className='flex  justify-center relative bg-colorInformationCaregiver p-8 md:space-x-4'>
            <div className='absolute right-0 bottom-0 md:w-2/3 lg:w-1/2'>
                <Image
                    src='/caregiverLeft.png'
                    alt='Caregiver'
                    width={900}
                    height={900}
                    className='hidden md:block'
                />
            </div>

            <div className='relative space-y-8 md:w-1/2 md:ml-[300px] lg:ml-[400px]'>
                <div className="bg-yellow-200 p-6 rounded-xl shadow-md relative before:content-[''] before:absolute before:w-6 before:h-6 before:bg-yellow-200 before:rotate-45 before:-right-3 before:top-5">
                    <h1 className='fenix text-3xl font-semibold text-center text-gray-700 mb-4'>
                        O QUE É NECESSÁRIO PARA SER UM CUIDADOR DE IDOSOS??
                    </h1>
                    <p className='text-gray-600 leading-relaxed text-lg'>
                        Para se tornar um cuidador de idosos, você deve possuir
                        características essenciais como paciência,
                        responsabilidade, empatia e habilidades de comunicação.
                        Também é importante ter conhecimentos básicos de saúde e
                        primeiros socorros. Um bom cuidador precisa estar
                        preparado para lidar com diferentes situações, desde
                        tarefas diárias até emergências, garantindo o bem-estar
                        físico e emocional do idoso.
                    </p>
                </div>

                <div>
                    <div className="bg-yellow-200 md:mr-32 md:mt-16 p-6 rounded-xl shadow-md relative before:content-[''] before:absolute before:w-6 before:h-6 before:bg-yellow-200 before:rotate-45 before:-right-3 before:top-5">
                        <h1 className='fenix text-3xl font-semibold text-center text-gray-700 mb-4'>
                            Como se tornar um cuidador de idosos?
                        </h1>
                        <p className='text-gray-600 leading-relaxed text-lg'>
                            Para atuar como cuidador, você pode fazer cursos
                            específicos oferecidos por instituições
                            especializadas em cuidados geriátricos ou
                            plataformas online. Ter certificações aumenta suas
                            chances no mercado. Além disso, ganhar experiência
                            prática é fundamental. Muitas vezes, começar em
                            funções assistenciais pode ajudar a construir um bom
                            histórico profissional e desenvolver suas
                            habilidades no cuidado com idosos.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
