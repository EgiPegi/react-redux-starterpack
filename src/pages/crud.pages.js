import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  deleteAllContoh,
  deleteContoh,
  findContohByTitle,
  retrieveContoh,
} from "../redux/Contoh/contoh.action";

const CrudContoh = () => {
  let history = useHistory();

  const [currentContoh, setCurrentContoh] = useState(null);
  // const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const contoh = useSelector((state) => state.contoh);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveContoh());
  }, [dispatch]);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const refreshData = () => {
    setCurrentContoh(null);
    // setCurrentIndex(-1);
  };

  const removeAllContoh = () => {
    dispatch(deleteAllContoh())
      .then((response) => {
        console.log(response);
        refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    refreshData();
    dispatch(findContohByTitle(searchTitle));
  };

  const selectContoh = (contoh) => {
    setCurrentContoh(contoh);
    // setCurrentIndex(index);
  };
  const deleteOne = () => {
    dispatch(deleteContoh(currentContoh._id))
      .then(() => {
        console.log("terhapus");
        dispatch(retrieveContoh());
        refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="list row">
        <div className="col-md-6">
          <h4 className="mb-5">Contoh CRUD List</h4>
          <button
            className="btn btn-primary mb-3"
            onClick={() => history.push("add")}
          >
            ADD
          </button>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByTitle}
              >
                Search
              </button>
            </div>
          </div>
          <ul className="list-group">
            {contoh &&
              contoh.map((cth, index) => (
                <li
                  className="list-group-item"
                  key={index}
                  onClick={() => selectContoh(cth)}
                >
                  {cth.judul}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={removeAllContoh}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6 border border-info p-2 rounded">
          {currentContoh ? (
            <div>
              <h4 className="mb-5">Detail Contoh</h4>
              <div>
                <label>
                  <strong>Judul:</strong>
                  <i className="bi-alarm"></i>
                </label>{" "}
                {currentContoh.judul}
              </div>
              <div>
                <label>
                  <strong>Gambar:</strong>
                </label>{" "}
                <img
                  src={currentContoh.img}
                  alt={currentContoh.judul}
                  width={400}
                />
              </div>
              <div style={{ height: 10 }} />
              <Link
                to={"/edit/" + currentContoh._id}
                className="badge badge-warning p-2 mr-2"
              >
                Edit
              </Link>
              <Link
                onClick={() => {
                  if (
                    window.confirm("Hapus Contoh " + currentContoh.judul + " ?")
                  ) {
                    deleteOne();
                  }
                }}
                to="#"
                className="badge badge-danger p-2"
              >
                Delete
              </Link>
            </div>
          ) : (
            <div>
              <h4 className="mb-5">Detail Contoh</h4>
              <br />
              <p>Please click on contoh CRUD list...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrudContoh;
