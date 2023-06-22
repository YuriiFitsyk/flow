import { IPopover } from "../Popover/interface";

interface IDeleteOptions {
  step?: boolean;
  chain?: boolean;
}

export interface IContextMenu extends IPopover {
  nodeId: string;
  deleteOptions: IDeleteOptions;
}
