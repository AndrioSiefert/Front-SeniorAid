import About from '@/_components/About/about';
import Footer from '@/_components/Footer/footer';

import News from '@/_components/newSubject';

export default function Home() {
    return (
        <div className='flex flex-col min-h-screen'>
            <main className='flex-grow grid'>
                <About />
            </main>
            <News />

            <Footer />
        </div>
    );
}
