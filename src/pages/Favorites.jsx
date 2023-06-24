import { useContext } from "react";
import Ctx from "../context";
import Card from "../components/Card/index";

const Favorites = () => {
  const { userId, serverCards } = useContext(Ctx);
  
  return (
    <>
      <h2>Избранные карточки</h2>
      <div className="container_card">
        {serverCards
          ?.filter((el) => el.likes.includes(userId))
          .map((e) => (
            <Card key={e._id} element={e} />
          ))}
      </div>
    </>
  );
};

export default Favorites;
