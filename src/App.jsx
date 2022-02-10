import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import CustomModal from "./components/CustomModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/App.css";
import useElementsStorage from "./customHooks/useElementsStorage";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [x, setX] = useState("");
  const [y, setY] = useState("");

  const [elements, AddElement] = useElementsStorage();

  const mainRef = useRef();

  // Define elements to be used as blocks
  const ELEMENTBLOCKS = ["Label", "Input", "Button"];

  function handleDragStart(e) {
    console.log("drag started", e);
    // set the sharable data on drop event
    e.dataTransfer.setData("element", e.target.innerText);
  }

  useEffect(() => {
    function handleDrop(e) {
      // disable the browser's default actions, like opening the url, file in case it's one
      e.preventDefault();
      // get the sharable data
      console.log(e.dataTransfer.getData("element"), e.x, e.y, e);
      setName(e.dataTransfer.getData("element"));
      setX(e.x);
      setY(e.y);
      setShowModal(true);
    }
    function enableDrag(e) {
      // allow the drop event for the element, by default most of the elements do not allow drop
      e.preventDefault();
    }
    mainRef.current.addEventListener("drop", handleDrop);
    mainRef.current.addEventListener("dragover", enableDrag);
  }, []);

  function createAddedElementsHTML() {
    const html = Object.entries(elements).reduce(
      (prevValue, currentValue) => prevValue + currentValue[1],
      ""
    );
    return {
      __html: html,
    };
  }

  return (
    <>
      <CustomModal
        show={showModal}
        closeFunc={setShowModal}
        name={name}
        x={x}
        y={y}
        setX={setX}
        setY={setY}
      />
      <div className="app">
        <main
          ref={mainRef}
          dangerouslySetInnerHTML={createAddedElementsHTML()}
        ></main>
        <aside>
          <h1>BLOCKS</h1>
          <section>
            {ELEMENTBLOCKS.map((element) => (
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
