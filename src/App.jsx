import { useState, useEffect, useRef } from "react";

import CustomModal from "./components/CustomModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/App.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const mainRef = useRef();

  // Define elements to be used as blocks
  const elements = ["Label", "Input", "Button"];

  function handleDragStart(e) {
    console.log("drag started");
    // set the sharable data on drop event
    e.dataTransfer.setData("element", e.target.innerText);
  }

  useEffect(() => {
    function handleDrop(e) {
      // disable the browser's default actions, like opening the url, file in case it's one
      e.preventDefault();
      // get the sharable data
      console.log(e.dataTransfer.getData("element"), e.x, e.y);
    }
    function enableDrag(e) {
      // make the element droppable, by default most of the elements are not droppable
      e.preventDefault();
    }
    mainRef.current.addEventListener("drop", handleDrop);
    mainRef.current.addEventListener("dragover", enableDrag);
  }, []);
  return (
    <>
      <CustomModal show={showModal} closeFunc={setShowModal} />
      <div className="app">
        <main ref={mainRef}></main>
        <aside>
          <h1>BLOCKS</h1>
          <section>
            {elements.map((element) => (
              <article
                draggable={true}
                onDragStart={handleDragStart}
                key={element}
              >
                {element}
              </article>
            ))}
          </section>
        </aside>
      </div>
    </>
  );
}

export default App;
