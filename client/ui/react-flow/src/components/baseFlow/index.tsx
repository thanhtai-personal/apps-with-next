import {
  type Node,
  type Edge,
  ReactFlow, Controls, Background,
  ReactFlowProps, BackgroundVariant,
  MiniMap, Panel,
} from '@xyflow/react';
import './baseFlow.style.css';

export interface IReactFlowProps<NodeType extends Node, EdgeType extends Edge> extends ReactFlowProps<NodeType, EdgeType> {
  panels?: {
    id: string;
    position: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    nodes: any[];
  }[];
  configFlags?: {
    useMinimap: boolean;
    useControls: boolean;
  }
}

const nodeClassName = (node) => node.type;

export const BaseReactFlowDiagram = <NodeType extends Node = Node, EdgeType extends Edge = Edge>({
  nodes = [],
  edges = [],
  onNodesChange,
  onEdgesChange,
  onNodesDelete,
  onConnect,
  nodeTypes = {},
  edgeTypes = {},
  className,
  panels,
  configFlags,
  colorMode,
  ...nestedProps
}: IReactFlowProps<NodeType, EdgeType>) => {

  return (
    <div style={{ height: '100%', width: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodesDelete={onNodesDelete}
        onConnect={onConnect}
        fitView
        attributionPosition="top-right"
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        className={className || "overview intersection-flow"}
        preventScrolling={false}
        colorMode={colorMode}
        {...nestedProps}
      >
        {configFlags?.useMinimap && <MiniMap zoomable pannable nodeClassName={nodeClassName} />}
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
        {panels?.map((panel) => (
          <Panel position={panel.position || "top-right"} key={panel.id}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              padding: 8,
              backgroundColor: 'rgba(53, 37, 1, 0.8)',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
              borderRadius: 4,
            }}>
              {panel.nodes.map((node, index) => (
                <div key={node.id || `node-${index}`} style={{ margin: 8 }}>
                  {node.render?.()}
                </div>
              ))}
            </div>
          </Panel>
        ))}
        {configFlags?.useControls && <Controls />}
      </ReactFlow>
    </div>
  );
}

export default BaseReactFlowDiagram