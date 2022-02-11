import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import CustomModal from "./components/CustomModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/App.css";
import useElementsStorage from "./customHooks/useElementsStorage";
import { handleElementDragStart } from "./helper";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [x, setX] = useState("");
  const [y, setY] = useState("");

  const [elements, setElement, deleteElement] = useElementsStorage();

  const mainRef = useRef();

  // Define elements to be used as blocks
  const ELEMENTBLOCKS = ["Label", "Input", "Button"];

  function handleBlockDragStart(e) {
    console.log("drag started", e);
    // set the sharable data on drop event
    e.dataTransfer.setData("element", e.target.innerText);
    e.dataTransfer.setData("type", e.target.dataset.type);
  }

  useEffect(() => {
    function handleDrop(e) {
      // disable the browser's default actions, like opening the url, file in case it's one
      e.preventDefault();
      console.log(e.dataTransfer.getData("type"), e.x, e.y);
      const elementType = e.dataTransfer.getData("type");
      if (elementType === "elementBlock") {
        setName(e.dataTransfer.getData("element"));
        setX(e.x);
        setY(e.y);
        setShowModal(true);
      } else if (elementType === "addedElement") {
        const id = e.dataTransfer.getData("id");
        const element = document.querySelector(`#${id}`);
        if (element) {
          element.style.top = e.y + "px";
          element.style.left = e.x + "px";
          setElement(element);
        }
      }
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

  useEffect(() => {
    mainRef.current.querySelectorAll(".added-element").forEach((element) => {
      // add drag start event listener to enable drag after creation as well
      element.ondragstart = function (e) {
        handleElementDragStart(e, element);
      };
      element.onfocus = element.classList.toggle("focus");
      element.onblur = element.classList.toggle("focus");
    });
  }, [elements]);

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
                onDragStart={handleBlockDragStart}
                key={element}
                className="element-block"
                data-type="elementBlock"
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
