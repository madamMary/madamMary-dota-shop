import Logo from "./Logo";
import { Link } from "react-router-dom";
import {
  Folder2Open,
  Star,
  PersonCircle,
  BoxArrowInRight,
} from "react-bootstrap-icons";
// import { useState } from "react";
import Search from "../Search";
const Header = ({ user, setModalActive }) => {
  const logIn = (e) => {
    setModalActive(true);
  };
  return (
    <header className="header">
      <div className="stiky__header">
        <div className="logo__header">
          <Logo />
        </div>
        <div className="search__header">
          <Search />
        </div>
        {user && (
          <>
            <div className="header__menu">
              <Link to="/catalog" title="Каталог" className="header__icons">
                <Folder2Open />
                <span className="header__icons__txt">Каталог</span>
              </Link>
              <Link to="/favorites" title="Избранное" className="header__icons">
                <Star />
                <span className="header__icons__txt">Избранное</span>
              </Link>
              <Link to="/profile" title="Профиль" className="header__icons">
                <PersonCircle />
                <span className="header__icons__txt">Профиль</span>
              </Link>
            </div>
          </>
        )}
        {!user && (
          <div className="header__menu">
            {" "}
            <Link
              className="header__icons"
              href=""
              onClick={logIn}
              title="Войти"
            >
              <BoxArrowInRight />
              <span className="header__icons__txt">Войти</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
