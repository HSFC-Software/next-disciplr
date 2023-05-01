import GroupIcon from "@/components/base/icons/Group";
import { useState } from "react";
import { VscChevronRight } from "react-icons/vsc";

const BreadCrumbs = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="relative">
      <div
        onClick={() => setShowDropdown(!showDropdown)}
        className="bg-[#F9F9F9] py-4 rounded-2xl px-7 flex items-center gap-4 cursor-pointer"
      >
        <span className="shrink-0">
          <GroupIcon width={28} height={28} isActive />
        </span>
        <span className="shrink-0">
          <VscChevronRight />
        </span>
        <span className="shrink-0">Networks </span>
        <span className="shrink-0">
          <VscChevronRight />
        </span>
        <span className="overflow-hidden text-ellipsis whitespace-nowrap">
          Sam&apos;s Network Sam&apos;s Network Sam&apos;s Network
        </span>
      </div>
      {showDropdown && (
        <div className="bg-[#F9F9F9] absolute mt-2 px-7 py-4 rounded-2xl max-w-[280px] flex flex-col gap-5 shadow-sm z-20">
          <li className="flex items-center gap-4">
            <span className="shrink-0">
              <VscChevronRight />
            </span>
            <span className="shrink-0">Networks </span>
          </li>
          <li className="flex items-center gap-4">
            <span className="shrink-0">
              <VscChevronRight />
            </span>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              Sam&apos;s Network Sam&apos;s Network Sam&apos;s Network
            </span>
          </li>
        </div>
      )}
    </div>
  );
};

export default BreadCrumbs;
