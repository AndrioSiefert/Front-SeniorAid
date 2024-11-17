import About from '@/components/About/about';
import Footer from '@/components/Footer/footer';
import News from '@/components/newSubject';
import CaregiverInformation from '@/components/indexInformation/CaregiverInformation';
import SeniorInformation from '@/components/indexInformation/SeniorInformation';
import Experience from '@/components/Experience/Experience';

export default function Home() {
    return (
        <div className='flex min-h-screen flex-col'>
            <About />
            <Experience />
            <SeniorInformation />
            <CaregiverInformation />
            <News />

            <Footer />
        </div>
    );
}
