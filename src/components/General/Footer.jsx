import Logo from "./Logo";
import Ctx from "../../context";

import { Link } from "react-router-dom";
import { Facebook, Telegram, Twitter } from "react-bootstrap-icons";
import { useContext } from "react";


const Footer = () => {
const {user} = useContext(Ctx);

  return (
    <footer>
      <div className="sticky__footer">
        <div className="footer__logo">
          <Logo />
          <div>
            <h4>© {new Date().getFullYear()} DotaClub</h4>
          </div>
        </div>
      
        {user && (
          <>
        <div className="footer__menu">
          <Link to="/profile" className="footer__txt">
            <p>Профиль</p>
          </Link>
          <Link to="/catalog" className="footer__txt">
            <p>Каталог</p>
          </Link>
          <Link to="/favorites" className="footer__txt">
            <p>Избранное</p>
          </Link>
        </div>
        </>
        )}

        <div className="footer__about">
          <h3>О нас</h3>
          <h5>Горячая линия: 8 (800) 888 88 88</h5>
          <h5>
            Мы в социальных сетях: <Facebook /> <Telegram /> <Twitter />
          </h5>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
