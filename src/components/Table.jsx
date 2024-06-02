import { useContext } from "react";

import { GridContext } from "../store/Grid-context.jsx";

import Cell from "./Cell.jsx";

let cell = undefined;
let timmer, startTimmer;
let clamp = false;
let currBg;


const Table = function Table({
  info = false,
  emptyRow = [],
  emptyCol = [],
}) {
  const { grid, changeColor } = useContext(GridContext);

  let cssClasses = "flex flex-col items-center aspect-square";

  if (info) {
    cssClasses += " border border-black min-w-full";
  }

  function handleClick(e, indexRow, indexCol) {
    e.preventDefault();
    changeColor(indexRow, indexCol, currBg);
  }

  function handleMove(e) {
    if (clamp) {
      cell = e.target;
    }
  }

  function handleDown(e) {
    e.preventDefault();
    if (e.button === 0) {
      currBg = e.target.classList.contains("bg-stone-900") ? "white" : "black";
    } else if (e.button === 2) {
      currBg = e.target.textContent === 'X' ? " " : "x";
    }

    e.target.click();

    startTimmer = setTimeout(() => {
      clamp = true;
      timmer = setInterval(() => {
        if (!cell) {
          e.target.click();
        } else {
          cell.click();
        }
      }, 50);
    }, 40);
  }

  function handleUp(e) {
    clamp = false;
    cell = undefined;
    clearInterval(timmer);
    clearTimeout(startTimmer);
  }

  return (
    <div
      className={cssClasses}
      onMouseMove={handleMove}
      onMouseDown={handleDown}
      onMouseUp={handleUp}
      onMouseLeave={handleUp}
    >
      {grid.map((row, rowIndex) => {
        let cell;
        return (
          <div className="flex flex-row w-full flex-1" key={rowIndex}>
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
};

export default Table
