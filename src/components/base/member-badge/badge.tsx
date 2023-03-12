import Avatar from "@/components/base/avatar";
import style from "./badge.module.scss";
import { TbSquareRoundedXFilled } from "react-icons/tb";

type Props = {
  first_name: string;
  last_name: string;
  image_url?: string;
  editable?: boolean;
  onRemove?: () => void;
};

export default function MemberBadge(props: Props) {
  const { first_name, last_name, editable, onRemove } = props;

  return (
    <div className="flex items-center">
      <Avatar fontSize="text-base" size={40}>
        {`${first_name?.charAt(0) ?? ""}${last_name?.charAt(0) ?? ""}`.trim()}
      </Avatar>

      <div className={style.badge_name}>
        {first_name} {last_name}
      </div>
      {editable && (
        <button onClick={() => onRemove?.()} className="ml-[-8px] text-red-500">
          <TbSquareRoundedXFilled size={24} />
        </button>
      )}
    </div>
  );
}
