import logo from "../../images/filmera-logo.png";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";

const CTA = () => (
  <section className="container section">
    <div className="cta">
      <div className="cta__blob1" />
      <div className="cta__blob2" />
      <img src={logo} alt="" width={96} height={96} loading="lazy" className="cta__logo animate-float" />
      <h2 className="cta__h2">Tonight's movie? <span className="text-gradient-accent">Decided.</span></h2>
      <p className="cta__lead">Stop arguing over the remote. Start a FILMERA room and let the swipes choose for you.</p>
      <div className="cta__actions">
        <Link to="/room"><Button variant="hero" size="xl">Create your first room</Button></Link>
        {/* <Button variant="glass" size="xl">Watch a 30s tour</Button> */}
      </div>
    </div>
  </section>
);
export default CTA;
