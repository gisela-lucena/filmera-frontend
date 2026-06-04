import logo from "../../images/filmera-logo.png";
import { Button } from "../ui/Button";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CTA = ({ currentUser, onLogin, onForgotPassword, setTooltip }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <section className="container section">
      <div className="cta">
        <div className="cta__blob1" />
        <div className="cta__blob2" />
        <img src={logo} alt="" width={96} height={96} loading="lazy" className="cta__logo animate-float" />
        <h2 className="cta__h2">Tonight's movie? <span className="text-gradient-accent">Decided.</span></h2>
        <p className="cta__lead">Stop arguing over the remote. Start a FILMERA room and let the swipes choose for you.</p>
        <div className="cta__actions">
          <Button variant="hero" size="xl" onClick={() => {
            if (currentUser) {
              navigate("/room");
            } else {
              setIsRegisterOpen(false);
              setIsLoginOpen(true);
            }
          }}>Create your first room</Button>
        </div>
      </div>
      <Login
        open={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
        onLogin={onLogin}
        onForgotPassword={onForgotPassword}
        setTooltip={setTooltip}
      />
      <Register
        open={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        setTooltip={setTooltip}
        onSwitchToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </section>
  );
};
export default CTA;
