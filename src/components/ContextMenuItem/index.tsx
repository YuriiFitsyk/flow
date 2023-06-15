import { FC } from "react";
import { IContextMenuItem } from "./interface";
//@ts-ignore
import classes from "./styles.module.scss";
import * as cs from "classnames";

export const ContextMenuItem: FC<IContextMenuItem> = ({
  text,
  icon: Icon,
  isDangerous,
  action,
}) => {
  return (
    <div
      className={cs({
        [classes.container]: true,
        [classes.dangerous]: isDangerous,
      })}
      onClick={action}
    >
      <Icon />
      <p className={classes.text}>{text}</p>
    </div>
  );
};
