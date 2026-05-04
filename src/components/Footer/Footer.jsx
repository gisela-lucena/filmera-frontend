import logo from "../../images/filmera-logo.png";

const Footer = () => (
  <footer className="footer">
    <div className="container footer__row">
      <div className="footer__brand">
        <img src={logo} alt="" width={28} height={28} loading="lazy" />
        <strong>FILM<span className="footer__accent">ERA</span></strong>
        <span className="footer__year">© {new Date().getFullYear()}</span>
      </div>
      {/* <div className="footer__links">
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Contact</a>
      </div> */}
      <p>Movie data by TMDB</p>
    </div>
  </footer>
);
export default Footer;
