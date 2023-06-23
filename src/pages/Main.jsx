import "./style.css";
import { CaretRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
const Main = () => {
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
              игры, реализация известной карты DotA для игры Warcraft III в
              отдельном клиенте.
            </p>
            <p>Переходите в каталог для просмотра карточек героев.</p>

            <Link to="/catalog" title="Каталог">
              <button className="btn__banner">
                Каталог <CaretRight />
              </button>
            </Link>
          </div>
          <div className="pictures__dota">
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
