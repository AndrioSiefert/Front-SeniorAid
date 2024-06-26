import Footer from '@/_components/Footer/footer';
import ListCaregivers from '@/_components/ListCare/list';
import About from '@/_components/about';
import Banner from '@/_components/banner';

export default function Home() {
    return (
        <div className='flex flex-col min-h-screen'>
            <main className='flex-grow'>
                <Banner />
                <About />

                <ListCaregivers />
            </main>

            <Footer />
        </div>
    );
}
