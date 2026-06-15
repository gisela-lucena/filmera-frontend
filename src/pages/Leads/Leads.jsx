import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import logo from "../../images/filmera-logo.png";
import api from "../../utils/Api.js";
import "./leads.css";

const Leads = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setStatus("submitting");
      setMessage("");
      await api.createLead({ email: email.trim() });
      setStatus("success");
      setEmail("");
      setMessage("You're on the list. We'll let you know when Filmera launches.");
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <main className="leads-page">
      <div className="leads-page__glow leads-page__glow--top" />
      <div className="leads-page__glow leads-page__glow--bottom" />

      <section className="leads-page__content">
        <Link to="/" className="leads-page__brand" aria-label="Filmera home">
          <img src={logo} alt="" width="72" height="72" />
          <span>FILM<span>ERA</span></span>
        </Link>

        <p className="leads-page__eyebrow">Coming soon</p>
        <h1>We're almost ready for the App Store and Google Play.</h1>
        <p className="leads-page__subtitle">
          Want to be the first to know? Get notified when we launch.
        </p>

        <form className="leads-page__form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="lead-email">Email address</label>
          <div className="leads-page__form-row">
            <input
              id="lead-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              required
              disabled={status === "submitting"}
            />
            <button type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending..." : "Let me know"}
              <ArrowRight aria-hidden="true" size={19} strokeWidth={2.5} />
            </button>
          </div>

          {message && (
            <p
              className={`leads-page__message leads-page__message--${status}`}
              role="status"
            >
              {status === "success" && <Check aria-hidden="true" size={17} />}
              {message}
            </p>
          )}
        </form>

        <p className="leads-page__note">No spam. Just one message when we're live.</p>
      </section>
    </main>
  );
};

export default Leads;
