import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

import DUMMY_APPLE from "../scripts/DUMMY_APPLE.js";

import Table from "./Table.jsx";
import { timeFormatter } from "../scripts/formatter/timeFormatter.js";

export default function Modal({ modalIsOpen, time }) {
  const dialog = useRef();

  function openModal() {
    dialog.current.showModal();
  }
  function closeModal() {
    dialog.current.close();
  }

  useEffect(() => {
    if (modalIsOpen) {
      openModal();
    } else {
      closeModal();
    }
  }, [modalIsOpen]);

  return createPortal(
    <dialog
      ref={dialog}
      className="backdrop:bg-black/70 rounded-2xl bg-gray-200 w-80"
    >
      <div className="flex flex-col items-center py-5 px-8">
        <h1 className="text-2xl">{DUMMY_APPLE.name}</h1>
        <p className="text-stone-600">Complete</p>
        <p className=" mb-6">{timeFormatter(time)}</p>
        <Table info={true} />
        <button className="mt-4 text-base text-store-700 uppercase font-bold tracking-wide outline-none" onClick={closeModal}>
          Close
        </button>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}
