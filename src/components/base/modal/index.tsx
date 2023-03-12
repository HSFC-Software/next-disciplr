import { ReactNode } from "react";

export default function Modal({
  children,
  isOpen,
}: {
  children?: ReactNode;
  isOpen: boolean;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 bottom-0 w-screen h-screen bg-[#00000038] z-50 flex justify-center items-center">
      {children}
    </div>
  );
}
