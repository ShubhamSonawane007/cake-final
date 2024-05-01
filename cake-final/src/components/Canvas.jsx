import React from "react";
import { Card ,Typography} from "@mui/material";

const Canvas = () => {
  return (
    <>
    
    <Card
      class="highlighted"
      style={{
        position: "relative",
        width: "700px",
        marginTop: "39px",
        height: "581px",
        overflow: "hidden",
      }}
    >
      <h1 style={{ margin: "0 0 10px 0", fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'Comic Sans MS', color: "purple", display: "flex", alignItems: "center", justifyContent: "center" }}>Bake Cake</h1>
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
    </>
  );
};

export default Canvas;
