import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import { Head, Link } from '@inertiajs/react';
import Header from './home/Header';
import Services from './home/Services';
import AboutUs from './home/AboutUs';
import CTA from './home/CTA';
import ContactUs from './home/ContactUs';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Navbar/>
            <Header/>
            <Services/>
            <AboutUs/>
            <CTA/>
            <ContactUs/>
            <Footer/>
        </>
    );
}
