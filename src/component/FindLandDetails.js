import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./FindLandDetails.css";

function FindLandDetails() {
  const location = useLocation();

  var x = location.state.gridLen;
  var y = location.state.gridWid;
  console.log(x, y);
  var landName = location.state.name;
  const [name, setName] = useState("");
  const [responseData, setResponseData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [grid, setGrid] = useState(Array(x).fill(Array(y).fill(false)));
  const [arrayList, setArrayList] = useState([]);
  const [crop, setCrop] = useState([]);

  const callFindLandDetailsApi = () => {
    let api = `http://localhost:9090/v1/findLandDetails?lname=${landName}`;
    console.log(api);
    axios
      .get(api)
      .then((response) => {
        setResponseData(response.data);
        //console.log(responseData);
        mapApiCellsToLandCells(responseData);
      })
      .catch((error) => {
        console.log(error);
      });
      handleView();
  };

  const mapApiCellsToLandCells = (respData) => {
    let arrayOfItems = respData.map((data, idx) => {
      // Check if data.cell is a valid JSON string before parsing
      try {
        return JSON.parse(data.cell);
      } catch (error) {
        console.log(`Error parsing cell at index ${idx}:`, error);
        return null; // Return null or any default value when parsing fails
      }
    });

    // Filter out any null or default values resulting from parsing failures
    arrayOfItems = arrayOfItems.filter((item) => item !== null);
    let arrayOfcrops = respData.map((data, idx) => {
      return data.crop;
    });
    setArrayList(arrayOfItems);
    arrayOfcrops = arrayOfcrops.filter((crop) => crop !== null);
    setCrop(arrayOfcrops);
    console.log("----------------------------");
    console.log(arrayList);
    console.log(arrayOfcrops);
    return arrayOfItems;
  };

  const [populateCrop, setPopulateCrop] = useState("");

  const handleLandDetails = (rowIndex, colIndex) => {
    //https://www.google.com/search?q=usd+to+inr&oq=usd+to+inr&aqs=chrome..69i57j0i512l9.2861j0j7&sourceid=chrome&ie=UTF-8
    arrayList.forEach((array, idx) => {
      if (array[0] === rowIndex && array[1] === colIndex) {
        console.log("we got it" + [rowIndex, colIndex]);
        let cropIdxValue = crop[idx];
        //console.log("idx " + idx + " "+cropIdxValue);
        let rp = rowIndex*y+colIndex;
        changeGridColorOnClickForLandCells(rowIndex, colIndex);
      }
    });
  };

  const changeGridColorOnClickForLandCells = (gridRow, gridCol) => {
    setGrid(
      grid.map((row, rowIdx) =>
        rowIdx === gridRow
          ? row.map((cell, colIdx) => (colIdx === gridCol ? !cell : cell))
          : row
      )
    );
  };

  

   const getCropData = (row, col) => {
    for (let i = 0; i < arrayList.length; i++) {
      const [r, c] = arrayList[i];
      if (r === row && c === col) {
        return crop[i];
      }
    }
    return "";
  };

  const myLand = () => {
    console.log("myLand called");
    return (
      <div className="container">
        <div className="grid">
          {grid.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
              {row.map((cell, colIndex) => (
                <div
                  className={`cell ${cell ? "active" : "nonActive"}`}
                  key={`${rowIndex}-${colIndex}`}
                  onClick={  responseData!==null ? () => {handleLandDetails(rowIndex, colIndex);} : "no data found" }
                >
                  <p>{getCropData(rowIndex,colIndex)}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleView = () => {
    setToggle(!toggle);
    console.log("toggle -> " + toggle);
  };

  return (
    <div>
      <div className="landDetailsDiv">
        <h2>
          currently viewing{" "}
          <u>
            <i>
              <b>{landName}'s </b>
            </i>
          </u>{" "}
          land
        </h2>
        {/* <label>land name</label>
        <input
          type="text"
          value={name}
          placeholder="land name"
          onChange={(event) => setName(event.target.value)}
        ></input> */}
        <button onClick={callFindLandDetailsApi}>get land details</button>
      </div>
      <div>{toggle && myLand()}</div>
    </div>
  );
}

export default FindLandDetails;
