import { useState } from "react";

import CustomModal from "./components/CustomModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/App.css";

function App() {
  const [showModal, setShowModal] = useState(true);
  return (
    <>
      <CustomModal show={showModal} closeFunc={setShowModal} />
      <div className="app">
        <main></main>
        <aside>
          <h1>BLOCKS</h1>
          <section>
            <article>Label</article>
            <article>Input</article>
            <article>Button</article>
          </section>
        </aside>
      </div>
    </>
  );
}

export default App;
