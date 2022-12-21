import React, { useRef, useState } from "react";
import Element from "./components/Element";

const App = () => {
  const [moveableComponents, setMoveableComponents] = useState([]);
  const [selected, setSelected] = useState(null);

  const parentRef = useRef();
  const parentDimensions = parentRef.current?.getBoundingClientRect();

  const addMoveable = async () => {
    const req = await fetch(
      `https://jsonplaceholder.typicode.com/photos/${
        Math.floor(Math.random() * 5000) || 1
      }`
    );
    const data = await req.json();

    setMoveableComponents([
      ...moveableComponents,
      {
        id: Math.floor(Math.random() * Date.now()),
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        updateEnd: true,
        image: data.url,
      },
    ]);
  };

  const updateMoveable = (id, newComponent, updateEnd = false) => {
    const { top, height, left, width } = newComponent;

    if (top >= parentDimensions.height - height) return;
    if (left >= parentDimensions.width - width) return;
    if (top <= 0 || left <= 0) return;

    const updatedMoveables = moveableComponents.map((moveable) =>
      moveable.id === id
        ? { ...moveable, ...newComponent, updateEnd }
        : moveable
    );

    setMoveableComponents(updatedMoveables);
  };

  const removeMoveable = (id) => {
    setMoveableComponents(moveableComponents.filter((item) => item.id !== id));
  };

  return (
    <main className="main">
      <button onClick={addMoveable}>Add Moveable1</button>
      <p>Double Click to remove an element</p>

      <div ref={parentRef} className="parent">
        {moveableComponents.map((item) => (
          <Element
            {...item}
            key={item.id}
            updateMoveable={updateMoveable}
            removeMoveable={removeMoveable}
            setSelected={setSelected}
            isSelected={selected === item.id}
          />
        ))}
      </div>
    </main>
  );
};

export default App;
