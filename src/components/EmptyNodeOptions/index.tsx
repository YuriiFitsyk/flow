import { useReactFlow } from "reactflow";
import { FC } from "react";
import { IEmptyNodeOptions } from "./interface";
import { initialNodes } from "../../utils/constants";
// @ts-ignore
import classes from "./styles.module.scss";

export const EmptyNodeOptions: FC<IEmptyNodeOptions> = ({
  id,
  closeHandler,
}) => {
  const { addNodes, getNode, deleteElements, getEdges, addEdges, getNodes } =
    useReactFlow();

  const onSelect = (type: "decisionNode" | "taskNode") => {
    const currentEdge = getEdges().find((e) => e.target === id);
    const currentNode = getNode(id);

    const newNode = { ...currentNode, type };

    deleteElements({ nodes: [currentNode] });

    addNodes(newNode);
    addEdges(currentEdge);
    closeHandler();
  };

  const onReset = () => {
    deleteElements({ nodes: getNodes() });
    addNodes(initialNodes[0]);
    closeHandler();
  };

  return (
    <div className={classes.container}>
      <div className={classes.option} onClick={() => onSelect("taskNode")}>
        <p className={classes.text}>Add Task</p>
      </div>

      <div className={classes.option} onClick={() => onSelect("decisionNode")}>
        <p className={classes.text}>Add Decision</p>
      </div>

      <div className={classes.option} onClick={onReset}>
        <p className={classes.text}>Reset</p>
      </div>
    </div>
  );
};
