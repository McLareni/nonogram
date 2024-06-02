import { useState, memo } from "react";

import DUMMY_APPLE from "../scripts/DUMMY_APPLE.js";
import {
  GetRowsTabsHorizontal,
  GetRowsTabsVertical,
} from "../scripts/GetRowsTabs.js";

import { FocusCellContext } from "../store/FocusCell-context.jsx";

import Table from "../components/Table.jsx";
import InfoField from "../components/InfoField.jsx";

const infoLineVertical = GetRowsTabsVertical(DUMMY_APPLE.grid).tabList;
const infoLineHorizontal = GetRowsTabsHorizontal(DUMMY_APPLE.grid).tabList;

const GameField = memo(function GameField({ emptyRow, emptyCol }) {
  const [focusCell, setFocusCell] = useState({
    row: undefined,
    col: undefined,
  });

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

  return (
    <FocusCellContext.Provider value={focusCellCxt}>
      <div className="mt-[10%]">
        <section
          id="table"
          className="grid grid-cols-[1fr_3fr_1fr] grid-rows-[1fr_3fr_1fr] w-full"
          onMouseMove={(e) => handleMove(e)}
        >
          <Table info={true} />
          <InfoField direction="vertical" infoTabs={infoLineVertical} />
          <div></div>
          <InfoField direction="horizontal" infoTabs={infoLineHorizontal} />
          <Table emptyCol={emptyCol} emptyRow={emptyRow} />
          <InfoField direction="horizontal" second={true} infoTabs={infoLineHorizontal} />
          <div></div>
          <InfoField direction="vertical" second={true} infoTabs={infoLineVertical} />
        </section>
      </div>
    </FocusCellContext.Provider>
  );
});

export default GameField;
