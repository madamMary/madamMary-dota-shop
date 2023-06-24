import { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Trash, Pen } from "react-bootstrap-icons";
import Ctx from "../context";
import "./css/currentcard.css";

function CurrentCard() {
  const { postId } = useParams();
  const { setServerCards, api, singleCard, setSingleCard } =
    useContext(Ctx);

  const navigate = useNavigate();
  useEffect(() => {
    api.getSingleCard(postId).then((data) => {
      if (!data.err) {
        setSingleCard(data);
      }
    });
  }, []);

  const delCard = () => {
    api.delSingleCard(postId).then((data) => {
      setServerCards((prev) => prev.filter((el) => el._id !== postId));
      navigate("/catalog");
    });
  };

  const goEditCard = (e) => {
    e.preventDefault();
    navigate(`/edit/${postId}`);
  };

  return (
    <div className="parent">
      <div className="part__card">
        <div className="card__part1">
          <div className="card__title">
            <div className="title__content">
              <h1>{singleCard.title}</h1>
            </div>
            <div className="edit__card">
              <div className="trash">
                <div style={{ textAlign: "right" }}>
                  <button
                    className="btn__edit"
                    style={{ justifySelf: "flex-left" }}
                    onClick={delCard}
                  >
                    <Trash />
                  </button>
                </div>
              </div>
              <div className="edit">
                <div style={{ textAlign: "right" }}>
                  <button
                    className="btn__edit"
                    style={{ justifySelf: "flex-left" }}
                    onClick={goEditCard}
                  >
                    <Pen />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card__text">
            <h4>О герое:</h4> <p>{singleCard.text}</p>
          </div>
          <div className="card__tags">
            <h4>Теги:</h4>
            <button className="tags__btn">{singleCard.tags}</button>
          </div>
        </div>
        <div className="card__img">
          <img src={singleCard.image} alt={singleCard.title} height="500" />
        </div>
      </div>
    </div>
  );
}

export default CurrentCard;
