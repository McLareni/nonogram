import { useContext } from "react";

import { GridContext } from "../store/Grid-context.jsx";

export default function Cell({
  indexRow,
  indexCol,
  scale,
  info,
  defaultContent,
  click = () => {},
}) {
  const { width, grid } = useContext(GridContext);

  let hCell = 40 - width - scale;

  let cssClasses, content;

  if (info) {
    cssClasses = "aspect-square flex-1";
    cssClasses +=
      grid[indexRow][indexCol] === "black" ? " bg-black" : " bg-white ";

    content = "";
  } else {
    cssClasses = "aspect-square flex-1 border text-center font-bold text-sm";
    cssClasses +=
      grid[indexRow][indexCol] === "black"
        ? " bg-stone-900 border-black"
        : " bg-white border-stone-400";
    content = grid[indexRow][indexCol] === "X" ? "X" : "";
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
    <div
      className={getCorrectStyle(indexRow, indexCol)}
      style={{ width: `${hCell}px` }}
      onClick={(e) => click(e, indexRow, indexCol)}
      onContextMenu={(e) => click(e, indexRow, indexCol)}
    >
      {content}
    </div>
  );
}
