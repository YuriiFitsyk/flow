import { FC, memo, useState } from "react";
import { Handle, Position } from "reactflow";
import { IEmptyNode } from "./interface";
import { EmptyIcon } from "./EmptyIcon";
// @ts-ignore
import classes from "./styles.module.scss";
import { EmptyNodeOptions } from "../../EmptyNodeOptions";

export const EmptyNode: FC<IEmptyNode> = memo(({ id }) => {
  const [openOptions, setOpenOptions] = useState(false);

  const toggleOpenOptions = () => setOpenOptions((p) => !p);

  return (
    <div className={classes.wrapper} onClick={toggleOpenOptions}>
      <div className={classes.container}>
        <Handle
          type="target"
          position={Position.Left}
          id="a"
          style={{ visibility: "hidden" }}
        />

        <EmptyIcon />

        {openOptions && (
          <EmptyNodeOptions id={id} closeHandler={toggleOpenOptions} />
        )}
      </div>

      <div className={classes.text_container}>
        <h3 className={classes.title}>Unknown</h3>
      </div>
    </div>
  );
});
