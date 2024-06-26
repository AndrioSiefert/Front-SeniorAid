import Image from 'next/image';

const Banner = () => {
    return (
        <div>
            <Image
                src='/banner.png'
                alt='banner'
                width={1920}
                height={1080}
            ></Image>
        </div>
    );
};

export default Banner;
