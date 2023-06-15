export interface IContextMenuItem {
  text: string;
  icon: any;
  isDangerous?: boolean;
  action: () => void;
}
