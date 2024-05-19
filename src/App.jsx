import { useState, useEffect } from "react";

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

let timer;

function App() {
  const [time, setTime] = useState(0);
  const [ modalIsOpen, setModelIsOpen ] = useState(false);
  const [grid, setGrid] = useState({
    grid:
      JSON.parse(localStorage.getItem("grid")) === null
        ? generationArray(DUMMY_APPLE.grid.length, DUMMY_APPLE.grid[0].length)
        : JSON.parse(localStorage.getItem("grid")),
    statusLineVertical: GetRowsTabsVertical(DUMMY_APPLE.grid).statusTabList,
    statusLineHorizontal: GetRowsTabsHorizontal(DUMMY_APPLE.grid).statusTabList,
  });

  function changeColor(indexRow, indexCol, color) {
    setGrid((prev) => {
      let curr = { ...prev };

      curr.grid = [...prev.grid];

      curr.grid[indexRow][indexCol] = color;
      localStorage.setItem("grid", JSON.stringify(curr.grid));
      return curr;
    });
  }

  function closeLine(row, direction, action) {
    let close = action === "close";
    let open = action === "open";

    if (direction === "vertical") {
      console.log(grid);
      for (let i = 0; i < grid.grid.length; i++) {
        setGrid((prevGrid) => {
          let currGrid = {
            ...prevGrid,
            grid: prevGrid.grid.map((row) => [...row]),
          };
          if (close && currGrid.grid[i][row] !== "black") {
            currGrid.grid[i][row] = "X";
            if (emptyCol.indexOf(row) === -1) {
              emptyCol.push(row);
            }
          }
          if (open && currGrid.grid[i][row] !== "black") {
            currGrid.grid[i][row] = "white";
            emptyCol = emptyCol.filter((colIndex) => colIndex != row);
          }

          return currGrid;
        });
      }
    } else {
      setGrid((prevGrid) => {
        let currGrid = {
          ...prevGrid,
          grid: prevGrid.grid.map((row) => [...row]),
        };
        currGrid.grid[row].map((cell, index) => {
          console.log(currGrid.grid[row][index]);
          if (close && currGrid.grid[row][index] !== "black") {
            currGrid.grid[row][index] = "X";
            if (emptyRow.indexOf(row) === -1) {
              emptyRow.push(row);
              console.log(emptyRow);
            }
          }
          if (open && currGrid.grid[row][index] !== "black") {
            currGrid.grid[row][index] = "white";
            emptyRow = emptyRow.filter((rowIndex) => rowIndex !== row);
          }
        });
        return currGrid;
      });
    }
  }

  useEffect(() => {
    let finishGrid = grid.grid.map((row) => [...row]);

    finishGrid = finishGrid.map((row) =>
      row.map((cell) => (cell = cell === "black" ? "black" : "white"))
    );

    if (JSON.stringify(finishGrid) === JSON.stringify(DUMMY_APPLE.grid)) {
      clearTimeout(timer);

      setModelIsOpen(true);
    }
    else{
      modalIsOpen && setModelIsOpen(false);
    }
  }, [grid.grid]);

  useEffect(() => {
    timer = setInterval(() => {
      setTime((prev => prev + 1))
    }, 1000);
  }, []);

  const gridCxt = {
    name: DUMMY_APPLE.name,
    width: DUMMY_APPLE.grid[0].length,
    heigth: DUMMY_APPLE.grid.length,
    grid: grid.grid,
    changeColor: changeColor,
    closeLine: (row, direction, action) => closeLine(row, direction, action),
    statusLineVertical: grid.statusLineVertical,
    statusLineHorizontal: grid.statusLineHorizontal,
  };

  return (
    <GridContext.Provider value={gridCxt}>
      <Modal modalIsOpen={modalIsOpen} time={time} />
      <TopMenu time={time} />
      <GameField/>
    </GridContext.Provider>
  );
}

export default App;
