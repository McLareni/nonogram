import { useState, useEffect, useReducer, useCallback, useMemo } from "react";

import DUMMY_APPLE from "./scripts/DUMMY_APPLE.js";
import { generationArray } from "./scripts/generation.js";
import {
  GetRowsTabsHorizontal,
  GetRowsTabsVertical,
} from "./scripts/GetRowsTabs.js";
import { fetchCurrentGrid, fetchUserPlaces } from "./scripts/http.js";
import { updataDate } from "./scripts/getData.js";

import GameField from "./components/GameField.jsx";
import TopMenu from "./components/TopMenu.jsx";
import Modal from "./components/Modal.jsx";
import Settings from "./components/Settings.jsx";
import FinishCrossfood from "./components/FinishCrossford.jsx";

import { GridContext } from "./store/Grid-context.jsx";
import SideBar from "./components/SideBar.jsx";

function gridReducer(state, action) {
  let currState = {
    grid: state.grid.map((row) => [...row]),
    statusLineVertical: state.statusLineVertical.map((row) => [...row]),
    statusLineHorizontal: state.statusLineHorizontal.map((row) => [...row]),
    infoLineVertical: state.infoLineVertical.map((row) => [...row]),
    infoLineHorizontal: state.infoLineHorizontal.map((row) => [...row]),
    emptyCol: [...state.emptyCol],
    emptyRow: [...state.emptyRow],
  };

  switch (action.type) {
    case "fill":
      const data = action.properties.data;
      let grid = generationArray(data.grid[0].length, data.grid.length);

      const { currGrid } = action.properties;
      if (typeof currGrid["grid"] !== undefined) {
        if (
          currGrid.grid[0].length > 0 &&
          action.properties.currID === currGrid.id
        ) {
          grid = currGrid.grid;
        }
      }

      return {
        grid: grid,
        statusLineVertical: GetRowsTabsVertical(data.grid).statusTabList,
        statusLineHorizontal: GetRowsTabsHorizontal(data.grid).statusTabList,
        infoLineVertical: GetRowsTabsVertical(data.grid).tabList,
        infoLineHorizontal: GetRowsTabsHorizontal(data.grid).tabList,
        emptyCol: action.properties.emptyCol,
        emptyRow: action.properties.emptyRow,
      };

    case "changeColor":
      const { indexRow, indexCol, color } = action.properties;
      currState.grid[indexRow][indexCol] = color;

      updataDate({ id: action.properties.id, grid: currState.grid });
      return currState;

    case "closeLine":
      const { row, direction, status, emptyCol, emptyRow } = action.properties;

      let close = status === "close";
      let open = status === "open";

      if (direction === "vertical") {
        for (let i = 0; i < currState.grid.length; i++) {
          if (close && currState.grid[i][row] !== "black") {
            currState.grid[i][row] = currState.grid[i][row] === "x" ? "x" : "X";
            if (emptyCol.indexOf(row) === -1) {
              state.emptyCol.push(row);
            }
          } else if (open && currState.grid[i][row] !== "black") {
            currState.grid[i][row] =
              currState.grid[i][row] === "x" ? "x" : "white";
            state.emptyCol = emptyCol.filter((colIndex) => colIndex != row);
          }
        }
      } else {
        currState.grid[row].map((cell, index) => {
          if (close && currState.grid[row][index] !== "black") {
            currState.grid[row][index] =
              currState.grid[row][index] === "x" ? "x" : "X";
            if (emptyRow.indexOf(row) === -1) {
              state.emptyRow.push(row);
            }
          } else if (open && currState.grid[row][index] !== "black") {
            currState.grid[row][index] =
              currState.grid[row][index] == "x" ? "x" : "white";
            state.emptyRow = emptyRow.filter((rowIndex) => rowIndex !== row);
          }
        });
      }

      return currState;
  }
}

let interval;

let emptyRow = [];
let emptyCol = [];

const initialGrid = {
  grid: [[]],
  statusLineVertical: [],
  statusLineHorizontal: [],
  infoLineVertical: [],
  infoLineHorizontal: [],
  emptyCol: [],
  emptyRow: [],
};

