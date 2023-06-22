import { FC, memo, useState } from "react";
import { Handle, Position } from "reactflow";
import { IEmptyNode } from "./interface";
import { EmptyIcon } from "./EmptyIcon";
// @ts-ignore
import classes from "./styles.module.scss";
import { EmptyNodeOptions } from "../../EmptyNodeOptions";
import { ContextMenu } from "../../ContextMenu";

export const EmptyNode: FC<IEmptyNode> = memo(({ id }) => {
  const [openOptions, setOpenOptions] = useState(false);
  const [openContext, setOpenContext] = useState(false);
  const [contextPosition, setContextPosition] = useState({ x: 0, y: 0 });

  const toggleOpenContext = () => setOpenContext((p) => !p);
  const toggleOpenOptions = () => setOpenOptions((p) => !p);

  const onOverlayContext = (e: any) => {
    e.preventDefault();
    toggleOpenContext();
    setContextPosition({ x: e.pageX, y: e.pageY });
  };

  const onOverlayClick = (e: any) => {
    if (e.target.id === "overlay") {
      toggleOpenOptions();
      setContextPosition({ x: e.pageX, y: e.pageY });
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Handle
          type="target"
          position={Position.Left}
          id="a"
          style={{ visibility: "hidden" }}
        />

        <EmptyIcon />

        <div
          id="overlay"
          className={classes.overlay}
          onClick={onOverlayClick}
          onContextMenu={onOverlayContext}
        />

        <ContextMenu
          open={openContext}
          closeHandler={toggleOpenContext}
          position={contextPosition}
          nodeId={id}
          deleteOptions={{
            step: true,
          }}
        />

        <EmptyNodeOptions
          id={id}
          open={openOptions}
          closeHandler={toggleOpenOptions}
          position={contextPosition}
        />
      </div>

      <div className={classes.text_container}>
        <h3 className={classes.title}>Unknown</h3>
      </div>
    </div>
  );
});
