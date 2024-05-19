import { forwardRef, useRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

import DUMMY_APPLE from "../scripts/DUMMY_APPLE.js";

import Table from "./Table.jsx";
import { timeFormatter } from "../scripts/formatter/timeFormatter.js";

const Modal = forwardRef(function Modal({time}, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="backdrop:bg-black/70 rounded-2xl bg-gray-200">
      <div className="flex flex-col items-center py-5 px-8">
        <h1 className="text-2xl">{DUMMY_APPLE.name}</h1>
        <p className="text-stone-600">Complete</p>
        <p className=" mb-6">{timeFormatter(time)}</p>
        <Table scale={10} info={true} />
        <form method="dialog" className="mt-6">
          <button className="text-base text-store-700 uppercase font-bold tracking-wide outline-none">Close</button>
        </form>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
});

export default Modal;
