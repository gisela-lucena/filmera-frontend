import Navbar from "../components/Navbar";
import Hero from "..components/Hero";
import Problem from "../components/Problem";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import SwipeDemo from "../components/SwipeDemo";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

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
