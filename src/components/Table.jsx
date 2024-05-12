import { useContext, useRef } from "react";

import { GridContext } from "../store/Grid-context.jsx";

import Cell from "./Cell.jsx";

let cell = undefined;
let timmer, startTimmer;
let clamp = false;
let clikedCell = [];

function handleMove(e) {
  if (clamp) {
    cell = e.target;
  }
}

function handleDown(e) {
  e.preventDefault();
  startTimmer = setTimeout(() => {
    clikedCell[0] = cell;
    clamp = true;

    timmer = setInterval(() => {
      if (clikedCell.indexOf(cell) === -1) {
        cell.click();
        clikedCell.push(cell);
      }
    }, 100);
  }, 40);
}

function handleUp() {
  clamp = false;
  clearInterval(timmer);
  clearTimeout(startTimmer);
  clikedCell = [];
}

export default function Table({
  scale = 0,
  info = false,
  emptyRow = [],
  emptyCol = [],
}) {
  const { grid } = useContext(GridContext);

  let cssClasses = "flex flex-col items-center h-full w-full";

  if (info) {
    cssClasses += " border border-black";
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
                  scale={scale}
                  info={info}
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
                }
                else{
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
}
