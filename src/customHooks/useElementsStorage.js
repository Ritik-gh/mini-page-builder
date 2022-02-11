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
    console.log("delete function", elements);
    setElements((elements) => {
      const copyOfElements = elements;
      delete copyOfElements[element.id];
      return { ...copyOfElements };
    });
    element.remove();
  }
  useEffect(() => {
    console.log("elements updated", elements);
    window.localStorage.elements = JSON.stringify(elements);
  }, [elements]);
  return [elements, setElement, deleteElement];
};

export default useElementsStorage;
