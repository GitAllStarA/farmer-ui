import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./HomePageStyle.css";
import Grid2 from "./Grid2";

function HomePage() {
  const navigate = useNavigate();

  const goToFindLand = () => {
    navigate("/findLand");
  };

  const [landName, setLandName] = useState("");
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [llocation, setLlocation] = useState("");

  const [numRows, setNumRows] = useState(0);
  const [numCols, setNumCols] = useState(0);
  const [showGrid, setShowGird] = useState(false);

  const callAPI = (event) => {
    event.preventDefault();
    const BASE_URL = `http://localhost:9090/v1/ld?lname=${landName}&lh=${length}&wh=${width}&location=${llocation}`;
    axios
      .get(BASE_URL)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOnChangeLength = (event) => {
    let val = parseInt(event.target.value);
    setLength(val);
  };
  const handleOnChangeWidth = (event) => {
    let val = parseInt(event.target.value);
    setWidth(val);
  };

  const handleGridClick = () => {
    console.log("here at handleGridClick ");
    setNumRows(parseInt(length));
    setNumCols(parseInt(width));
    setShowGird(!showGrid);
  };

  return (
    <div>
      <div className="container-fluid bg-light-green min-vh-100 d-flex align-items-center justify-content-center">
        <h1 className="text-center mb-4">Farming App</h1>
        <form onSubmit={(event) => callAPI(event)}>
          <div className="mb-3">
            <label htmlFor="landName" className="form-label">
              Land Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="landName"
              value={landName}
              onChange={(e) => setLandName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="length" className="form-label">
              Length (in acres):
            </label>
            <input
              type="number"
              className="form-control"
              id="length"
              value={length}
              onChange={handleOnChangeLength}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="width" className="form-label">
              Width (in acres):
            </label>
            <input
              type="number"
              className="form-control"
              id="width"
              value={width}
              onChange={handleOnChangeWidth}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="width" className="form-label">
              
              Location:
            </label>
            <input
              type="text"
              className="form-control"
              id="width"
              value={llocation}
              onChange={(e) => setLlocation(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2">
            Add Land
          </button>
        </form>
        <button onClick={goToFindLand} className="btn find-land-button">
          FindLand
        </button>
        <div>
          {showGrid && numRows > 0 && numCols > 0 ? (
            <button onClick={handleGridClick}>Hide Grid</button>
          ) : (
            <button onClick={handleGridClick}>show Grid</button>
          )}
          {showGrid && <Grid2 numRows={numRows} numCols={numCols} />}
        </div>
      </div>
      </div>
  );
}

export default HomePage;
