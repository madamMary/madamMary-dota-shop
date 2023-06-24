import { useState, useContext } from "react";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import usePagination from "../hooks/usePagination";
import "./style.css";
import Ctx from "../context";

const Catalog = () => {
  const { serverCards } = useContext(Ctx);
  const [sort, setSort] = useState(true);
  let paginate = usePagination(serverCards, 10);

  return (
    <div className="catalog">
      <div className="mb-2">
        <Pagination hk={paginate} setSort={setSort} />
      </div>
      <div className="contain_Page_Posts"></div>
      <h2>Каталог карточек</h2>
      <div className="container_card">
        {paginate.setDataPerPage(sort).map((g) => (
          <Card key={g._id} element={g} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
