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
    "flex justify-center items-center relative before:absolute before:-top-[40%] before:left-1/2 before:-translate-x-1/2 before:text-black before:text-2xl aspect-square";

  if (styles) {
    cssBtn += " before:content-['x'] text-stone-400";
  }

  if(direction === 'horizontal'){
    cssBtn += ' h-full'
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



