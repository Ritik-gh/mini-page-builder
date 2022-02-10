import { Modal } from "react-bootstrap";
import { ReactComponent as CloseIcon } from "../assets/images/close.svg";

const CustomModal = (props) => {
  const { show, closeFunc } = props;
  return (
    <>
      <Modal
        show={show}
        onHide={() => closeFunc(false)}
        centered
        className="custom-modal"
      >
        <header>
          <h1>Edit Label</h1>
          <CloseIcon onClick={() => closeFunc(false)} />
        </header>
        <main>
          <label>
            <p>Text</p>
            <input type="text" />
          </label>
          <label>
            <p>X</p>
            <input type="text" />
          </label>
          <label>
            <p>Y</p>
            <input type="text" />
          </label>
          <label>
            <p>Font Size</p>
            <input type="text" />
          </label>
          <label>
            <p>Font Weight</p>
            <input type="text" />
          </label>
        </main>
        <footer>
          <button>Save Changes</button>
        </footer>
      </Modal>
    </>
  );
};

export default CustomModal;
