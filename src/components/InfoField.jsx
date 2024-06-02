import { useContext } from "react";

import { GridContext } from "../store/Grid-context.jsx";

import InfoButton from "./InfoButton.jsx";
import { FocusCellContext } from "../store/FocusCell-context.jsx";

export default function InfoField({ direction, infoTabs, second }) {
  const { closeLine, statusLineHorizontal, statusLineVertical } =
    useContext(GridContext);
  const { selectedRow, selectedCol } = useContext(FocusCellContext);

  function handleCompleteRow(row, col) {
    const statusTab =
      direction === "vertical" ? statusLineVertical : statusLineHorizontal;

    statusTab[row][col] = statusTab[row][col] ? false : true;
    if (statusTab[row].indexOf(false) === -1) {
      closeLine(row, direction, "close");
    } else {
      closeLine(row, direction, "open");
    }
  }

  const cssClasses = {
    mainDiv: "flex",
    row: "text-end border border-stone-400",
  };

  if(second){
    cssClasses.row += ' justify-start';
  }
  else{
    cssClasses.row += ' justify-end';
  }

  let index

  if (direction === "vertical") {
    cssClasses.mainDiv += " flex-row w-full";
    cssClasses.row += " flex flex-1 flex-col";



    index = selectedCol;
  } else {
    cssClasses.mainDiv += " flex-col w-full";
    cssClasses.row += " flex flex-row";



    index = selectedRow;
  }


  function getCorrectStyle(indexRow) {
    let css = cssClasses.row;

    if (direction === "vertical") {
      if ((indexRow + 1) % 5 === 0) {
        css += " border-r-black";
      } else if (indexRow % 5 === 0) {
        css += " border-l-black";
      }
    } else {
      if ((indexRow + 1) % 5 === 0) {
        css += " border-b-black";
      } else if (indexRow % 5 === 0) {
        css += " border-t-black";
      }
    }

    return css;
  }


  return (
    <div className={cssClasses.mainDiv}>
      {infoTabs.map((row, rowIndex) => {
        let css = getCorrectStyle(rowIndex);

        if(index == rowIndex && index){
          css += ' bg-orange-300'
        }
        else{
          css += ' bg-amber-200'
        }

        return (
          <div className={css} key={rowIndex}>
            {row.length === 0 ? (
              <InfoButton key={rowIndex + "1"} row={rowIndex} />
            ) : undefined}
            {row.map((cell, cellIndex) => {
              return (
                <InfoButton
                  click={() => {
                    handleCompleteRow(rowIndex, cellIndex);
                  }}
                  key={cellIndex}
                  row={rowIndex}
                  col={cellIndex}
                  direction={direction}
                >
                  {cell}
                </InfoButton>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
