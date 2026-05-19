import logo from "../../images/filmera-logo.png";
import { Button } from "../ui/Button";
import { useState } from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";

const Navbar = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    return (
        <header className="navbar">
            <nav className="container navbar__nav">
                <a href="#" className="navbar__brand">
                    <img src={logo} alt="FILMERA logo" width={36} height={36} className="navbar__logo" />
                    <span className="navbar__brand-text">FILM<span className="navbar__brand-accent">ERA</span></span>
                </a>
                <div className="navbar__links">
                    <a href="#how">How it works</a>
                    <a href="#features">Features</a>
                    <a href="#demo">Try demo</a>
                </div>
                <div className="navbar__actions">
                    <Button variant="glass" size="sm" onClick={() => {
                        setIsLoginOpen(false);
                        setIsRegisterOpen(true);
                    }}> Register </Button>
                    <Button variant="hero" size="sm" onClick={() => {
                        setIsRegisterOpen(false);
                        setIsLoginOpen(true);
                    }}> Login </Button>
                </div>
            </nav>
            <Login
                open={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onSwitchToRegister={() => { setIsLoginOpen(false); setIsRegisterOpen(true); }}
                onLogin={onLogin}
            />
            <Register
                open={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
                onSwitchToLogin={() => { setIsRegisterOpen(false); setIsLoginOpen(true); }}
            />
        </header>
    );
};
export default Navbar;