import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import imageToBase64 from "../helpers/imgToBase64";
import { deleteContoh, updateContoh } from "../redux/Contoh/contoh.action";
import ContohDataService from "../services/contoh/contoh.service";

const CrudEditContoh = (props) => {
  let history = useHistory();
  const initialContohState = {
    _id: null,
    judul: "",
    img: "",
  };
  const [currentContoh, setCurrentContoh] = useState(initialContohState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getContoh = (id) => {
    ContohDataService.get(id)
      .then((response) => {
        setCurrentContoh(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getContoh(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentContoh({ ...currentContoh, [name]: value });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    const base64 = await imageToBase64(file);
    console.log(base64);
    setCurrentContoh({ ...currentContoh, [name]: base64 });
  };

  const updateContent = () => {
    dispatch(updateContoh(currentContoh._id, currentContoh))
      .then((response) => {
        console.log(response);

        setMessage("The Contoh was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeContoh = () => {
    dispatch(deleteContoh(currentContoh._id))
      .then(() => {
        props.history.push("/crud");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentContoh ? (
        <div className="edit-form">
          <h4>Contoh</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Judul</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentContoh.judul}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Image</label>
              <input
                type="file"
                className="form-control"
                id="img"
                name="img"
                // value={currentContoh.img}
                onChange={handleFileUpload}
              />
              {currentContoh.img ? (
              <img
                src={currentContoh.img}
                id="preview"
                alt="preview"
                style={{ height: 200, width: "auto", backgroundColor: "blue" }}
              />
            ) : (
              <div
                style={{
                  height: 200,
                  width: 300,
                  backgroundColor: "Highlight",
                }}
              />
            )}
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={removeContoh}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success mr-2"
            onClick={updateContent}
          >
            Update
          </button>
          <button
            type="submit"
            className="badge badge-warning"
            onClick={() => history.goBack()}
          >
            back
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Contoh...</p>
        </div>
      )}
    </div>
  );
};

export default CrudEditContoh;
