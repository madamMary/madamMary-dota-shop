import React, { useContext } from 'react';
import {BinocularsFill} from "react-bootstrap-icons";

import Ctx from "../../context";
import "./style.css";

const Search = () => {
  const { text, setText } = useContext(Ctx);

  return (
    <div className="search-block">
      <form>
        <input
          type="search"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="search"
          placeholder="Поиск"
        />
      </form>
      <div className="btn__binoculars">
        <button className="binoculars__btn">
          <BinocularsFill />
        </button>
      </div>
      <hr />
    </div>
  );
};

export default Search;