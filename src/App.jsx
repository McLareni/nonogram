import { useState, useEffect, useReducer } from "react";

import DUMMY_APPLE from "./scripts/DUMMY_APPLE.js";
import { generationArray } from "./scripts/generation.js";
import {
  GetRowsTabsHorizontal,
  GetRowsTabsVertical,
} from "./scripts/GetRowsTabs.js";

import GameField from "./components/GameField.jsx";
import TopMenu from "./components/TopMenu.jsx";
import Modal from "./components/Modal.jsx";

import { GridContext } from "./store/Grid-context.jsx";

const infoLineVertical = GetRowsTabsVertical(DUMMY_APPLE.grid).tabList;
const infoLineHorizontal = GetRowsTabsHorizontal(DUMMY_APPLE.grid).tabList;

let emptyRow = [];
let emptyCol = [];

infoLineVertical.map((col, index) => {
  if (col.length === 0) {
    emptyCol.push(index);
  }
});

infoLineHorizontal.map((row, index) => {
  if (row.length === 0) {
    emptyRow.push(index);
  }
});

const initialGrid = {
  grid:
    JSON.parse(localStorage.getItem("grid")) === null
      ? generationArray(DUMMY_APPLE.grid.length, DUMMY_APPLE.grid[0].length)
      : JSON.parse(localStorage.getItem("grid")),
  statusLineVertical: GetRowsTabsVertical(DUMMY_APPLE.grid).statusTabList,
  statusLineHorizontal: GetRowsTabsHorizontal(DUMMY_APPLE.grid).statusTabList,
};

function gridReducer(state, action) {
  let currState = {
    grid: state.grid.map((row) => [...row]),
    statusLineVertical: state.statusLineVertical.map((row) => [...row]),
    statusLineHorizontal: state.statusLineHorizontal.map((row) => [...row]),
  };

  switch (action.type) {
    case "changeColor":
      const { indexRow, indexCol, color } = action.properties;

      currState.grid[indexRow][indexCol] = color;
      localStorage.setItem("grid", JSON.stringify(currState.grid));

      return currState;

    case "closeLine":
      const { row, direction, status } = action.properties;

      let close = status === "close";
      let open = status === "open";

      if (direction === "vertical") {
        for (let i = 0; i < currState.grid.length; i++) {
          if (close && currState.grid[i][row] !== "black") {
            currState.grid[i][row] = currState.grid[i][row] === 'x' ? 'x' : "X";
            if (emptyCol.indexOf(row) === -1) {
              emptyCol.push(row);
            }
          } else if (open && currState.grid[i][row] !== "black" ) {
            currState.grid[i][row] = currState.grid[i][row] === 'x' ? 'x' : "white";
            emptyCol = emptyCol.filter((colIndex) => colIndex != row);
          }
        }
      } 
      else {
        currState.grid[row].map((cell, index) => {
          if (close && currState.grid[row][index] !== "black") {
            currState.grid[row][index] = currState.grid[row][index] === 'x' ? 'x' : "X";
            if (emptyRow.indexOf(row) === -1) {
              emptyRow.push(row);
            }
          }
          else if (open && currState.grid[row][index] !== "black") {
            currState.grid[row][index] = currState.grid[row][index] == "x" ? "x" : "white";
            emptyRow = emptyRow.filter((rowIndex) => rowIndex !== row);
          }
        });
      }

      return currState;
  }
}

let interval;

function App() {
  const [modalIsOpen, setModelIsOpen] = useState(false);
  const [ time, setTime ] = useState(0);
  const [grid, gridDispatch] = useReducer(gridReducer, initialGrid);

  function changeColor(indexRow, indexCol, color) {
    gridDispatch({
      type: "changeColor",
      properties: {
        indexRow,
        indexCol,
        color,
      },
    });
  }

  function closeLine(row, direction, action) {
    gridDispatch({
      type: "closeLine",
      properties: {
        row,
        direction,
        status: action,
      },
    });
  }

  useEffect(() => {
    interval = setInterval(() => {
      setTime(time => time + 1)
    }, 1000);
  }, []);

  if(modalIsOpen){
    console.log("stop");
    clearInterval(interval);
  }

  useEffect(() => {
    let finishGrid = grid.grid.map((row) => [...row]);

    finishGrid = finishGrid.map((row) =>
      row.map((cell) => (cell = cell === "black" ? "black" : "white"))
    );

    if (JSON.stringify(finishGrid) === JSON.stringify(DUMMY_APPLE.grid)) {

      setModelIsOpen(true);
    } else {
      modalIsOpen && setModelIsOpen(false);
    }
  }, [grid.grid]);

  const gridCxt = {
    name: DUMMY_APPLE.name,
    grid: grid.grid,
    changeColor: changeColor,
    closeLine: (row, direction, action) => closeLine(row, direction, action),
    statusLineVertical: grid.statusLineVertical,
    statusLineHorizontal: grid.statusLineHorizontal,
  };

  return (
    <GridContext.Provider value={gridCxt}>
      <Modal modalIsOpen={modalIsOpen} time={time}/>
      <TopMenu time={time}/>
      <GameField emptyRow={emptyRow} emptyCol={emptyCol}/>
    </GridContext.Provider>
  );
}

export default App;
