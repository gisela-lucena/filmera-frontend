import { Play, Sparkles } from "lucide-react";
import couple from "../images/hero-couple.jpg";
import logo from "../images/filmera-logo.png";
import { Button } from "../ui/Button";

const Hero = () => (
    <section className="hero">
        <div className="hero__spotlight" />
        <div className="container hero__grid">
            <div className="animate-fade-up">
                <div className="hero__badge"><Sparkles /> Movie nights, finally decided</div>
                <h1 className="hero__h1">
                    Swipe. Match. <span className="text-gradient-accent">Watch.</span>
                </h1>
                <p className="hero__lead">
                    FILMERA ends the "what should we watch?" debate. Create a room, swipe through movies together, and get an instant match — like Tinder, for movie night.
                </p>
                <div className="hero__actions">
                    <Button variant="hero" size="xl"><Play /> Start a room</Button>
                    <Button variant="glass" size="xl">Join with code</Button>
                </div>
                <div className="hero__stats">
                    <div><span className="hero__stat-num">2+</span> players</div>
                    <div className="hero__divider" />
                    <div><span className="hero__stat-num">10k+</span> movies</div>
                    <div className="hero__divider" />
                    <div><span className="hero__stat-num">&lt; 60s</span> to match</div>
                </div>
            </div>

            <div className="hero__media animate-fade-up animate-fade-up--delay-1">
                <div className="hero__frame">
                    <img src={couple} alt="Couple watching a movie together" width={1280} height={960} />
                    <div className="hero__fade" />
                </div>
                <img src={logo} alt="" width={140} height={140} className="hero__float-logo animate-float" />
                <div className="hero__match-card">
                    <div className="hero__match-icon">✓</div>
                    <div>
                        <div className="hero__match-label">It's a match!</div>
                        <div className="hero__match-title">Inception • 2010</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
export default Hero;