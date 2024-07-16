import React, { useRef, useCallback, useMemo, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { CircleNode, RectangleNode, TriangleNode } from './CustomNodes';
import FlowSideBar from './FlowSideBar';
import { decodeToken } from 'react-jwt';

// import './index.css';


let id = 0;
const getId = () => `dndnode_${id++}`;

const Flow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const nodeTypes = useMemo(() => ({ circle: CircleNode, triangle: TriangleNode, rectangle: RectangleNode }), []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // project was renamed to screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition],
  );

  async function getFlow() {
    try {
      const token = localStorage.getItem('jwt_token')
      const decoded = decodeToken(token)
      const userId = decoded._id
      const res = await fetch(`http://localhost:3002/flow/${userId}`, { method: 'GET' })
      const msg = await res.json()
      console.log(msg)
      if (msg.result) {
        if (msg.responseData.flow) {
          const flow = msg.responseData.flow
          setEdges(eds => eds = flow.edges)
          setNodes(nds => nds = flow.nodes)
        }
      } else {
        console.log(msg.message)
      }
    } catch (e) {
      console.log("Error while fetching Flow")
    }
  }

  useEffect(() => {
    getFlow()
  }, [])


  return (
    <div style={{ display: "flex" }}>
      <FlowSideBar nodes={nodes} edges={edges} />
      <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ width: "100%", height: "90vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <Background />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
);
