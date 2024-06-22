import {  useState } from "react";


export default function InfoButton({ click, row, col, direction, children }) {
  const [styles, setStyles] = useState(false);

  let handleCloseNumber = function() {
    click(row, col);
    setStyles((prevStyle) => !prevStyle);
  }

  if(click === undefined){
    handleCloseNumber = null;
  }

  let cssBtn =
    "flex aspect-square w-[12px] text-[10px] w-[12px] justify-center items-center relative before:absolute before:-top-[40%] before:left-1/2 before:-translate-x-1/2 before:text-black before:text-2xl";

  if (styles) {
    cssBtn += " before:content-['x'] text-stone-400";
  }

  return (
    <button
      className={cssBtn}
      onClick={handleCloseNumber}
    >
      {children}
    </button>
  );
}



