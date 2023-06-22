import { FC } from "react";
import { PortalWithState } from "react-portal";

import { IPopover } from "./interface";
//@ts-ignore
import classes from "./styles.module.scss";

export const Popover: FC<IPopover> = ({
  open,
  closeHandler,
  position,
  children,
}) => {
  const onWrapperClick = (e: any) => {
    if (e.target.id === "wrapper") {
      closeHandler?.();
    }
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
                {children}
              </div>
            </div>
          )
        }
      </PortalWithState>
    );

  return null;
};
