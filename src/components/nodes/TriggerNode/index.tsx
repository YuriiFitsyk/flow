import { FC, useContext, useMemo } from "react";
import { Handle, Position, Edge } from "reactflow";
import { ITriggerNode } from "./interface";
import { TriggerIcon } from "./TriggerIcon";
// @ts-ignore
import classes from "./styles.module.scss";
import { TriggerButton } from "../../TriggerButton";
import { EdgesContext } from "../../../App.jsx";

export const TriggerNode: FC<ITriggerNode> = ({ id, type, xPos, yPos }) => {
  const edges: Edge[] = useContext(EdgesContext);
  const isConnected = !!edges.find((e) => e.source === id);

  return useMemo(() => {
    return (
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <TriggerIcon />
          <Handle
            type="source"
            position={Position.Right}
            id="b"
            style={{ visibility: "hidden" }}
          />

          {!isConnected && (
            <TriggerButton type={type} xPos={xPos} yPos={yPos} id={id} />
          )}
        </div>
      </div>
    );
  }, [isConnected, xPos, yPos]);
};
