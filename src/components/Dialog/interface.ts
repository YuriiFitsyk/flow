import { PropsWithChildren, ReactElement } from "react";

export interface IDialog extends PropsWithChildren<any> {
  open: boolean;
  closeHandler?: () => void;
  title?: string;
  actions?: ReactElement;
}
