import { useContext, memo, useEffect } from "react";

import { GridContext } from "../store/Grid-context.jsx";

import Cell from "./Cell.jsx";

let currBg;

export default memo(function Table({
  info = false,
  emptyRow = [],
  emptyCol = [],
  changeColor,
}) {
  const { grid } = useContext(GridContext);

  function handleClick(e, indexRow, indexCol) {
    e.preventDefault();
    changeColor(indexRow, indexCol);
  }

  let cssClasses = "flex flex-col items-center h-full";

  // useEffect(() => {
  //   return () => {
  //     handleUp();
  //   };
  // }, []);

  return (
    <div className={cssClasses}>
      {grid.map((row, rowIndex) => {
        let cell;
        return (
          <div className="flex flex-row w-full" key={rowIndex}>
            {row.map((cell, cellIndex) => {
              cell = (
                <Cell
                  indexRow={rowIndex}
                  indexCol={cellIndex}
                  key={cellIndex}
                  info={info}
                  click={handleClick}
                />
              );
              if (
                emptyCol.indexOf(cellIndex) !== -1 ||
                emptyRow.indexOf(rowIndex) !== -1
              ) {
                if (grid[rowIndex][cellIndex] !== "black") {
                  return (
                    <Cell
                      indexRow={rowIndex}
                      indexCol={cellIndex}
                      key={cellIndex}
                      info={info}
                      defaultContent={"X"}
                    />
                  );
                } else {
                  return cell;
                }
              }
              return cell;
            })}
          </div>
        );
      })}
    </div>
  );
});
