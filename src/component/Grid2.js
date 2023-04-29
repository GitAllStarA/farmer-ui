import React, { useState } from "react";
import "./Grid2.css";

function Grid2({ numRows, numCols }) {
  const [grid, setGrid] = useState(
    Array(numRows).fill(Array(numCols).fill(false))
  );
  console.log(grid);

  const handleClick = (row, col) => {
    console.log("handled color at : " + row, col);
    setGrid(
      grid.map((rowArray, rowIndex) =>
        rowIndex === row
          ? rowArray.map((cell, colIndex) => (colIndex === col ? !cell : cell))
          : rowArray
      )
    );
  };

  return (
    <div className="grid">
      <div>
        {grid.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((cell, colIndex) => (
              <div
                className={`cell ${cell ? "active" : "nonActive"}`}
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleClick(rowIndex, colIndex)}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Grid2;
