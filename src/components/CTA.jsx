import logo from "../assets/filmera-logo.png";
import { Button } from "./ui/Button";

const CTA = () => (
  <section className="container section">
    <div className="cta">
      <div className="cta__blob1" />
      <div className="cta__blob2" />
      <img src={logo} alt="" width={96} height={96} loading="lazy" className="cta__logo animate-float" />
      <h2 className="cta__h2">Tonight's movie? <span className="text-gradient-accent">Decided.</span></h2>
      <p className="cta__lead">Stop arguing over the remote. Start a FILMERA room and let the swipes choose for you.</p>
      <div className="cta__actions">
        <Button variant="hero" size="xl">Create your first room</Button>
        <Button variant="glass" size="xl">Watch a 30s tour</Button>
      </div>
    </div>
  </section>
);
export default CTA;
