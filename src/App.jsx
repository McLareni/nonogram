import { useEffect, useRef, useState } from "react";

import DUMMY_APPLE from "./scripts/DUMMY_APPLE";
import { generationArray } from "./scripts/generation.js";
import {
  GetRowsTabsHorizontal,
  GetRowsTabsVertical,
} from "./scripts/GetRowsTabs.js";

import Modal from "./components/Modal.jsx";
import InfoField from "./components/InfoField.jsx";
import { GridContext } from "./store/Grid-context.jsx";
import Table from "./components/Table.jsx";
import TopMenu from "./components/TopMenu.jsx";

let emptyRow = [];
let emptyCol = [];

const infoLineVertical = GetRowsTabsVertical(DUMMY_APPLE.grid).tabList;
const infoLineHorizontal = GetRowsTabsHorizontal(DUMMY_APPLE.grid).tabList;

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

let timer;

function App() {
  const dialog = useRef();
  const [grid, setGrid] = useState({
    grid:
      JSON.parse(localStorage.getItem("grid")) === null
        ? generationArray(DUMMY_APPLE.grid.length, DUMMY_APPLE.grid[0].length)
        : JSON.parse(localStorage.getItem("grid")),
    statusLineVertical: GetRowsTabsVertical(DUMMY_APPLE.grid).statusTabList,
    statusLineHorizontal: GetRowsTabsHorizontal(DUMMY_APPLE.grid).statusTabList,
  });

  const [time, setTime] = useState(0);

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

      dialog.current.open();
    }
  }, [grid.grid]);

  useEffect(() => {
    timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  }, [])

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
      <div>
        <Modal ref={dialog} time={time}/>
        <TopMenu time={time} />
        <section id="table" className="">
          <table className="border-2 border-black border-separate border-spacing-0">
            <tbody className="w-full h-full">
              <tr className="h-1/3">
                <td className="max-w-fit max-h-fit">
                  <Table scale={10} info={true} />
                </td>
                <td className="flex items-end w-full h-full">
                  <InfoField direction="vertical" infoTabs={infoLineVertical} />
                </td>
                <td className=""></td>
              </tr>
              <tr className="h-1/3">
                <td className="flex justify-end h-full w-full">
                  <InfoField
                    direction="horizontal"
                    infoTabs={infoLineHorizontal}
                  />
                </td>
                <td className="">
                  <Table emptyCol={emptyCol} emptyRow={emptyRow} />
                </td>
                <td></td>
              </tr>
              <tr className="h-1/3">
                <td></td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </GridContext.Provider>
  );
}

export default App;
