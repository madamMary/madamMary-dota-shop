import { Plus, BoxArrowLeft } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Ctx from "../context";
import "./css/profile.css";
const Profile = ({ color, setAddNewCard }) => {
  const { setting, setSetting, user, setUser } = useContext(Ctx);
  const navigate = useNavigate();
  // const addNewCard = (e) => {
  //   setAddNewCard(true);
  // };
  const captionStyle = {
    fontWeight: "bold",
    color: color,
  };
  const logOut = (e) => {
    e.preventDefault();
    setUser("");
    localStorage.removeItem("dotaUser");
    localStorage.removeItem("dotaToken");
    localStorage.removeItem("dotaId");
    navigate("/");
  };
  return (
    <>
      <div className="profile__content">
        <div className="profile__all">
          <div className="profile__left">
            <h3>Профиль</h3>
            <div>
              Добро пожаловать,
              <span style={captionStyle}>{user}</span>!
            </div>
          </div>
          <div className="profile__rigth">
            <div className="add__hero">
              <div className="create__hero">Создать свою карточку</div>
              <div className="create__btn">
                <Link to="/add" title="Добавить героя" className="badge-el">
                  <button className="plus__btn">
                    <Plus />
                  </button>
                </Link>
              </div>
            </div>
            <div className="add__hero">
              <div className="create__hero">Отобразить все карточки</div>
              <div className="create__btn">
                <input
                  type="checkbox"
                  checked={setting}
                  onClick={(e) => {
                    if (e.currentTarget.checked) {
                      setSetting(true);
                    } else {
                      setSetting(false);
                    }
                  }}
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="pictures__dota">
          <div className="pic__dota">
            <img src="/images/fight.gif" alt="DotaShop" />
          </div>
          <div className="pic__dota">
            <img src="/images/qeenofpain.gif" alt="DotaShop" />
          </div>
        </div>
      </div>
      <div className="exit">
        <div className="exit__profile">Выйти из профиля</div>
        <Link className="exit__profile" href="" onClick={logOut} title="Выйти">
          <div className="exit__btn">
            <BoxArrowLeft />
          </div>
        </Link>
      </div>
    </>
  );
};
export default Profile;
