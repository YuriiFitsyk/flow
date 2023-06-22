import { IPopover } from "../Popover/interface";

export interface IEmptyNodeOptions extends IPopover {
  id: string;
  closeHandler: () => void;
}
