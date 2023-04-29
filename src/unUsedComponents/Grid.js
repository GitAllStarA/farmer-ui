import React from 'react';
import './Grid.css';

const Grid = ({ rowCount, columnCount }) => {
  const rows = [...Array(rowCount).keys()];
  const columns = [...Array(columnCount).keys()];

  return (
    <div className="grid-container" style={{ width: columnCount * 50 }}>
      {rows.map((row, rowIndex) =>
        columns.map((column, columnIndex) => (
          <div key={`${rowIndex}-${columnIndex}`} className="grid-box">
            {`${rowIndex}-${columnIndex}`}
          </div>
        ))
      )}
    </div>
  );
};

export default Grid;
