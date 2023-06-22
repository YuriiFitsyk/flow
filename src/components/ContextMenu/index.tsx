import { FC } from "react";
import { PortalWithState } from "react-portal";

import { IContextMenu } from "./interface";
//@ts-ignore
import classes from "./styles.module.scss";
import { ContextMenuItem } from "../ContextMenuItem";
import { TrashIcon } from "./TrashIcon";
import { ChainIcon } from "./ChainIcon";
import { useReactFlow } from "reactflow";
import { getLayoutedNodes } from "../../utils/graph";
import { emptyNode, getId } from "../../utils/constants";

export const ContextMenu: FC<IContextMenu> = ({
  open,
  closeHandler,
  position,
  nodeId,
  deleteOptions,
}) => {
  const { getEdges, getNodes, addEdges, addNodes, deleteElements } =
    useReactFlow();

  const onWrapperClick = (e: any) => {
    if (e.target.id === "wrapper") {
      closeHandler?.();
    }
  };

  const onDeleteNode = () => {
    const allNodes = getNodes();
    let currentNode;
    let nodes = allNodes.filter((node) => {
      if (node.id === nodeId) {
        currentNode = node;
        return false;
      }

      return true;
    });
    const allEdges = getEdges();
    const targetEdge = allEdges.find((e) => e.target === nodeId);
    const sourceEdge = allEdges.find((e) => e.source === nodeId);
    const previousNode = allNodes.find((n) => n.id === targetEdge.source);
    let newEdges = [];

    if (sourceEdge) {
      const targetId = sourceEdge.target;
      const sourceId = targetEdge.source;
      const newEdge = {
        ...targetEdge,
        target: targetId,
        source: sourceId,
        id: `e${targetId}-${sourceId}`,
      };

      newEdges = [
        ...allEdges.filter((e) => e.source !== nodeId && e.target !== nodeId),
        newEdge,
      ];
    } else {
      if (previousNode.type === "decisionNode") {
        const newId = getId();

        const newNode = {
          ...currentNode,
          id: newId,
          data: { prevNodeId: previousNode.id },
          type: "emptyNode",
        };

        const newEdge = {
          ...targetEdge,
          id: `e${previousNode.id}-${newId}`,
          source: previousNode.id,
          target: newId,
        };
        nodes = [...nodes, newNode];
        newEdges.push(newEdge);
      }

      newEdges = [...newEdges, ...allEdges.filter((e) => e.target !== nodeId)];
    }

    const { layoutedNodes, layoutedEdges } = getLayoutedNodes(nodes, newEdges);

    deleteElements({
      nodes: allNodes,
      edges: allEdges,
    });

    addEdges(layoutedEdges);
    addNodes(layoutedNodes);

    closeHandler();
  };

  const onDeleteChain = () => {
    const allNodes = getNodes();
    const allEdges = getEdges();

    const sortedNodes = [...allNodes].sort(
      (a, b) => a.position.x - b.position.x
    );

    let currentNode;

    const nodePos = sortedNodes.findIndex((node) => {
      if (node.id === nodeId) {
        currentNode = node;
        return true;
      }
      return false;
    });

    const unusedNodes = sortedNodes.splice(0, nodePos);
    sortedNodes.splice(0, 1);

    const nodesIdsToDelete = [nodeId];

    let prevEdge;
    let prevNode = unusedNodes.find(
      (node) => node.id === currentNode.data.prevNodeId
    );

    const filteredNodes = sortedNodes.filter((node) => {
      const { id, data } = node;

      if (nodesIdsToDelete.includes(data.prevNodeId)) {
        nodesIdsToDelete.push(id);
        return false;
      }

      return true;
    });

    const filteredEdges = allEdges.filter((edge) => {
      if (nodesIdsToDelete.includes(edge.target)) {
        if (edge.target === nodeId) prevEdge = edge;
        return false;
      }

      return true;
    });

    if (prevNode.type === "decisionNode") {
      const newId = getId();

      const newNode = {
        ...currentNode,
        id: newId,
        data: { prevNodeId: prevNode.id },
        type: "emptyNode",
      };

      const newEdge = {
        ...prevEdge,
        id: `e${prevNode.id}-${newId}`,
        source: prevNode.id,
        target: newId,
      };

      filteredNodes.push(newNode);
      filteredEdges.push(newEdge);
    }

    const { layoutedNodes, layoutedEdges } = getLayoutedNodes(
      [...unusedNodes, ...filteredNodes],
      filteredEdges
    );

    deleteElements({
      nodes: allNodes,
      edges: allEdges,
    });

    addEdges(layoutedEdges);
    addNodes(layoutedNodes);

    closeHandler();
  };

  if (open)
    return (
      <PortalWithState closeOnEsc onClose={closeHandler} defaultOpen={true}>
        {({ portal }) =>
          portal(
            <div
              className={classes.wrapper}
              id="wrapper"
              onClick={onWrapperClick}
            >
              <div
                className={classes.container}
                style={{ left: position.x, top: position.y }}
              >
                {deleteOptions.step && (
                  <ContextMenuItem
                    text="Delete step"
                    icon={TrashIcon}
                    isDangerous={true}
                    action={onDeleteNode}
                  />
                )}
                {deleteOptions.chain && (
                  <ContextMenuItem
                    text="Delete chain"
                    icon={ChainIcon}
                    isDangerous={true}
                    action={onDeleteChain}
                  />
                )}
              </div>
            </div>
          )
        }
      </PortalWithState>
    );

  return null;
};
