import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Problem from "../components/Problem/Problem";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import Features from "../components/Features/Features";
import SwipeDemo from "../components/SwipeDemo/SwipeDemo";
import CTA from "../components/CTA/CTA";
import Footer from "../components/Footer/Footer";
import { useLocation } from "react-router-dom";

const Index = ({ currentUser, onLogin, onLogou, setTooltip }) => {
    const location = useLocation();
    return (
        <main className="page">
            <Navbar
                currentUser={currentUser}
                onLogin={onLogin}
                onLogout={onLogout}
                shouldOpenLogin={location.state?.openLogin}
                redirectAfterLogin={location.state?.from}
            />
            <Hero
                currentUser={currentUser}
                onLogin={onLogin}
                setTooltip={setTooltip}
            />
            <Problem />
            <HowItWorks />
            <Features />
            <SwipeDemo />
            <CTA
                currentUser={currentUser}
                onLogin={onLogin}
                setTooltip={setTooltip}
            />
            <Footer />
        </main>

    );
};

export default Index;
