import React from "react";
import { useDrag, useDrop } from "../src";

export function App() {
  const [dragRef, previewRef] = useDrag({
    type: 4,
    item: { content: "hello" },
    onStart: () => {
      console.log("drag start");
    },
    onEnd: () => {
      console.log("on end");
    }
  });

  const [dragRef1] = useDrag({
    type: 1,
    item: { content: "world" },
    onStart: () => {
      console.log("drag start");
    },
    onEnd: () => {
      console.log("on end");
    }
  });

  const dropRef = useDrop({
    accept: 1 | 2,
    onDrop: (e, item) => {
      console.log(item);
      console.log("on drop");
    },
    onEnter: (item) => {
      console.log("on enter");
    },
    onLeave: (item) => {
      console.log("on leave");
    },
    onOver(e, item) {
      console.log("over", e.offsetX, e.offsetY);
      console.log("data", item);
    }
  });

  return (
    <div>
      <h1 ref={dropRef} style={{ backgroundColor: "red" }}>
        Hello StackBlitz!
      </h1>
      <p ref={dragRef} style={{ cursor: "move" }} draggable={true}>
        Start editing to see some magic happen :)
      </p>
      <p ref={dragRef1} style={{ cursor: "move" }} draggable={true}>
        Start editing to see some magic happen :)
      </p>
      <p ref={previewRef}>my preview</p>
      <canvas></canvas>
    </div>
  );
}
