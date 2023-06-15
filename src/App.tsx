import ReactFlow, { useNodesState, useEdgesState } from "reactflow";

import "reactflow/dist/style.css";
import { useCallback, createContext, useEffect } from "react";
import { initialEdges, initialNodes, nodeTypes } from "./utils/constants";
import { getLayoutedNodes } from "./utils/graph";
import { ConfigProvider } from "antd";

export const EdgesContext = createContext([]);

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback(
    (_, __) => {},
    // eslint-disable-next-line
    [nodes, edges]
  );

  const onLayout = useCallback(() => {
    const { layoutedNodes, layoutedEdges } = getLayoutedNodes(nodes, edges);

    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
  }, [nodes, edges]);

  useEffect(() => onLayout(), []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#08979C",
        },
      }}
    >
      <EdgesContext.Provider value={edges}>
        <div style={{ width: "100vw", height: "100vh" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            minZoom={0.2}
            style={{ background: "#f0f2f5" }}
            zoomOnDoubleClick={false}
            // @ts-ignore
            nodeTypes={nodeTypes}
            fitView
          />
        </div>
      </EdgesContext.Provider>
    </ConfigProvider>
  );
}
