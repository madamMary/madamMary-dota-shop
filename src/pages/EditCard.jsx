import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Ctx from "../context";
import "./css/newcard.css";
const EditCard = ({}) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState(["dota2"]);
  const { postId } = useParams();
  const { api, setServerCards, singleCard, setSingleCard } = useContext(Ctx);
  const navigate = useNavigate();
  useEffect(() => {
    api.getSingleCard(postId).then((data) => {
      if (!data.err) {
        setSingleCard(data);
        setImage(singleCard.image);
      }
    });
  }, []);
  const editForm = async (e) => {
    e.preventDefault();
    let body = {
      title,
      image,
      text,
      tags,
    };
    api.updSingleCard(postId, body).then((data) => {
      if (!data.err && !data.error) {
        setServerCards((prev) =>
          prev.map((e) => {
            if (e?._id === data?._id) {
              return data;
            } else return e;
          })
        );
        navigate(`/post/${postId}`);
      }
    });
  };
  return (
    <div className="add__card">
      <h3>Изменить карточку героя</h3>
      <form onSubmit={editForm}>
        <div className="about__hero">
          <div className="left__card">
            <div className="name__hero">
              <label for="name">
                Имя персонажа
                <input
                  id="name"
                  placeholder="Введите имя"
                  type="text"
                  defaultValue={singleCard.title}
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
                  defaultValue={singleCard.image}
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
                  defaultValue={singleCard.tags}
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
                  defaultValue={singleCard.text}
                  onChange={(e) => setText(e.target.value)}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="btn__block">
          <button className="btn__hero" onClick={editForm}>
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditCard;
