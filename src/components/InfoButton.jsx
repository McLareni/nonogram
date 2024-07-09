import { useContext, useState } from "react";
import { GridContext } from "../store/Grid-context";

export default function InfoButton({ click, row, col, children }) {
  const [styles, setStyles] = useState(false);
  const { cellSize } = useContext(GridContext);

  let handleCloseNumber = function () {
    click(row, col);
    setStyles((prevStyle) => !prevStyle);
  };

  if (click === undefined) {
    handleCloseNumber = null;
  }

  let cssBtn =
    "flex aspect-square justify-center items-center relative before:absolute before:text-black before:h-full before:w-full before:";

  if (styles) {
    cssBtn += " before:content-['x'] text-stone-400";
  }

  return (
    <button
      className={cssBtn}
      style={{
        width: +cellSize + 2 + "px",
        height: +cellSize + 2 + "px",
        fontSize: +cellSize + "px",
      }}
      onClick={handleCloseNumber}
    >
      {children}
    </button>
  );
}
