import "./style.css";
import Ctx from "../../context";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Likes from "../Card/likes";

const Card = ({ element }) => {
  const navigate = useNavigate();
  const { userId } = useContext(Ctx);
  const goUserCard = (e) => {
    e.preventDefault();
    navigate(`/post/${element._id}`);
  };

    return (
      <div className="card">
        <div className="like__card">
          <Likes element={element} userId={userId} />
        </div>
        <Link className="post" to={`/posts/`} onClick={goUserCard}>
          <div className="title__card">
            <span className="post__title">{element.title}</span>
          </div>
          <div className="img__card">
            <span
              className="post__img"
              style={{ backgroundImage: `url(${element.image})` }}
            />
          </div>
          <div className="post__card">
            <span className="post__text">{element.text}</span>
          </div>
        </Link>
      </div>
    );
};

export default Card;
