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
            Text
            <input type="text" />
          </label>
          <label>
            X
            <input type="text" />
          </label>
          <label>
            Y
            <input type="text" />
          </label>
          <label>
            Font Size
            <input type="text" />
          </label>
          <label>
            Font Weight
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
