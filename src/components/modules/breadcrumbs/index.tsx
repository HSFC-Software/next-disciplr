import GroupIcon from "@/components/base/icons/Group";
import { useState } from "react";
import { VscChevronRight } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { State } from "@/lib/models";
import Link from "next/link";

const Icons: any = {
  GroupIcon,
};

const BreadCrumbs = (props: { activePageId?: string }) => {
  const { activePageId } = props;
  const [showDropdown, setShowDropdown] = useState(false);

  const iconName = useSelector<State, string>(
    (state) => state.BreadCrumbs.icon
  );

  const pages = useSelector<State, any[]>((state) => state.BreadCrumbs.pages);

  let Icon = null;

  if (Icons?.[iconName]) {
    Icon = Icons?.[iconName];
  }

  return (
    <div className="relative">
      <div
        onClick={() => setShowDropdown(!showDropdown)}
        className="bg-[#F9F9F9] py-4 rounded-2xl px-7 flex items-center gap-4 cursor-pointer"
      >
        {Icon && (
          <span className="shrink-0">
            <Icon width={28} height={28} isActive />
          </span>
        )}

        {pages.map((page, index) => (
          <>
            {index !== 0 && (
              <span className="shrink-0">
                <VscChevronRight />
              </span>
            )}
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              {page.title}
            </span>
          </>
        ))}
      </div>
      {showDropdown && (
        <div className="bg-[#F9F9F9] absolute mt-2 px-7 py-4 rounded-2xl max-w-[280px] flex flex-col gap-5 shadow-sm z-20">
          {pages.map((page, index) => (
            <li key={page.id} className="flex items-center gap-4">
              <span className="shrink-0">
                <VscChevronRight />
              </span>
              <Link
                href={page.url}
                className={`
                overflow-hidden text-ellipsis whitespace-nowrap
                ${
                  activePageId === page.id
                    ? "text-[#7D7D7D] font-semibold"
                    : "text-[#656565]"
                }
                `}
              >
                {page.title}
              </Link>
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default BreadCrumbs;
