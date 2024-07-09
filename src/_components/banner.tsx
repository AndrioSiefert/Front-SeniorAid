import Image from 'next/image';

const Banner = () => {
    return (
        <div className='flex items-center justify-center w-full'>
            <Image
                src='/banner.png'
                alt='banner'
                width={1920}
                height={1080}
                className='w-full object-cover'
            ></Image>
        </div>
    );
};

export default Banner;
