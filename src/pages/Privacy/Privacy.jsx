import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer.jsx";
import logo from "../../images/filmera-logo.png";

const Privacy = () => (
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
          <ShieldCheck size={30} />
        </div>
        <p className="privacy__eyebrow">YOUR PRIVACY</p>
        <h1>Privacy Policy</h1>
        <p className="privacy__date">Effective date: June 10, 2026</p>
        <p className="privacy__lead">
          This policy explains how FILMERA collects, uses, stores, and shares
          information when you use our mobile application and related services.
        </p>
      </div>

      <div className="privacy__sections">
        <section>
          <h2>Information we collect</h2>
          <ul>
            <li>
              <strong>Account information:</strong> your name, email address,
              and encrypted password credentials.
            </li>
            <li>
              <strong>Movie preferences:</strong> likes, dislikes, filters,
              room participation, and movie matches.
            </li>
            <li>
              <strong>Usage and technical information:</strong> app
              interactions, device or browser type, IP address, diagnostics,
              request information, and server logs.
            </li>
            <li>
              <strong>Support communications:</strong> information you provide
              when contacting us about privacy, support, or account issues.
            </li>
          </ul>
        </section>

        <section>
          <h2>Why we collect information</h2>
          <p>We use information to:</p>
          <ul>
            <li>Create and manage your FILMERA account.</li>
            <li>Authenticate you and protect account access.</li>
            <li>
              Create rooms, connect participants, record swipes, and generate
              movie matches.
            </li>
            <li>Provide password reset and account support.</li>
            <li>Operate, secure, troubleshoot, and improve the service.</li>
            <li>Comply with legal obligations and prevent misuse.</li>
          </ul>
        </section>

        <section>
          <h2>Storage and security</h2>
          <p>
            Account information, room participation, and movie preference data
            are stored using <strong>MongoDB Atlas</strong>. Passwords are
            stored only as one-way cryptographic hashes, not as readable
            passwords.
          </p>
          <p>
            We use reasonable administrative and technical safeguards,
            including encrypted network connections and authenticated access.
            No online system can guarantee absolute security.
          </p>
        </section>

        <section>
          <h2>Service providers and sharing</h2>
          <p>
            We do not sell your personal information. Limited information may
            be processed by providers that help us operate FILMERA:
          </p>
          <ul>
            <li><strong>MongoDB Atlas:</strong> database hosting and storage.</li>
            <li>
              <strong>Render:</strong> backend hosting, networking, and server
              logs.
            </li>
            <li>
              <strong>Vercel:</strong> website hosting, networking, and
              technical logs.
            </li>
            <li>
              <strong>TMDB:</strong> movie metadata, images, and availability
              information. We do not intentionally send TMDB your name, email,
              or password.
            </li>
          </ul>
          <p>
            We may also disclose information when required by law or to protect
            users, FILMERA, or the public.
          </p>
        </section>

        <section>
          <h2>Data retention</h2>
          <p>
            We retain account and preference information while your account is
            active or as needed to provide the service. Limited records may
            remain temporarily in backups, security logs, or where retention is
            required by law.
          </p>
        </section>

        <section>
          <h2>Account and data deletion</h2>
          <p>
            You can delete your account directly in the FILMERA app by opening
            <strong> Account Settings</strong> and selecting
            <strong> Delete Account</strong>. This permanently deletes your
            profile and swipe history and removes your account from rooms.
          </p>
          <p>
            You may also request access, correction, or deletion by emailing
            <a href="mailto:privacy@filmera.us"> privacy@filmera.us</a> from the
            address associated with your account. We may need to verify your
            identity before completing a request.
          </p>
        </section>

        <section>
          <h2>Children's privacy</h2>
          <p>
            FILMERA is not directed to children under 13, and we do not
            knowingly collect personal information from children under 13.
            Contact us if you believe a child has provided personal
            information.
          </p>
        </section>

        <section>
          <h2>International processing</h2>
          <p>
            Our providers may process information in the United States or other
            countries, where privacy laws may differ from those in your
            location.
          </p>
        </section>

        <section>
          <h2>Changes to this policy</h2>
          <p>
            We may update this policy as FILMERA changes. The revised policy
            will be published here with an updated effective date. Material
            changes may also be communicated in the app.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            For privacy questions or requests, email
            <a href="mailto:privacy@filmera.us"> privacy@filmera.us</a>.
          </p>
        </section>
      </div>
    </main>

    <Footer />
  </div>
);

export default Privacy;
