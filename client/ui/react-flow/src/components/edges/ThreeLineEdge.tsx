import { getSmoothStepPath, getStraightPath } from "@xyflow/react";

const foreignObjectSize = 28;

export const ThreeLineEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd
}) => {
  const [edgePath1, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  const edgePath = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });

  return (
    <>
      <path
        id={id}
        style={{ ...style, cursor: "pointer" }}
        className="react-flow__edge-path"
        d={edgePath[0]}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={labelX - foreignObjectSize / 2}
        y={labelY - foreignObjectSize / 2}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div>
          <button
            className="edgebutton"
            // onClick={(event) => onEdgeClick(event, id)}
          >
            +
          </button>
        </div>
      </foreignObject>
    </>
  );
}

export default ThreeLineEdge
