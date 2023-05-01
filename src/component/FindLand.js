import axios from "axios";
import React, { useState } from "react";
import "./FindLandCss.css";
import { useNavigate } from "react-router-dom";

function FindLand() {
  const [land, setLand] = useState({});
  const initialValues = {
    ///id: null,
    landName: "",
    length: 0,
    width: 0,
    location: "",
  };

  const navigate = useNavigate();

  const [data, setData] = useState(initialValues);

  const [showButton, setShowButton] = useState(null);

  const callApiFindLand = async () => {
    const urlStringFindLand = `http://localhost:9090/v1/findLand?lname=${land}`;
    await axios
      .get(urlStringFindLand)
      .then((resposne) => {
        //what kind it is retunring is it object or array? we can check at console
        console.log("here " + resposne.constructor.name);
        console.log("here " + resposne.data.constructor.name);
        setData(resposne.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(data);

  const [useLen, setUseLen] = useState(0);
  const [useWid, setUseWid] = useState(0);
  const [landName, setLandName] = useState("");

  const handleRowDoubleClick = (index, name) => {
    setShowButton(index);
    data.map((row, idx) => {
      if (index === idx) {
        var len = parseInt(row.length);
        var wid = parseInt(row.width);
        setUseLen(len);
        setUseWid(wid);
        setLandName(name);
        console.log(useLen);
        console.log(useWid);
        console.log(landName);
      }
    });
  };

  const renderButtonRow = (index, name) => {
    if (showButton === index && useLen > 0 && useWid > 0) {
      console.log("here land name for render button " + landName);
      return (
        <button
          style={{
            padding: "5px 5px",
            textAlign: "center",
            textDecoration: "none",
            display: "inlineBlock",
            fontSize: "10px",
          }}
          onClick={toLandGrid}
        >
          View Land {name}
        </button>
      );
    }
    return null;
  };

  const renderButtonRowLandDetails = (index, name) => {
    if (showButton === index && useLen > 0 && useWid > 0) {
      console.log("here land details for render button " + landName);
      return (
        <button
          style={{
            padding: "5px 5px",
            textAlign: "center",
            textDecoration: "none",
            display: "inlineBlock",
            fontSize: "10px",
          }}
          onClick={toFindLandDetails}
        >
          land details of {name}
        </button>
      );
    }
    return null;
  };

  const toLandGrid = () => {
    navigate("/landGrid", {
      state: { gridLen: useLen, gridWid: useWid, name: landName },
    });
  };

  const toFindLandDetails = () => {
    navigate("/findLandDetails", {
      state: { gridLen: useLen, gridWid: useWid, name: landName },
    });
  };

  return (
    <div className="container">
      <label>Enter the Land Name</label>
      <br />
      <input
        type="text"
        placeholder="Land Name"
        onChange={(e) => {
          setLand(e.target.value);
        }}
      />
      <br />
      <button type="submit" onClick={callApiFindLand}>
        {" "}
        submit{" "}
      </button>
      <div className="container"></div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Land Name</th>
            <th>Length</th>
            <th>Width</th>
            <th>Acers</th>
            <th>Location</th>
            <th>{useLen > 0 && useWid > 0 ? "View Land Grids" : ""}</th>
            <th>{useLen > 0 && useWid > 0 ? "View Land Details" : ""}</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((row, index) => (
              <tr
                key={row.id}
                onClick={() => handleRowDoubleClick(index, row.name)}
                // style={{cursor: 'pointer'}}
                className="clickable-row"
              >
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.length}</td>
                <td>{row.width}</td>
                <td>{row.length * row.width}</td>
                <td>{row.location}</td>
                <td>
                  {useLen > 0 && useWid > 0
                    ? renderButtonRow(index, row.name)
                    : " "}
                </td>
                <td>{useLen > 0 && useWid > 0
                    ?renderButtonRowLandDetails(index, row.name): " "}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>no data found</td>
            </tr>
          )}
        </tbody>
      </table>
      <div></div>
    </div>
  );
}

export default FindLand;
