import { ReactNode } from "react";

export default function Body({ children }: { children?: ReactNode }) {
  return <div className="grow overflow-y-auto">{children}</div>;
}
