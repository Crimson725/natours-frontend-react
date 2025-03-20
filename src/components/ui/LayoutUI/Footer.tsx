import logoGreen from "../../assets/img/logo-green.png";

interface FooterProps {
  className?: string;
}

const Footer = ({ className = "" }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`footer ${className}`.trim()}>
      <div className="footer__logo">
        <img src={logoGreen} alt="Natours logo" />
      </div>
      <ul className="footer__nav">
        <li>
          <a href="#">About us</a>
        </li>
        <li>
          <a href="#">Download apps</a>
        </li>
        <li>
          <a href="#">Become a guide</a>
        </li>
        <li>
          <a href="#">Careers</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
      <p className="footer__copyright">© by Natours {currentYear}</p>
    </footer>
  );
};

export default Footer;
