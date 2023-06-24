import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Ctx from "../../context";
import "./style.css";

const Modal = ({ active, setActive, setUser }) => {
  const [auth, setAuth] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [testPwd, setTestPwd] = useState("");
  const { api } = useContext(Ctx);
 
  const testAccess = {
    color: pwd === testPwd ? "forestgreen" : "crimson",
  };

  const switchAuth = (e) => {
    e.preventDefault();
    setAuth(!auth);
    clearForm();
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setPwd("");
    setTestPwd("");
  };

  const sendForm = async (e) => {
    e.preventDefault();
    let body = {
      email: email,
      password: pwd,
    };

    if (!auth) {
      body.name = name;
      body.group = "group-12";
    }

    let data = await (auth ? api.auth(body) : api.reg(body));
    if (!data.err) {
      if (!auth) {
        delete body.name;
        delete body.group;

        let dataLog = await api.auth(body);
        if (!dataLog.err) {
          localStorage.setItem("dotaUser", dataLog.name);
          localStorage.setItem("dotaToken", dataLog.token);
          localStorage.setItem("dotaId", dataLog.data._id);
          clearForm();
          setActive(false);
          setUser(dataLog.data.name);
        }

      } else {
        if (!data.err) {
          localStorage.setItem("dotaUser", data.data.name);
          localStorage.setItem("dotaToken", data.token);
          localStorage.setItem("dotaId", data.data._id);
          clearForm();
          setActive(false);
          setUser(data.data.name);
        }
      }
    }
  };

  return (
    <div
      className="modal-wrapper"
      style={{ display: active ? "flex" : "none" }}
    >
      <div className="my-modal">
        <div className="close__btn">
          <div className="cl-btn">
            <Link onClick={() => setActive(false)}>
              <span class="top"></span>
              <span class="bot"></span>
            </Link>
          </div>
          <div className="auth__text">
            <h3>Авторизация</h3>
          </div>
        </div>
        <form onSubmit={sendForm}>
          {!auth && (
            <label>
              Имя пользователя
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          )}
          <label>
            Электронный адрес
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Пароль
            <input
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
          </label>
          {!auth && (
            <label>
              Повторить пароль
              <input
                type="password"
                value={testPwd}
                onChange={(e) => setTestPwd(e.target.value)}
                style={testAccess}
              />
            </label>
          )}
          <div className="modal-ctl">
            <button
              className="modal-btn"
              disabled={!auth && (!pwd || pwd !== testPwd)}
            >
              {auth ? "Войти" : "Создать аккаунт"}
            </button>
            <Link href="" className="modal-btn" onClick={switchAuth}>
              <button className="modal-btn">
                {auth ? "Регистрация" : "Войти"}
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
