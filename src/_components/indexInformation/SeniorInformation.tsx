import Image from 'next/image';

export default function SeniorInformation() {
    return (
        <div className='relative bg-colorHeader flex items-center justify-center p-8 md:space-x-4'>
            <div className='absolute left-0 bottom-0 md:w-2/3 lg:w-1/2'>
                <Image
                    src='/seniorRight.png'
                    alt='Elderly'
                    width={900}
                    height={900}
                    className='hidden md:block'
                />
            </div>

            <div className='relative z-10 space-y-8 w-full md:w-1/2 md:ml-8'>
                <div className="bg-yellow-200 p-6 rounded-xl shadow-md relative before:content-[''] before:absolute before:w-6 before:h-6 before:bg-yellow-200 before:rotate-45 before:-left-3 before:top-5">
                    <h1 className='fenix text-3xl font-semibold text-center text-gray-700 mb-4'>
                        COMO SEI SE PRECISO DE UM CUIDADOR?
                    </h1>
                    <p className='text-gray-600 leading-relaxed text-lg'>
                        Se você ou um ente querido está enfrentando dificuldades
                        para realizar tarefas diárias caomo se alimentar, se
                        higienizar ou se locomover, pode ser o momento de
                        considerar a contratação de um cuidador. Esse
                        profissional está capacitado para auxiliar em atividades
                        cotidianas, além de oferecer suporte emocional e ajudar
                        em questões de segurança, promovendo um ambiente
                        saudável e confortável.
                    </p>
                </div>

                <div className="bg-yellow-200 md:ml-32 md:mt-16 p-6 rounded-xl shadow-md relative before:content-[''] before:absolute before:w-6 before:h-6 before:bg-yellow-200 before:rotate-45 before:-left-3 before:top-5 ">
                    <h1 className='fenix text-3xl font-semibold text-center text-gray-700 mb-4'>
                        Como contratar um cuidador de idosos?
                    </h1>
                    <p className='text-gray-600 leading-relaxed text-lg'>
                        Ao contratar um cuidador de idosos, é essencial buscar
                        alguém capacitado e de confiança. Profissionais podem
                        ser encontrados por meio de agências especializadas ou
                        plataformas online. Antes de finalizar a contratação,
                        verifique as referências e experiência do cuidador para
                        garantir que ele seja qualificado e compatível com as
                        necessidades do idoso, garantindo um cuidado de
                        qualidade.
                    </p>
                </div>
            </div>
        </div>
    );
}
