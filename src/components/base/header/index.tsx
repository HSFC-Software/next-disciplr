import { useEffect, ReactNode } from "react";
import { RiArrowLeftLine } from "react-icons/ri";

export default function Header({
  children,
  showBackArrrow,
  onBack,
}: {
  children?: ReactNode;
  showBackArrrow?: boolean;
  onBack?: () => void;
}) {
  // useEffect(() => {
  //   const filler = document.getElementById("header-filler");
  //   const header = document.getElementById("header");

  //   if (filler && header) {
  //     filler.style.marginTop = `${header.offsetHeight}px`;
  //   }
  // });

  return (
    <header
      id="header"
      className="p-7 sticky top-0 w-screen bg-white z-[100] flex flex-col gap-7"
    >
      {showBackArrrow && (
        <button onClick={() => onBack?.()}>
          <RiArrowLeftLine size={38} />
        </button>
      )}
      <span className="text-[#04021D] text-2xl font-semibold">{children}</span>
    </header>
  );
}
