import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Features from "../components/Features.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import Footer from "../components/Footer.jsx";

export default function LandingPage() {
    return (
       <>
           <Navbar/>
           <Hero/>
           <Features/>
           <HowItWorks/>
           <Footer/>
       </>
    )
}