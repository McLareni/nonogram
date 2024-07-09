import { useRef, useEffect, memo } from "react";
import { createPortal } from "react-dom";

export default memo(function Modal({ modalIsOpen, children, onClose }) {
  const dialog = useRef();

  function openModal() {
    dialog.current.showModal();
  }
  function closeModal() {
    dialog.current.close();
    onClose();
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
      onClose={closeModal}
      ref={dialog}
      className="backdrop:bg-black/70 rounded-2xl bg-gray-200 w-min-80"
    >
      {children}
      <button
        className="my-5 text-base text-store-700 uppercase font-bold tracking-wide outline-none w-full text-center"
        onClick={closeModal}
      >
        Close
      </button>
    </dialog>,
    document.getElementById("modal")
  );
});
