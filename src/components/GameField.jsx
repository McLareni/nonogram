import { useState, memo, useContext } from "react";

import DUMMY_APPLE from "../scripts/DUMMY_APPLE.js";
import {
  GetRowsTabsHorizontal,
  GetRowsTabsVertical,
} from "../scripts/GetRowsTabs.js";

import { FocusCellContext } from "../store/FocusCell-context.jsx";

import Table from "../components/Table.jsx";
import InfoField from "../components/InfoField.jsx";
import { GridContext } from "../store/Grid-context.jsx";

const infoLineVertical = GetRowsTabsVertical(DUMMY_APPLE.grid).tabList;
const infoLineHorizontal = GetRowsTabsHorizontal(DUMMY_APPLE.grid).tabList;

const GameField = memo(function GameField({ emptyRow, emptyCol, field }) {
  const [focusCell, setFocusCell] = useState({
    row: undefined,
    col: undefined,
  });

  const { statusLineVertical, statusLineHorizontal } = useContext(GridContext);

  function handleFocusCell(coord) {
    let [row, col] = coord.split("-");
    setFocusCell({ row: row, col: col });
  }

  function handleMove(e) {
    if (e.currentTarget.id === "table") {
      handleFocusCell(e.target.id);
    }
  }

  const focusCellCxt = {
    selectedRow: focusCell.row,
    selectedCol: focusCell.col,
    setFocusCell: handleFocusCell,
  };

  console.log(field);


  return (
    <FocusCellContext.Provider value={focusCellCxt}>
      <table
        id="table"
        className="border border-black border-collapse"
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
            <td>
              <Table emptyCol={emptyCol} emptyRow={emptyRow} />
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
              {field.vertical && field.horizontal && (
                <div className=""></div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </FocusCellContext.Provider>
  );
});

export default GameField;
