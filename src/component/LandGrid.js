import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./LandGridCss.css";
import axios from "axios";
function LandGrid() {
  const location = useLocation();

  var x = location.state.gridLen;
  var y = location.state.gridWid;
  var landName = location.state.name;

  const [form, setFormState] = useState(false);
  const [whatCell, setWhatCell] = useState(0);
  const [prevCell, setPrevCell] = useState(true);
  const [sowDateTime, setSowDateTime] = useState(null);
  const [crop_seed, setCrop_seed] = useState("");

  useEffect(() => {
    console.log("here at LandGrid.js");
    //gridLen: useLen, gridWid: useWid
    console.log(x);
    console.log(y);
    console.log(landName);
  }, []);

  const [myLandGrids, setMyLandGrids] = useState(
    Array(x).fill(Array(y).fill(false))
  );
  console.log(myLandGrids);

  // const list = [
  //   [0, 2],
  //   [1, 2],
  //   [4, 4],
  // ];
  const handleOnClickLandGrid = (rowIndex, colIndex) => {
    // list.forEach((cell) => {
    //   if (cell[0] === rowIndex && cell[1] === colIndex) {
    //     console.log("we got it " + [rowIndex, colIndex]);
    //     changeGridColorOnClick(rowIndex, colIndex);
    //   }
    // });
    changeGridColorOnClick(rowIndex, colIndex);
    setWhatCell(rowIndex * y + colIndex + 1);
  };

  const changeGridColorOnClick = (gridRow, gridCol) => {
    setMyLandGrids(
      myLandGrids.map((row, rowIndex) =>
        rowIndex === gridRow
          ? row.map((cell, colIndex) => (colIndex === gridCol ? !cell : cell))
          : row
      )
    );
  };

  const handleFormState = () => {
    console.log("showing form please check the web page");
    setFormState(true);
  };

  let rpoc = null;
  const relativePositionOfCell = (row, colCell) => {
    rpoc = row * y + colCell + 1;

    console.log("relative position : " + rpoc);
    console.log("row " + row);
    console.log("col cell " + colCell);

    return rpoc;
  };

  const callCropCellApi = async (event) => {
    handleDateTime(event);
    const columnsSize = myLandGrids[0].length;
    const rowNCol = whatCell-1;
    let coordinatesOfCell = "%5B" +Math.floor(rowNCol / columnsSize) + "," + (rowNCol % columnsSize) + "%5D";
    const cellCropUrlString = `http://localhost:9090/v1/addCrop?lname=${landName}&gridCell=${coordinatesOfCell}&cname=${crop_seed}&sowDateTime=${sowDateTime}&relativePosition=${whatCell}&landLen=${x}&landWid=${y}`;
    event.preventDefault();
    await axios
      .get(cellCropUrlString)
      .then((response) => {
        console.log(response.data);
        if(response.status!==200){
          console.log(response.status);
        }
      })
      .catch((error)=> {
        console.log(error);
      })
  };

  const handleDateTime = (event) => {
    const eventDate = new Date(Date.now());
    const year = eventDate.getFullYear();
    const month = eventDate.getMonth() + 1; // add 1 because January is 0
    const day = eventDate.getDate();
    const hours = eventDate.getHours();
    const minutes = eventDate.getMinutes();
    const seconds = eventDate.getSeconds();

    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = `${hours}%3A${minutes}%3A${seconds}`;

    setSowDateTime(""+formattedDate + "T" + formattedTime+"");
  };

  const handleCropValue = (event)=>{
      setCrop_seed(event.target.value);
  }

  return (
    <div>
      <div className="grid">
        <div>
          {myLandGrids.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
              {row.map((cell, colIndex) => (
                <div
                  className={`cell ${cell ? "active" : "nonActive"}`}
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleOnClickLandGrid(rowIndex, colIndex)}
                >
                  <p className="relativePositionP">
                    <b>{relativePositionOfCell(rowIndex, colIndex)}</b>
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div>
        <form onSubmit={(event) => callCropCellApi(event)}>
          <label>
            {" "}
            {whatCell === 0
              ? `Click on a cell in ${landName}'s land to sow plant seeds`
              : `Enter the details for ${landName} Cell ${whatCell}`}
          </label>
          <input
            placeholder="seed name"
            type="text"
            className="form-control"
            onChange={handleCropValue}
            value={crop_seed}
          ></input>
          <button
            onClick={ whatCell>0 ?  (event) => handleDateTime(event) : "" }
            type="submit"
            className="btn btn-primary w-100 py-2"
          >
            sowed
          </button>
        </form>
      </div>
    </div>
  );
}

export default LandGrid;
