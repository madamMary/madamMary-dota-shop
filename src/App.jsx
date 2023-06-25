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
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    const localToken = localStorage.getItem("dotaToken");
    if (localToken) {
      setApi(new Api(token));
    }
  }, [token]);

  useEffect(() => {
    if (api.token) {
      api.getAllCards().then((data) => {
        let testArr = [];
        if (setting === true) {
          testArr = data;
          localStorage.setItem("dotaCardsAll", JSON.stringify(true));
        } else {
          testArr = data?.filter((elx) => elx.tags?.includes("dota2"));
          localStorage.setItem("dotaCardsAll", JSON.stringify(false));
        }

        if (text) {
          const delayDebounceFn = setTimeout(() => {
            let filterPosts = [];
            testArr?.forEach((element) => {
              if (element.text.toLowerCase().includes(text.toLowerCase())) {
                filterPosts = [...filterPosts, element];
              }
              element.tags.forEach((tag) => {
                if (tag.toLowerCase() === text.toLowerCase()) {
                  filterPosts = [...filterPosts, element];
                }
              });
            });
            const arr = Array.from(new Set(filterPosts));
            setServerCards(arr);
          }, 200);
          return () => clearTimeout(delayDebounceFn);
        } else {
          setServerCards(testArr);
        }
      });
    } else {
      console.log("нет токена");
    }
  }, [api.token, setting, text]);

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
        setText,
        setModalActive
      }}
    >
      <Header
        user={user}
        setModalActive={setModalActive}
        serverCards={serverCards}
      />
      <main>
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
