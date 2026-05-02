import logo from "../assets/filmera-logo.png";
import { Button } from "../components/ui/Button";

const Navbar = () => (
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
            <Button variant="hero" size="sm">Get started</Button>
        </nav>
    </header>
);
export default Navbar;