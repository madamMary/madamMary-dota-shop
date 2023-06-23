import React, { useContext, useEffect, useState } from "react";
import { Heart } from "react-bootstrap-icons";
import Ctx from "../../context";
const Likes = ({ element, userId }) => {
  const [arrLikes, setArrLikes] = useState(element.likes);
  const [like, setLike] = useState();
  const { setServerCards, api } = useContext(Ctx);
  useEffect(() => {
    setLike(arrLikes?.includes(userId));
    element.likes = arrLikes;
    setServerCards((old) =>
      old.map((o) => {
        return o._id === element?._id ? element : o;
      })
    );
  }, [arrLikes, element]);
  const goLike = () => {
    if (like) {
      setArrLikes(arrLikes.filter((y) => y !== userId));
    } else {
      setArrLikes((old) => [...old, userId]);
    }
    console.log("1", element?._id, !like);
    api.setLike(element?._id, !like).then((data) => {
      if (data.err) {
        console.log(data.message);
      }
    });
  };
  return (
    <span
      style={{
        fontSize: "14px",
        fontWeight: "550",
        width: "auto",
        color: "grey",
        cursor: "pointer",
      }}
      onClick={goLike}
    >
      {!like ? (
        <Heart
          style={{ fontSize: "24px", marginBottom: "3px", color: "crimson" }}
        />
      ) : (
        <Heart
          style={{ fontSize: "24px", marginBottom: "3px", color: "crimson" }}
        />
      )}
      {element.likes?.length}
    </span>
  );
};
export default Likes;
