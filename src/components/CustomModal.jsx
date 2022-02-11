import { useState, useRef, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { ReactComponent as CloseIcon } from "../assets/images/close.svg";
import useElementsStorage from "../customHooks/useElementsStorage";
import { handleElementDragStart } from "../helper";

const CustomModal = (props) => {
  const { show, closeFunc, name, x, y, setX, setY } = props;

  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState("");
  const [fontWeight, setFontWeight] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [elements, setElement] = useElementsStorage();

  const textRef = useRef();

  function clearValues() {
    setText("");
    setFontSize("");
    setFontWeight("");
  }

  function handleHide() {
    clearValues();
    setSubmitted(false);
    closeFunc(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (text && x && y && fontSize && fontWeight) {
      const element = document.createElement(name);
      const main = document.querySelector("main");

      element.id = `addedElement${Date.now()}`;
      element.className = "added-element";
      element.dataset.type = "addedElement";
      if (name.toUpperCase() === "INPUT") {
        element.placeholder = text;
      } else {
        element.innerText = text;
      }
      element.style.left = x + "px";
      element.style.top = y + "px";
      element.style.fontSize = fontSize;
      element.style.fontWeight = fontWeight;
      element.draggable = true;

      // empty the modal fields
      clearValues();

      setElement(element);

      // add the element to the droppped position
      main.appendChild(element);
      closeFunc(false);
      setSubmitted(false);
    }
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleHide}
        centered
        className="custom-modal"
        onShow={() => textRef.current.focus()}
      >
        <header>
          <h1>Edit {name}</h1>
          <CloseIcon onClick={() => closeFunc(false)} />
        </header>
        <main>
          <form onSubmit={handleSubmit}>
            <article>
              <label>
                Text
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  ref={textRef}
                />
              </label>
              {submitted && !text && <p>Please enter text</p>}
            </article>
            <article>
              <label>
                X
                <input
                  type="text"
                  value={x}
                  onChange={(e) => setX(e.target.value)}
                />
              </label>
              {submitted && !x && <p>Please enter X Coordinate</p>}
            </article>
            <article>
              <label>
                Y
                <input
                  type="text"
                  value={y}
                  onChange={(e) => setY(e.target.value)}
                />
              </label>
              {submitted && !y && <p>Please enter Y Coordinate</p>}
            </article>
            <article>
              <label>
                Font Size
                <input
                  type="number"
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                />
              </label>
              {submitted && !fontSize && <p>Please enter font size</p>}
            </article>
            <article>
              <label>
                Font Weight
                <input
                  type="text"
                  value={fontWeight}
                  onChange={(e) => setFontWeight(e.target.value)}
                />
              </label>
              {submitted && !fontWeight && <p>Please enter font weight</p>}
            </article>
            <button>Save Changes</button>
          </form>
        </main>
      </Modal>
    </>
  );
};

export default CustomModal;
