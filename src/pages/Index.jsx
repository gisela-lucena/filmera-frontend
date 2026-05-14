import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Problem from "../components/Problem/Problem";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import Features from "../components/Features/Features";
import SwipeDemo from "../components/SwipeDemo/SwipeDemo";
import CTA from "../components/CTA/CTA";
import Footer from "../components/Footer/Footer";

const Index = () => (
    <main className="page">
        <Navbar />
        <Hero />
        <Problem />
        <HowItWorks />
        <Features />
        <SwipeDemo />
        <CTA />
        <Footer />
    </main>
    
);

export default Index;
