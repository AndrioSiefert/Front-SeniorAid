import Footer from '@/_components/Footer/footer';
import ListCaregivers from '@/_components/ListCare/list';
import About from '@/_components/about';

export default function Home() {
    return (
        <div className='flex flex-col min-h-screen'>
            <main className='flex-grow'>
                <About />

                <ListCaregivers />
            </main>

            <Footer />
        </div>
    );
}
