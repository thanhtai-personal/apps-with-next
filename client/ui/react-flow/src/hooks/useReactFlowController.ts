import {
  addEdge,
  useNodesState,
  useEdgesState,
  OnNodesChange,
  OnEdgesChange,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
  OnNodesDelete,
  type Node,
  type Edge,
  type ColorMode,
  type OnConnect,
} from "@xyflow/react";
import { ChangeEventHandler, useCallback, useState } from "react";

export const useReactFlowController = (
  initialNodes: Node[] = [],
  initialEdges: Edge[] = []
): {
  nodes: Node[];
  edges: Edge[];
  colorMode: ColorMode;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onNodesDelete: OnNodesDelete;
  onChangeThemeMode: ChangeEventHandler<HTMLSelectElement>;
  onConnect: OnConnect;
} => {

  const [colorMode, setColorMode] = useState<ColorMode>('light');
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onChangeThemeMode: ChangeEventHandler<HTMLSelectElement> = (evt) => {
    setColorMode(evt.target.value as ColorMode);
  };

  const onNodesDelete = useCallback(
    (deleted) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter(
            (edge) => !connectedEdges.includes(edge),
          );

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
            })),
          );

          return [...remainingEdges, ...createdEdges];
        }, edges),
      );
    },
    [nodes, edges],
  );

  return {
    nodes,
    edges,
    colorMode,
    onNodesChange,
    onEdgesChange,
    onNodesDelete,
    onConnect,
    onChangeThemeMode
  };
};