function App() {
  const [modalFinishIsOpen, setModelFinishIsOpen] = useState(false);
  const [modalSettingIsOpen, setModelSettingIsOpen] = useState(false);
  const [sideBarIsOpen, setSideBarIsOpen] = useState(true);
  const [correctGrid, setCorrectGrid] = useState();
  const [id, setId] = useState(0);

  const [time, setTime] = useState(0);

  const [grid, gridDispatch] = useReducer(gridReducer, initialGrid);

  const [visibleField, setVisibleField] = useState({
    horizontal: false,
    vertical: false,
  });
  const [cellSize, setCellSize] = useState(10);

  function changeColor(indexRow, indexCol, color) {
    gridDispatch({
      type: "changeColor",
      properties: {
        indexRow,
        indexCol,
        color,
        id: id,
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
        emptyCol,
        emptyRow,
      },
    });
  }

  useEffect(() => {
    interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);

    return () => {
      setTime(0);
      clearInterval(interval);
    };
  }, [id]);

  if (modalFinishIsOpen) {
    clearInterval(interval);
  }

  useEffect(() => {
    getListCrossWord();
  }, [id]);

  async function getListCrossWord() {
    try {
      const data = await fetchUserPlaces();
      const currGrid = await fetchCurrentGrid();

      const infoLineVertical = GetRowsTabsVertical(data[id].grid).tabList;
      const infoLineHorizontal = GetRowsTabsHorizontal(data[id].grid).tabList;

      infoLineVertical.map((col, index) => {
        if (col.length === 0) {
          emptyCol.push(index);
        }
      });

      infoLineHorizontal.map((row, index) => {
        if (row.length === 0) {
          emptyRow.push(index);
        }

        setCorrectGrid(data[id].grid);
        gridDispatch({
          type: "fill",
          properties: {
            data: data[id],
            emptyCol,
            emptyRow,
            currGrid,
            currID: id,
          },
        });
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  const finishGrid = useMemo(() => {
    return grid.grid.map((row) =>
      row.map((cell) => (cell === "black" ? "black" : "white"))
    );
  }, [JSON.stringify(grid.grid)]);

  useEffect(() => {
    if (
      correctGrid &&
      JSON.stringify(finishGrid) === JSON.stringify(correctGrid)
    ) {
      handleOpenModal();
      clearInterval(interval);
    } else {
      setModelFinishIsOpen(false);
    }
  }, [JSON.stringify(grid.grid)]);

  console.log("app");

  const gridCxt = useMemo(
    () => ({
      name: DUMMY_APPLE.name,
      grid: grid.grid,
      changeColor: changeColor,
      closeLine: (row, direction, action) => closeLine(row, direction, action),
      infoLineVertical: grid.infoLineVertical,
      infoLineHorizontal: grid.infoLineHorizontal,
      statusLineVertical: grid.statusLineVertical,
      statusLineHorizontal: grid.statusLineHorizontal,
      cellSize: cellSize,
    }),
    [grid, cellSize]
  );

  const changeVisibleField = useCallback(function changeVisibleField(
    e,
    direction
  ) {
    setVisibleField((prevVisible) => {
      let currVisible = { ...prevVisible };
      currVisible[direction] = e.target.checked;

      return currVisible;
    });
  },
  []);

  function handleOpenSetting() {
    setModelSettingIsOpen(true);
  }

  function handleOpenModal() {
    setModelFinishIsOpen(true);
  }

  function handleCloseSetting() {
    setModelSettingIsOpen(false);
  }

  function handleCloseModal() {
    setModelFinishIsOpen(false);
  }

  function handleChangeSizeCell(e) {
    setCellSize(e.target.value);
  }

  return (
    <GridContext.Provider value={gridCxt}>
      <Modal modalIsOpen={modalFinishIsOpen} onClose={handleCloseModal}>
        <FinishCrossfood time={time} />
      </Modal>
      <Modal modalIsOpen={modalSettingIsOpen} onClose={handleCloseSetting}>
        <Settings
          onChange={changeVisibleField}
          onSelect={handleChangeSizeCell}
        />
      </Modal>
      <TopMenu time={time} />
      <SideBar
        openSetting={handleOpenSetting}
        isOpen={sideBarIsOpen}
        onChange={(id) => {
          setId(id);
        }}
        openList={() => setSideBarIsOpen(false)}
        closeList={() => setSideBarIsOpen(true)}
      />
      <GameField
        emptyRow={emptyRow}
        emptyCol={emptyCol}
        field={visibleField}
        size={cellSize}
      />
    </GridContext.Provider>
  );
}

export default App;
