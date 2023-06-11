import { FC, useMemo, useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import { IDecisionNode } from "./interface";
import { DecisionIcon } from "./DecisionIcon";
// @ts-ignore
import classes from "./styles.module.scss";
import { TriggerButton } from "../../TriggerButton";
import { DecisionDialog } from "../../dialogs/DecisionDialog";

export const DecisionNode: FC<IDecisionNode> = ({ id, type, xPos, yPos }) => {
  const { getEdges } = useReactFlow();
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((p) => !p);

  const isConnected = !!getEdges().find((e) => e.source === id);

  const onWrapperClick = (e: any) => {
    if (e.target.id === "overlay") {
      toggleOpen();
    }
  };

  return useMemo(() => {
    return (
      <div className={classes.wrapper} onClick={onWrapperClick}>
        <div className={classes.container}>
          <Handle
            type="target"
            position={Position.Left}
            id="a"
            style={{ visibility: "hidden" }}
          />

          <DecisionIcon />

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

        <DecisionDialog open={open} closeHandler={toggleOpen} />
        <div id="overlay" className={classes.overlay} />
      </div>
    );
  }, [isConnected, xPos, yPos, open]);
};
