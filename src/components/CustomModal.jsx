import { useState } from "react";
import { Modal } from "react-bootstrap";
import { ReactComponent as CloseIcon } from "../assets/images/close.svg";

const CustomModal = (props) => {
  const { show, closeFunc, name, x, y, setX, setY } = props;

  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState("");
  const [fontWeight, setFontWeight] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (text && x && y && fontSize && fontWeight) {
      closeFunc(false);
    }
  }

  return (
    <>
      <Modal
        show={show}
        onHide={() => closeFunc(false)}
        centered
        className="custom-modal"
      >
        <header>
          <h1>Edit {name}</h1>
          <CloseIcon onClick={() => closeFunc(false)} />
        </header>
        <main>
          <form onSubmit={handleSubmit}>
            <label>
              Text
              <input type="text" value={text} onChange={setText} />
            </label>
            {submitted && !text && <p>Please enter text</p>}
            <label>
              X
              <input type="text" value={x} onChange={setX} />
            </label>
            {submitted && !x && <p>Please enter X Coordinate</p>}
            <label>
              Y
              <input type="text" value={y} onChange={setY} />
            </label>
            {submitted && !y && <p>Please enter Y Coordinate</p>}
            <label>
              Font Size
              <input type="number" value={fontSize} onChange={setFontSize} />
            </label>
            {submitted && !fontSize && <p>Please enter font size</p>}
            <label>
              Font Weight
              <input type="text" value={fontWeight} onChange={setFontWeight} />
            </label>
            {submitted && !fontWeight && <p>Please enter font weight</p>}
            <button>Save Changes</button>
          </form>
        </main>
      </Modal>
    </>
  );
};

export default CustomModal;
