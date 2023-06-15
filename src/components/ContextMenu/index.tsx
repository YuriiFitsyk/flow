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
import { sharedEdgeProps } from "../../utils/constants";

export const ContextMenu: FC<IContextMenu> = ({
  open,
  closeHandler,
  position,
  nodeId,
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
    const nodes = allNodes.filter((n) => n.id !== nodeId);
    const allEdges = getEdges();
    const targetEdge = allEdges.find((e) => e.target === nodeId);
    const sourceEdge = allEdges.find((e) => e.source === nodeId);
    let newEdges = [];

    if (sourceEdge) {
      const targetId = sourceEdge.target;
      const sourceId = targetEdge.source;
      const newEdge = {
        ...sharedEdgeProps,
        target: targetId,
        source: sourceId,
        id: `e${targetId}-${sourceId}`,
      };

      newEdges = [
        ...allEdges.filter((e) => e.source !== nodeId && e.target !== nodeId),
        newEdge,
      ];
    } else {
      newEdges = [...allEdges.filter((e) => e.target !== nodeId)];
    }

    const { layoutedNodes, layoutedEdges } = getLayoutedNodes(
      [...nodes],
      [...newEdges]
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
                <ContextMenuItem
                  text="Delete step"
                  icon={TrashIcon}
                  isDangerous={true}
                  action={onDeleteNode}
                />
                <ContextMenuItem
                  text="Delete chain"
                  icon={ChainIcon}
                  isDangerous={true}
                  action={() => {}}
                />
              </div>
            </div>
          )
        }
      </PortalWithState>
    );

  return null;
};
