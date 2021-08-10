import React, { useState } from "react";

//redux
import { useDispatch } from "react-redux";
import { createContoh } from "../redux/Contoh/contoh.action";
import { useHistory } from "react-router-dom";

//compress ukuran foto dan di konvert ke base64 string
import imageToBase64 from "../helpers/imgToBase64";

const CrudAddContoh = () => {
  //initial state
  const initialContohState = {
    judul: "",
    img: "",
  };

  let history = useHistory();
  const [contoh, setContoh] = useState(initialContohState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContoh({ ...contoh, [name]: value });
    console.log(contoh);
    // console.log(event)
  };

  const saveContoh = () => {
    const { judul, img } = contoh;

    dispatch(createContoh(judul, img))
      .then((data) => {
        setContoh({
          id: data.id,
          judul: data.judul,
          img: data.img,
        });
        setSubmitted(true);

        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newContoh = () => {
    setContoh(initialContohState);
    setSubmitted(false);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    const base64 = await imageToBase64(file);
    console.log(base64);
    setContoh({ ...contoh, [name]: base64 });

    // handleInputChange()
    // setImg(base64);
  };
  return (
    <div className="container">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newContoh}>
            Add
          </button>
          <button
            type="submit"
            className="btn btn-danger"
            onClick={() => history.goBack()}
          >
            Back
          </button>
        </div>
      ) : (
        <>
          <div className="form-group">
            <label htmlFor="exampleInput1">Judul</label>
            <input
              type="email"
              className="form-control"
              id="exampleInput1"
              aria-describedby="judulH"
              placeholder="Enter Title"
              value={contoh.judul}
              onChange={handleInputChange}
              name="judul"
            />
            <small id="judulH" className="form-text text-muted">
              We'll never share your info with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail2">Gambar</label>
            <input
              type="file"
              className="form-control"
              id="exampleInput1"
              onChange={handleFileUpload}
              name="img"
            />
            <small id="imgH" className="form-text text-muted">
              We'll never share your info with anyone else.
            </small>
            {contoh.img ? (
              <img
                src={contoh.img}
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
          <button
            type="submit"
            className="btn btn-primary"
            onClick={saveContoh}
          >
            Submit
          </button>
          <button
            type="submit"
            className="btn btn-danger"
            onClick={() => history.goBack()}
          >
            Back
          </button>
        </>
      )}
    </div>
  );
};

export default CrudAddContoh;
