// @ts-ignore
import classes from "./styles.module.scss";
import { ArrowIcon } from "./ArrowIcon";
import { FC } from "react";
import { ITriggerButton } from "./interface";
import { useReactFlow } from "reactflow";
import { emptyNode, getId, sharedEdgeProps } from "../../utils/constants";
import { getLayoutedNodes } from "../../utils/graph";

export const TriggerButton: FC<ITriggerButton> = ({ type, xPos, yPos, id }) => {
  const { getEdges, getNodes, setEdges, setNodes } = useReactFlow();

  const onClick = () => {
    const nodes = getNodes();
    const edges = getEdges();

    const createOneNode = () => {
      const newId = getId();
      const newPosition = {
        x: xPos + 200,
        y: yPos,
      };
      const newNode = {
        ...emptyNode,
        id: newId,
        data: {},
        position: newPosition,
      };

      const newEdge = {
        id: `e${id}-${newId}`,
        source: id,
        target: newId,
        ...sharedEdgeProps,
      };

      const { layoutedNodes, layoutedEdges } = getLayoutedNodes(
        [...nodes, newNode],
        [...edges, newEdge]
      );

      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
    };

    const createTwoNodes = () => {
      const topId = getId();
      const bottomId = getId();

      const topPosition = {
        x: xPos + 200,
        y: yPos - 120,
      };

      const bottomPosition = {
        ...topPosition,
        y: yPos + 120,
      };

      const topNode = {
        ...emptyNode,
        id: topId,
        data: {},
        position: topPosition,
      };

      const bottomNode = {
        ...emptyNode,
        id: bottomId,
        data: {},
        position: bottomPosition,
      };

      const topEdge = {
        ...sharedEdgeProps,
        id: `e${id}-${topId}`,
        source: id,
        target: topId,
        label: "No",
        labelStyle: {
          fill: "#FF4D4F",
          fontSize: 12,
          transform: "translateX(12px)",
        },
        labelBgStyle: {
          fill: "#FFCCC7",
          height: "20px",
          transform: "translate(12px, -3px)",
        },
      };

      const bottomEdge = {
        ...topEdge,
        id: `e${id}-${bottomId}`,
        target: bottomId,
        label: "Yes",
        labelStyle: {
          ...topEdge.labelStyle,
          fill: "#52C41A",
        },
        labelBgStyle: {
          ...topEdge.labelBgStyle,
          fill: "#D9F7BE",
        },
      };

      const { layoutedNodes, layoutedEdges } = getLayoutedNodes(
        [...nodes, topNode, bottomNode],
        [...edges, topEdge, bottomEdge]
      );

      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
    };

    switch (type) {
      case "decisionNode":
        createTwoNodes();
        break;

      default:
        createOneNode();
        break;
    }
  };

  return (
    <div className={classes.wrapper} id="trigger" onClick={onClick}>
      <ArrowIcon />
    </div>
  );
};
