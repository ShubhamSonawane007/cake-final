import React from "react";
import BlocklyComponent from "../components/BlocklyComponent";
import Canvas from "../components/Canvas";

import Header from "../components/Header";

const Home = () => {
  return (
    <div>
      <Header />
      <div style={{ textAlign: "center" }}></div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
        }}
      >
        <BlocklyComponent />
        <Canvas />
      </div>
    </div>
  );
};

export default Home;
