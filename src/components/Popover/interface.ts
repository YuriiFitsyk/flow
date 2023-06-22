import { PropsWithChildren } from "react";

export interface IPopover extends PropsWithChildren {
  open: boolean;
  closeHandler?: () => void;
  position: { x: number; y: number };
}
