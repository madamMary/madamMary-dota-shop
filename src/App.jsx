import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Ctx from "./context";
import Api from "./api";
import { Header, Footer } from "./components/General";
import Main from "./pages/Main";
import Catalog from "./pages/Catalog";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Modal from "./components/Modal";
import NewCard from "./pages/NewCard";
import CurrentCard from "./pages/CurrentCard";
import EditCard from "./pages/EditCard";
import Search from "./components/Search";
const App = () => {
  const [serverCards, setServerCards] = useState([]);
  const [singleCard, setSingleCard] = useState({});
  const [cards, setCards] = useState(serverCards);
  const [user, setUser] = useState(localStorage.getItem("dotaUser"));
  const [token, setToken] = useState(localStorage.getItem("dotaToken"));
  const [userId, setUserId] = useState(localStorage.getItem("dotaId"));
  const [text, setText] = useState("");
  const [setting, setSetting] = useState(
    JSON.parse(localStorage.getItem("dotaCardsAll"))
  );
  const [api, setApi] = useState(new Api(token));
  const [modalActive, setModalActive] = useState(true);
  const [addNewCard, setAddNewCard] = useState(false);
  useEffect(() => {
    if (token) {
      setApi(new Api(token));
    }
  }, [token]);
  useEffect(() => {
    if (api.token) {
      api.getAllCards().then((data) => {
        if (setting === true) {
          setServerCards(data);
          localStorage.setItem("dotaCardsAll", JSON.stringify(true));
        } else {
          setServerCards(data?.filter((elx) => elx.tags?.includes("dota2")));
          localStorage.setItem("dotaCardsAll", JSON.stringify(false));
        }
      });
    } else {
      console.log("нет токена");
    }
  }, [api.token, setting]);
  useEffect(() => {
    if (!cards.length) {
      setCards(serverCards);
    }
  }, [serverCards]);
  useEffect(() => {
    console.log("Change User");
    if (user) {
      setToken(localStorage.getItem("dotaToken"));
      setUserId(localStorage.getItem("dotaId"));
    } else {
      setToken("");
      setUserId("");
    }
    console.log("u", user);
  }, [user]);
  return (
    <Ctx.Provider
      value={{
        api,
        cards,
        setCards,
        serverCards,
        setServerCards,
        user,
        setUser,
        token,
        userId,
        text,
        setting,
        setSetting,
        singleCard,
        setSingleCard,
      }}
    >
      <Header
        user={user}
        setModalActive={setModalActive}
        serverCards={serverCards}
      />
      <main>
        {/* <Search arr={serverCards} /> */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/catalog"
            element={<Catalog setServerCards={setServerCards} />}
          />
          <Route path="/post/:postId" element={<CurrentCard />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add" element={<NewCard />} />
          <Route path="/edit/:postId" element={<EditCard />} />
        </Routes>
      </main>
      <Footer />
      <Modal
        active={modalActive}
        setActive={setModalActive}
        setUser={setUser}
      />
    </Ctx.Provider>
  );
};
export default App;
