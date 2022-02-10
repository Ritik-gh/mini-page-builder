import { useEffect, useState } from "react";

const useElementsStorage = () => {
  const [elements, setElements] = useState(() => {
    let storedElements = {};
    if (window.localStorage.elements) {
      storedElements = JSON.parse(window.localStorage.elements);
    }
    return storedElements;
  });
  function AddElement(element) {
    setElements((elements) => ({
      ...elements,
      [element.id]: element.outerHTML,
    }));
  }
  useEffect(() => {
    window.localStorage.elements = JSON.stringify(elements);
  }, [elements]);
  return [elements, AddElement];
};

export default useElementsStorage;
