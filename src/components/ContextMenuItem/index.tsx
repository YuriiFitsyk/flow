import { FC } from "react";
import { IContextMenuItem } from "./interface";
//@ts-ignore
import classes from "./styles.module.scss";

export const ContextMenuItem: FC<IContextMenuItem> = ({
  text,
  icon: Icon,
  isDangerous,
  action,
}) => {
  return (
    <div
      className={`${classes.container} ${isDangerous ? classes.dangerous : ""}`}
      onClick={action}
    >
      <Icon />
      <p className={classes.text}>{text}</p>
    </div>
  );
};
