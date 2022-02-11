import { useEffect, useState } from "react";

const useElementsStorage = () => {
  const [elements, setElements] = useState(() => {
    let storedElements = {};
    if (window.localStorage.elements) {
      storedElements = JSON.parse(window.localStorage.elements);
    }
    return storedElements;
  });
  function setElement(element) {
    setElements((elements) => ({
      ...elements,
      [element.id]: element.outerHTML,
    }));
  }
  function deleteElement(element) {
    setElements((elements) => {
      delete elements[element.id];
      return elements;
    });
  }
  useEffect(() => {
    window.localStorage.elements = JSON.stringify(elements);
  }, [elements]);
  return [elements, setElement, deleteElement];
};

export default useElementsStorage;
