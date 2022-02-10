import { useState } from "react";
import { Modal } from "react-bootstrap";
import { ReactComponent as CloseIcon } from "../assets/images/close.svg";
import useElementsStorage from "../customHooks/useElementsStorage";

const CustomModal = (props) => {
  const { show, closeFunc, name, x, y, setX, setY } = props;

  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState("");
  const [fontWeight, setFontWeight] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [elements, AddElement] = useElementsStorage();

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

      element.id = Date.now();
      element.className = "added-element";
      if (text.toUpperCase() === "INPUT") {
        element.value = text;
      } else {
        element.innerText = text;
      }
      element.style.left = x + "px";
      element.style.top = y + "px";
      element.style.fontSize = fontSize;
      element.style.fontWeight = fontWeight;
      element.draggable = true;

      // add drag start event listener to enable drag after creation as well
      element.ondragstart = function (e) {
        console.log("drag started for already added element", e);
      };

      clearValues();

      AddElement(element);

      // add the element to the droppped position
      main.appendChild(element);
      closeFunc(false);
      setSubmitted(false);
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleHide} centered className="custom-modal">
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
