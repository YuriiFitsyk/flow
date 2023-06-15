import { FC, useContext, useMemo, useState } from "react";
import { Edge, Handle, Position } from "reactflow";
import { ITaskNode } from "./interface";
import { TaskIcon } from "./TaskIcon";
// @ts-ignore
import classes from "./styles.module.scss";
import { TriggerButton } from "../../TriggerButton";
import { TaskDialog } from "../../dialogs/TaskDialog";
import { ContextMenu } from "../../ContextMenu";
import { EdgesContext } from "../../../App";

export const TaskNode: FC<ITaskNode> = ({ id, type, xPos, yPos }) => {
  const edges: Edge[] = useContext(EdgesContext);
  const isConnected = !!edges.find((e) => e.source === id);

  const [openDialog, setOpenDialog] = useState(false);
  const [openContext, setOpenContext] = useState(false);
  const [contextPosition, setContextPosition] = useState({ x: 0, y: 0 });

  const toggleOpenDialog = () => setOpenDialog((p) => !p);
  const toggleOpenContext = () => setOpenContext((p) => !p);

  const onOverlayClick = (e: any) => {
    if (e.target.id === "overlay") {
      toggleOpenDialog();
    }
  };

  const onOverlayContext = (e: any) => {
    e.preventDefault();
    toggleOpenContext();
    setContextPosition({ x: e.pageX, y: e.pageY });
  };

  return useMemo(() => {
    return (
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <Handle
            type="target"
            position={Position.Left}
            id="a"
            style={{ visibility: "hidden" }}
          />

          <div className={classes.icon}>
            <TaskIcon />
          </div>

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

        <TaskDialog open={openDialog} closeHandler={toggleOpenDialog} />
        <ContextMenu
          open={openContext}
          closeHandler={toggleOpenContext}
          position={contextPosition}
          nodeId={id}
        />

        <div
          id="overlay"
          className={classes.overlay}
          onClick={onOverlayClick}
          onContextMenu={onOverlayContext}
        />

        <div className={classes.text_container}>
          <h3 className={classes.title}>Task</h3>
          <p className={classes.text}>Submit income review</p>
        </div>
      </div>
    );
  }, [isConnected, xPos, yPos, openDialog, openContext, contextPosition]);
};
