import React, { useContext, useEffect, useState } from 'react';
import {BinocularsFill} from "react-bootstrap-icons";

import Ctx from "../../context";
import Card from "../Card/index";
import "./style.css";

const Search = () => {

	const {
		serverCards,
		setServerCards,
		text,
    setText
	} = useContext(Ctx);

	const [uniqueArr, setUniqueArr] = useState([]);

	useEffect(() => {
		let filterPosts = []
		serverCards?.forEach(element => {
			if (element.text.toLowerCase().includes(text.toLowerCase())) {
				filterPosts = [...filterPosts, element]
			}
			element.tags.forEach(tag => {
				if (tag.toLowerCase() === text.toLowerCase()) {
					filterPosts = [...filterPosts, element]
				}
			});
		})
		const arr = Array.from(new Set(filterPosts));
		setUniqueArr(arr)
	}, [text]);

  return (
    <div className="search-block">
      {/* {uniqueArr?.length > 0 && <>
				{uniqueArr?.map((e, i) => <Card key={e._id} element={e} />)}
			</>}
			{uniqueArr?.length === 0 && <>
				<h5>Ничего не найдено</h5>
			</>} */}
      <form>
        <input
          type="search"
          value=""
          onChange=""
          className="search"
          placeholder="Поиск"
        />
      </form>
      <div className="btn__binoculars">
        <button onClick="" className="binoculars__btn">
          <BinocularsFill />
        </button>
      </div>
      <hr />
      {/* <div>По вашему запросу «{text}» найдено {quantity} подходящих товаров</div> */}
    </div>
  );
};

export default Search;
