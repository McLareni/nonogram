import { useContext } from "react";

import { GridContext } from "../store/Grid-context.jsx";


// million-ignore
export default function Cell({
  indexRow,
  indexCol,
  info,
  defaultContent,
  click = () => {},
}) {
  const { grid } = useContext(GridContext);

  let cssClasses, content;

  if (info) {
    cssClasses = "border-0 border-stone-800 aspect-square w-[8px] w-[8px]";
    cssClasses +=
      grid[indexRow][indexCol] === "black" ? " bg-black" : " bg-white ";

    content = "";
  } else {
    cssClasses = "border flex justify-center items-center font-bold text-[9px] cursor-pointer w-[12px] w-[12px] aspect-square";
    cssClasses +=
      grid[indexRow][indexCol] === "black"
        ? " bg-stone-900 border-black"
        : " bg-white border-stone-400";
    content = grid[indexRow][indexCol] === "X" || grid[indexRow][indexCol] === "x"  ? "X" : "";
    if (defaultContent) {
      content = defaultContent;
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
    <button
      className={getCorrectStyle(indexRow, indexCol)}
      id={!info ? `${indexRow}-${indexCol}` : undefined}
      onClick={(e) => {!info && click(e, indexRow, indexCol)}}
      onContextMenu={(e) => {!info && click(e, indexRow, indexCol)}}
    >
      {content}
    </button>
  );
}
