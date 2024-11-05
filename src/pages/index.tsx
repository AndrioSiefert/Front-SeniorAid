import About from '@/_components/About/about';
import Footer from '@/_components/Footer/footer';
import News from '@/_components/newSubject';
import CaregiverInformation from '@/_components/indexInformation/CaregiverInformation';
import SeniorInformation from '@/_components/indexInformation/SeniorInformation';
import Experience from '@/_components/Experience/Experience';

export default function Home() {
    return (
        <div className='flex flex-col min-h-screen'>
            <About />
            <Experience />
            <SeniorInformation />
            <CaregiverInformation />
            <News />

            <Footer />
        </div>
    );
}
