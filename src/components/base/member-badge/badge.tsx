import Avatar from "@/components/base/avatar";
import style from "./badge.module.scss";
import { TbSquareRoundedXFilled } from "react-icons/tb";

type Props = {
  first_name: string;
  last_name: string;
  image_url?: string;
  editable?: boolean;
  onRemove?: () => void;
  status?: "Active" | "Inactive";
};

export default function MemberBadge(props: Props) {
  const { first_name, last_name, editable, onRemove, status } = props;

  return (
    <div className="flex items-center bg-transparent">
      <span style={{ opacity: status === "Active" ? 1 : 0.5 }} className="z-10">
        <Avatar fontSize="text-base" size={40}>
          {`${first_name?.charAt(0) ?? ""}${last_name?.charAt(0) ?? ""}`.trim()}
        </Avatar>
      </span>

      <div
        style={{ opacity: status === "Active" ? 1 : 0.5 }}
        className={style.badge_name}
      >
        {first_name} {last_name}
      </div>
      {editable && (
        <button
          onClick={() => onRemove?.()}
          className="ml-[-8px] text-red-500 z-10"
        >
          <TbSquareRoundedXFilled size={24} />
        </button>
      )}
    </div>
  );
}
