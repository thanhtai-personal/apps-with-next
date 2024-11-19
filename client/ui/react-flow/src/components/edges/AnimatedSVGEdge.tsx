import { BaseEdge, getSmoothStepPath, type EdgeProps } from '@xyflow/react';

export function AnimatedSVGEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}: EdgeProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [edgePathRevert] = getSmoothStepPath({
    sourceX: targetX,
    sourceY: targetY,
    sourcePosition: targetPosition,
    targetX: sourceX,
    targetY: sourceY,
    targetPosition: sourcePosition,
  });

  return (
    <>
      <BaseEdge id={id} style={{ stroke: "#ff0073" }} path={edgePath} />
      <BaseEdge id={`${id}-revert`} style={{ stroke: "#3ef905", transform: "translate(-20px, 10px)" }} path={edgePath}/>
      <circle r="10" fill="#ff0073">
        <animateMotion dur="5s" repeatCount="indefinite" path={edgePath} />
      </circle>
      <circle r="10" fill="#3ef905" style={{ transform: "translate(-20px, 10px)" }}>
        <animateMotion dur="5s" repeatCount="indefinite" path={edgePathRevert} />
      </circle>
    </>
  );
}
