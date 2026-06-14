import { ArrowLeft, UserRoundX } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer.jsx";
import logo from "../../images/filmera-logo.png";

const DeleteAccount = () => (
  <div className="privacy">
    <header className="privacy__header">
      <div className="container privacy__nav">
        <Link to="/" className="privacy__brand" aria-label="FILMERA home">
          <img src={logo} alt="" width={36} height={36} />
          <span>
            FILM<span>ERA</span>
          </span>
        </Link>
        <Link to="/" className="privacy__back">
          <ArrowLeft size={18} />
          Back to home
        </Link>
      </div>
    </header>

    <main className="container privacy__main">
      <div className="privacy__intro">
        <div className="privacy__icon">
          <UserRoundX size={30} />
        </div>
        <p className="privacy__eyebrow">ACCOUNT MANAGEMENT</p>
        <h1>Delete Your Account</h1>
        <p className="privacy__date">Last updated: June 14, 2026</p>
        <p className="privacy__lead">
          FILMERA users can permanently delete their account and associated
          personal data directly from the mobile app.
        </p>
      </div>

      <div className="privacy__sections">
        <section>
          <h2>How to delete your account</h2>
          <ol>
            <li>Open FILMERA and sign in to your account.</li>
            <li>Open <strong>Account Settings</strong>.</li>
            <li>Select <strong>Delete Account</strong>.</li>
            <li>Review the warning and confirm the deletion.</li>
          </ol>
          <p>
            This action is permanent and cannot be undone. You will be signed
            out after the deletion is completed.
          </p>
        </section>

        <section>
          <h2>Data that is deleted</h2>
          <p>Deleting your FILMERA account removes:</p>
          <ul>
            <li>Your user profile, including your name and email address.</li>
            <li>Your authentication credentials.</li>
            <li>Your movie preferences and swipe history.</li>
            <li>Your account participation and membership in rooms.</li>
            <li>Other information directly associated with your account.</li>
          </ul>
        </section>

        <section>
          <h2>Deletion timeframe</h2>
          <p>
            Your active account and associated data are deleted from FILMERA
            systems immediately after the request is confirmed.
          </p>
          <p>
            Limited copies may remain in encrypted backups or security logs for
            up to 30 days before being automatically removed. Information may
            be retained longer only when required by applicable law, fraud
            prevention, security, or dispute resolution obligations.
          </p>
        </section>

        <section>
          <h2>Need help?</h2>
          <p>
            If you cannot access the app or your account, request deletion by
            emailing
            <a href="mailto:support@filmera.us"> support@filmera.us</a> from the
            email address associated with your account. We may ask you to
            verify your identity before completing the request.
          </p>
          <p>
            Learn more in our <Link to="/privacy">Privacy Policy</Link>.
          </p>
        </section>
      </div>
    </main>

    <Footer />
  </div>
);

export default DeleteAccount;
