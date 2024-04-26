import React from "react";
import { Card } from "@mui/material";

const Canvas = () => {
  return (
    <Card
      class="highlighted"
      style={{
        position: "relative",
        width: "700px",
        margin: "24px auto",
        height: "581px",
        overflow: "hidden",
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: "14px" }}>Bake Cake</h1>
      <div id="cakeDiv"></div>

      <div
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      ></div>

      <div
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      ></div>
    </Card>
  );
};

export default Canvas;
