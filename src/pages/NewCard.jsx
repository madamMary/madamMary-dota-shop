import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Ctx from "../context";
import "./css/newcard.css";

const NewCard = ({ active, setActive, setUser }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(
    "https://youfriends.ru/public/promo_cache/chanel_logo_UCs7bjQt6d8rGqfLZNG0zoKQ.png"
  );
  const [text, setText] = useState("");
  const [tags, setTags] = useState(["dota2"]);
  const { api, setServerCards } = useContext(Ctx);
  const navigate = useNavigate();

  const clearForm = () => {
    setTitle("");
    setImage(
      "https://youfriends.ru/public/promo_cache/chanel_logo_UCs7bjQt6d8rGqfLZNG0zoKQ.png"
    );
    setText("");
    setTags("");
  };

  const saveForm = async (e) => {
    e.preventDefault();
    let body = {
      title,
      image,
      text,
      tags,
    };
    
    api.addCard(body).then((data) => {
      if (!data.err && !data.error) {
        setServerCards((prev) => [data, ...prev]);
        clearForm();
        navigate(`/catalog`);
      }
    });
  };

  return (
    <div className="add__card">
      <h3>Добавить карточку героя</h3>
      <form onSubmit={saveForm}>
        <div className="about__hero">
          <div className="left__card">
            <div className="name__hero">
              <label for="name">
                Имя персонажа
                <input
                  id="name"
                  placeholder="Введите имя"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
            </div>
            <div className="img__hero">
              <label for="img">
                Изображение
                <input
                  id="img"
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </label>
            </div>
            <div className="tags__hero">
              <label for="tags">
                Теги
                <input
                  id="tags"
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </label>
            </div>
          </div>
          <div className="rigth__card">
            <div className="preview">
              <div
                className="mb-3"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: "contain",
                  height: "100%",
                  width: "100%",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            </div>
            <div className="text__hero">
              <label for="text">
                О герое
                <textarea
                  id="text"
                  placeholder="Кто ваш герой?"
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="btn__block">
          <button className="btn__hero" onClick={saveForm}>
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewCard;
