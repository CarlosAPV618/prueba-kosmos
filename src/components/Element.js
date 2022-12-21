import { useRef } from "react";
import Moveable from "react-moveable";

const Component = ({
  updateMoveable,
  removeMoveable,
  top,
  left,
  width,
  height,
  id,
  setSelected,
  isSelected = false,
  updateEnd,
  image,
}) => {
  const ref = useRef();

  const onResize = async (e) => {
    // ACTUALIZAR ALTO Y ANCHO
    let newWidth = e.width;
    let newHeight = e.height;

    updateMoveable(id, {
      top,
      left,
      width: newWidth,
      height: newHeight,
    });

    // ACTUALIZAR NODO REFERENCIA
    const beforeTranslate = e.drag.beforeTranslate;

    ref.current.style.width = `${e.width}px`;
    ref.current.style.height = `${e.height}px`;

    let translateX = beforeTranslate[0];
    let translateY = beforeTranslate[1];

    ref.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
  };

  const onResizeEnd = (e) => {
    let newWidth = e.lastEvent?.width;
    let newHeight = e.lastEvent?.height;

    updateMoveable(
      id,
      {
        top,
        left,
        width: newWidth,
        height: newHeight,
      },
      true
    );
  };

  return (
    <>
      <div
        ref={ref}
        className="draggable"
        id={"component-" + id}
        style={{
          position: "absolute",
          top,
          left,
          width,
          height,
          backgroundImage: `url(${image})`,
          backgroundSize: `${width}px ${height}px`,
        }}
        onClick={() => setSelected(id)}
        onDoubleClick={() => removeMoveable(id)}
      />

      <Moveable
        target={isSelected && ref.current}
        resizable
        draggable
        snappable
        horizontalGuidelines={[100, 200, 300, 400, 500]}
        verticalGuidelines={[100, 200, 300, 400, 500]}
        onDrag={(e) => {
          updateMoveable(id, {
            top: e.top,
            left: e.left,
            width,
            height,
          });
        }}
        onResize={onResize}
        onResizeEnd={onResizeEnd}
        throttleResize={1}
        renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
        edge={false}
        zoom={1}
        origin={false}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
      />
    </>
  );
};

export default Component;
