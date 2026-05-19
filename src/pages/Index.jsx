import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Problem from "../components/Problem/Problem";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import Features from "../components/Features/Features";
import SwipeDemo from "../components/SwipeDemo/SwipeDemo";
import CTA from "../components/CTA/CTA";
import Footer from "../components/Footer/Footer";

const Index = ({ currentUser, onLogin, onLogout, isAuthChecked }) => (
    <main className="page">
        <Navbar
            currentUser={currentUser}
            onLogin={onLogin}
            onLogout={onLogout}
        />
        <Hero
            isAuthChecked={isAuthChecked}
        />
        <Problem />
        <HowItWorks />
        <Features />
        <SwipeDemo />
        <CTA />
        <Footer />
    </main>

);

export default Index;
