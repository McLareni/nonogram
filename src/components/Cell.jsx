import { useContext } from "react";

import { GridContext } from "../store/Grid-context.jsx";
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";


export default function Cell({
  indexRow,
  indexCol,
  info,
  defaultContent,
  click = () => {},
}) {
  const { grid, cellSize } = useContext(GridContext);

  let cssClasses, cellStyle, content;

  if (info) {
    cssClasses = "border-0 border-black";
    cssClasses +=
      grid[indexRow][indexCol] === "black" ? " bg-black" : " bg-white ";

    content = "";

    cellStyle = {
      width: `${+cellSize-2}px`,
      height: `${+cellSize-2}px`
    }
  } else {
    cssClasses = "border flex justify-center items-center font-bold cursor-pointer aspect-square";
    cssClasses +=
      grid[indexRow][indexCol] === "black"
        ? " bg-stone-900 border-black"
        : " bg-white border-stone-400";
    content = grid[indexRow][indexCol] === "X" || grid[indexRow][indexCol] === "x"  ? "X" : "";
    if (defaultContent) {
      content = defaultContent;
    }
    cellStyle = {
      width: `${+cellSize+2}px`,
      height: `${+cellSize+2}px`,
      fontSize: `${+cellSize-2}px`
    }
  }

  function getCorrectStyle(indexRow, indexCol) {
    let css = cssClasses;

    if ((indexRow + 1) % 5 === 0) {
      css += " border-b-black";
    } else if (indexRow % 5 === 0 && indexRow !== 0) {
      css += " border-t-black";
    }
    if ((indexCol + 1) % 5 === 0) {
      css += " border-r-black";
    } else if (indexCol % 5 === 0 && indexCol !== 0) {
      css += " border-l-black";
    }
    return css;
  }

  return (
    <div
      className={getCorrectStyle(indexRow, indexCol)}
      style={cellStyle}
      id={!info ? `${indexRow}-${indexCol}` : undefined}
      onClick={(e) => {!info && click(e, indexRow, indexCol)}}
      onContextMenu={(e) => {!info && click(e, indexRow, indexCol)}}
    >
      {content}
    </div>
  );
}
