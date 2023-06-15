import { TriggerNode } from "../components/nodes/TriggerNode";
import { TaskNode } from "../components/nodes/TaskNode";
import { DecisionNode } from "../components/nodes/DecisionNode";
import { EmptyNode } from "../components/nodes/EmptyNode";

export const nodeTypes = {
  triggerNode: TriggerNode,
  taskNode: TaskNode,
  decisionNode: DecisionNode,
  emptyNode: EmptyNode,
};

export const sharedStyles = {
  borderRadius: "50%",
};

export const sharedEdgeProps = {
  type: "step",
  style: {
    stroke: "#BFBFBF",
    strokeDasharray: "0, 24",
    strokeWidth: 12,
    strokeLinecap: "round",
    padding: 50,
    transform: "translateX(12px)",
  },
  labelBgPadding: [6, 0],
  labelBgBorderRadius: 10,
  interactionWidth: 40,
};

export const emptyNode = {
  style: sharedStyles,
  draggable: false,
  connectable: false,
  selectable: false,
  type: "emptyNode",
};

export const triggerNode = {
  id: "1",
  position: { x: 0, y: 0 },
  data: {},
  ...emptyNode,
  type: "triggerNode",
};

export const initialNodes = [triggerNode];

export const initialEdges = [];

let id = 2;
export const getId = () => `${id++}`;
