import type { ReactNode } from "react";
import "./Citations.css";

type CitationsProps = {
  children: ReactNode;
  "data-node-id"?: string;
};

/** Figma Citations row — wraps Source pills (node 3432:6834) */
export function Citations({ children, "data-node-id": nodeId }: CitationsProps) {
  return (
    <div className="citations" data-node-id={nodeId} data-name="Citations">
      {children}
    </div>
  );
}
