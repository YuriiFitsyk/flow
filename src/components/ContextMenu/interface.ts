interface IDeleteOptions {
  step?: boolean;
  chain?: boolean;
}

export interface IContextMenu {
  open: boolean;
  closeHandler?: () => void;
  position: { x: number; y: number };
  nodeId: string;
  deleteOptions: IDeleteOptions;
}
