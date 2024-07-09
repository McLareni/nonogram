import { useState, memo, useEffect, useContext } from "react";

import { FocusCellContext } from "../store/FocusCell-context.jsx";
import { GridContext } from "../store/Grid-context.jsx";

import Table from "../components/Table.jsx";
import InfoField from "../components/InfoField.jsx";

let cell = undefined;
let prevCell = undefined;
let timmer, startTimmer;
let clamp = false;
let currBg;

const GameField = memo(function GameField({ emptyRow, emptyCol, field }) {
  const { infoLineHorizontal, infoLineVertical, changeColor } =
    useContext(GridContext);
  const [focusCell, setFocusCell] = useState({
    row: undefined,
    col: undefined,
  });

  function handleFocusCell(coord) {
    let [row, col] = coord.split("-");
    setFocusCell({ row: row, col: col });
  }

  function handleChangeColor(indexRow, indexCol){
    changeColor(indexRow, indexCol, currBg);
  }

  function handleDown(e) {
    e.preventDefault();
    if (e.button === 0) {
      currBg = e.target.classList.contains("bg-stone-900") ? "white" : "black";
    } else if (e.button === 2) {
      currBg = e.target.textContent === "X" ? " " : "x";
    }

    e.target.click();

    console.log("down");

    startTimmer = setTimeout(() => {
      clamp = true;
      timmer = setInterval(() => {
        if (!cell) {
          e.target.click();
        } else {
          if (cell !== prevCell) {
            cell.click();
            prevCell = cell;
          }
        }
      }, 100);
    }, 40);
  }

  function handleUp(e) {
    clamp = false;
    cell = undefined;
    clearInterval(timmer);
    clearTimeout(startTimmer);
    console.log("end");
  }

  function handleMove(e) {
    if (e.currentTarget.id === "table") {
      handleFocusCell(e.target.id);
    }
    if (clamp) {
      cell = e.target;
    }
  }

  const focusCellCxt = {
    selectedRow: focusCell.row,
    selectedCol: focusCell.col,
    setFocusCell: handleFocusCell,
  };

  return (
    <FocusCellContext.Provider value={focusCellCxt}>
      <table
        id="table"
        className="border border-black border-collapse absolute"
        onMouseMove={(e) => handleMove(e)}
      >
        <tbody>
          <tr>
            <td>
              <Table info={true} />
            </td>
            <td>
              <InfoField direction="vertical" infoTabs={infoLineVertical} />
            </td>
            <td>{field.horizontal && <div></div>}</td>
          </tr>
          <tr>
            <td>
              <InfoField direction="horizontal" infoTabs={infoLineHorizontal} />
            </td>
            <td
              onMouseMove={handleMove}
              onMouseDown={handleDown}
              onMouseUp={handleUp}
              onMouseLeave={handleUp}
            >
              <Table emptyCol={emptyCol} emptyRow={emptyRow} changeColor={handleChangeColor}/>
            </td>
            <td>
              {field.horizontal && (
                <InfoField
                  direction="horizontal"
                  second={true}
                  infoTabs={infoLineHorizontal}
                />
              )}
            </td>
          </tr>
          <tr>
            <td>{field.vertical && <div className=""></div>}</td>
            <td>
              {field.vertical && (
                <InfoField
                  direction="vertical"
                  second={true}
                  infoTabs={infoLineVertical}
                />
              )}
            </td>
            <td>
              {field.vertical && field.horizontal && <div className=""></div>}
            </td>
          </tr>
        </tbody>
      </table>
    </FocusCellContext.Provider>
  );
});

export default GameField;
