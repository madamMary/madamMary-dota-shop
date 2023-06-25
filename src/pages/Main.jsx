import "./style.css";
import { CaretRight, BoxArrowInRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import Ctx from "../context";

const Main = () => {
  const {user, setModalActive} = useContext(Ctx);
  
  const logIn = (e) => {
    setModalActive(true);
  };

  return (
    <>
      <div className="container">
        <div className="banner">
          <div className="text__banner">
            <h1>
              Коллекционные карточки <br /> с героями Dota 2
            </h1>
            <p>
              Dota 2 — компьютерная многопользовательская командная игра жанра
              стратегия в реальном времени с элементами компьютерной ролевой
              игры, реализация известной карты Dota для игры Warcraft III в
              отдельном клиенте.
            </p>
            <p>Переходите в каталог для просмотра карточек героев.</p>

            {user && (
              <Link to="/catalog" title="Каталог">
                <button className="btn__banner">
                  Каталог <CaretRight />
                </button>
              </Link>
            )}

            {!user && (
              <div className="no__user">
                <h3>
                  Зарегистрируйтесь или войдите в профиль, чтобы увидеть каталог
                </h3>
                <div className="main__menu">
                  <Link
                    className="main__icons"
                    href=""
                    onClick={logIn}
                    title="Войти"
                  >
                    <BoxArrowInRight />
                    <span className="main__icons__txt">Войти</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="pictures__dota__main">
            <div className="pic__dota">
              <img src="/images/dota.gif" alt="DotaShop" />
            </div>
            <div className="pic__dota">
              <img src="/images/dota2.gif" alt="DotaShop" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
