import React, { useState } from "react";
import "../styles/modal.css";

function Modal(props) {
  const [isOpen, setIsOpen] = useState(true);
  const clickHandler = () => {
    setIsOpen(!isOpen);
    var blur = document.getElementById("Container-blur");
    blur.classList.remove("active");
  };

  return (
    <div id="popup" className={isOpen ? `${props.className}` : `unActive`}>
      <span onClick={clickHandler} className="close">
        &times;
      </span>
      <div className="modal-container pt-4 px-4">{props.children}</div>
    </div>
  );
}

export default Modal;
