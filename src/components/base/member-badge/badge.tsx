import Avatar from "@/components/base/avatar";
import style from "./badge.module.scss";
import {
  TbSquareRoundedXFilled,
  TbSquareRoundedCheckFilled,
} from "react-icons/tb";
import { useRouter } from "next/router";

type Props = {
  first_name: string;
  last_name: string;
  image_url?: string;
  editable?: boolean;
  onRemove?: () => void;
  status?: "Active" | "Inactive";
  onSetActive?: (e?: any) => void;
  id: string;
};

export default function MemberBadge(props: Props) {
  const {
    first_name,
    last_name,
    editable,
    onRemove,
    status,
    onSetActive,
    image_url,
  } = props;

  const router = useRouter();

  const handleOnclick = () => {
    router.push("/profile/[id]", `/profile/${props.id}`);
  };

  const handleOnRemove = (e: any) => {
    e?.stopPropagation?.();
    onRemove?.();
  };

  const handleOnActivate = (e: any) => {
    e?.stopPropagation?.();
    onSetActive?.(e);
  };

  return (
    <button
      onClick={handleOnclick}
      className="flex items-center bg-transparent"
    >
      <span style={{ opacity: status === "Active" ? 1 : 0.5 }} className="z-10">
        <Avatar id={props.id} fontSize="text-base" size={40} />
      </span>

      <div
        style={{ opacity: status === "Active" ? 1 : 0.5 }}
        className={style.badge_name}
      >
        {first_name} {last_name}
      </div>

      {editable && status === "Inactive" && (
        <button
          onClick={handleOnActivate}
          className="disabled:opacity-50 ml-[-8px] mr-3 text-green-500 z-10"
        >
          <span className="pointer-events-none">
            <TbSquareRoundedCheckFilled size={24} />
          </span>
        </button>
      )}

      {editable && (
        <button
          onClick={handleOnRemove}
          className="ml-[-8px] text-red-500 z-10"
        >
          <TbSquareRoundedXFilled size={24} />
        </button>
      )}
    </button>
  );
}
