import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function FindLandDetails() {
  const location = useLocation();

  var x = location.state.gridLen;
  var y = location.state.gridWid;
  console.log(x, y);
  var landName = location.state.name;
  const [name, setName] = useState("");
  const [responseData, setResponseData] = useState([]);
  const [count,setCount] = useState(0);

  const callFindLandDetailsApi = () => {
    let api = `http://localhost:9090/v1/findLandDetails?lname=${name}`;
    console.log(api);
    axios
      .get(api)
      .then((response) => {
        setResponseData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [grid, setGrid] = useState(Array(x).fill(Array(y).fill(false)));
  console.log(grid);

  const myLand = () => {
    console.log("myLand called");
    return (
      <div>
        <div className="grid">
          {grid.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
              {row.map((cell, colIndex) => (
                <div
                  className={`cell ${cell ? "active" : "nonActive"}`}
                  key={`${rowIndex}-${colIndex}`}
                >
                  <p>row </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className="landDetailsDiv">
        <h1>your are in FindLandDetails page</h1>
        {/* <label>land name</label>
        <input
          type="text"
          value={name}
          placeholder="land name"
          onChange={(event) => setName(event.target.value)}
        ></input> */}
        <button onClick={callFindLandDetailsApi}>get land details</button>
      </div>
      <div>
        <button onClick={()=>setCount(count+1)}> view </button>
      </div>
      <div>
        {count>0 && myLand()}
      </div>
    </div>
  );
}

export default FindLandDetails;
