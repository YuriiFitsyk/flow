import { FC } from "react";
import { PortalWithState } from "react-portal";

import { IDialog } from "./interface";
//@ts-ignore
import classes from "./styles.module.scss";
import { CloseOutlined } from "@ant-design/icons";

export const Dialog: FC<IDialog> = ({
  open,
  closeHandler,
  title,
  actions,
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
              <div className={classes.dialog}>
                <div className={classes.top_line}>
                  <h3 className={classes.title}>{title}</h3>

                  <CloseOutlined
                    className={classes.close}
                    onClick={closeHandler}
                  />
                </div>

                <div className={classes.content}>{children}</div>

                <div className={classes.bottom_line}>{actions && actions}</div>
              </div>
            </div>
          )
        }
      </PortalWithState>
    );

  return null;
};
