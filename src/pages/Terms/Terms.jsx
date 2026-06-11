import { ArrowLeft, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer.jsx";
import logo from "../../images/filmera-logo.png";

const Terms = () => (
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
          <Scale size={30} />
        </div>
        <p className="privacy__eyebrow">FILMERA TERMS</p>
        <h1>Terms of Use</h1>
        <p className="privacy__date">Effective date: June 10, 2026</p>
        <p className="privacy__lead">
          These Terms of Use govern your access to and use of the FILMERA
          mobile application, website, and related services.
        </p>
      </div>

      <div className="privacy__sections">
        <section>
          <h2>Acceptance of these terms</h2>
          <p>
            By creating an account or using FILMERA, you agree to these Terms
            and our <Link to="/privacy">Privacy Policy</Link>. If you do not
            agree, do not use the service.
          </p>
        </section>

        <section>
          <h2>Eligibility</h2>
          <p>
            You must be at least 13 years old to use FILMERA. If the law where
            you live requires a higher minimum age or parental consent, you may
            use FILMERA only when those requirements are satisfied.
          </p>
        </section>

        <section>
          <h2>Your account</h2>
          <ul>
            <li>Provide accurate and current registration information.</li>
            <li>Keep your password and account access confidential.</li>
            <li>
              Notify us if you believe your account has been accessed without
              permission.
            </li>
            <li>
              You are responsible for activity performed through your account,
              except where prohibited by law.
            </li>
          </ul>
        </section>

        <section>
          <h2>Rules of use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use FILMERA for unlawful, fraudulent, or abusive purposes.</li>
            <li>
              Harass other users or submit content that is threatening,
              hateful, discriminatory, obscene, or otherwise harmful.
            </li>
            <li>
              Attempt to access another person's account, private rooms, or
              non-public systems without authorization.
            </li>
            <li>
              Interfere with the service, bypass security controls, introduce
              malicious code, scrape data, or overload our infrastructure.
            </li>
            <li>
              Reverse engineer or copy FILMERA except where applicable law
              expressly permits it.
            </li>
            <li>
              Use the service to violate intellectual property, privacy, or
              other rights.
            </li>
          </ul>
        </section>

        <section>
          <h2>Rooms and user activity</h2>
          <p>
            Room codes are intended to be shared only with people you choose.
            You are responsible for deciding whom to invite and for your
            activity in rooms. Movie swipes and matches are suggestions for
            entertainment purposes and do not create obligations between
            participants.
          </p>
        </section>

        <section>
          <h2>Movie information and third-party services</h2>
          <p>
            FILMERA may display movie metadata, images, ratings, and
            availability information supplied by TMDB and other third parties.
            This information may be incomplete, delayed, or inaccurate and may
            change without notice.
          </p>
          <p>
            FILMERA is not endorsed or certified by TMDB. Third-party services
            are governed by their own terms and policies.
          </p>
        </section>

        <section>
          <h2>Intellectual property</h2>
          <p>
            FILMERA, including its software, branding, interface, and original
            content, is owned by FILMERA or its licensors and is protected by
            applicable intellectual property laws. These Terms grant you a
            limited, personal, non-exclusive, non-transferable, revocable right
            to use the service for its intended purpose.
          </p>
        </section>

        <section>
          <h2>Suspension and termination</h2>
          <p>
            We may restrict, suspend, or terminate access when we reasonably
            believe an account violates these Terms, creates risk for users or
            the service, is involved in fraud or abuse, or when required by
            law. When appropriate, we may provide notice or an opportunity to
            resolve the issue.
          </p>
          <p>
            You may stop using FILMERA at any time and can permanently delete
            your account through <strong>Account Settings</strong> in the app.
          </p>
        </section>

        <section>
          <h2>Service availability and changes</h2>
          <p>
            We may update, modify, suspend, or discontinue features to maintain
            security, improve FILMERA, respond to legal requirements, or for
            operational reasons. We do not guarantee uninterrupted,
            error-free, or permanently available service.
          </p>
        </section>

        <section>
          <h2>Disclaimer</h2>
          <p>
            To the fullest extent permitted by law, FILMERA is provided "as is"
            and "as available," without warranties of any kind, whether express
            or implied. We do not guarantee that movie information, matches,
            recommendations, availability data, or third-party content will be
            accurate or suitable for your needs.
          </p>
        </section>

        <section>
          <h2>Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, FILMERA and its operators
            will not be liable for indirect, incidental, special,
            consequential, exemplary, or punitive damages, loss of data, loss
            of profits, or loss of access arising from your use of or inability
            to use the service.
          </p>
          <p>
            Nothing in these Terms excludes rights or liability that cannot be
            excluded under applicable law.
          </p>
        </section>

        <section>
          <h2>Indemnification</h2>
          <p>
            To the extent permitted by law, you agree to be responsible for
            claims, losses, or expenses arising from your unlawful use of
            FILMERA, your violation of these Terms, or your infringement of
            another person's rights.
          </p>
        </section>

        <section>
          <h2>Changes to these terms</h2>
          <p>
            We may update these Terms as FILMERA evolves. We will publish the
            updated version here and revise the effective date. Continued use
            after the updated Terms take effect means you accept them, where
            permitted by law.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            For questions about these Terms, email
            <a href="mailto:privacy@filmera.us"> privacy@filmera.us</a>.
          </p>
        </section>
      </div>
    </main>

    <Footer />
  </div>
);

export default Terms;
