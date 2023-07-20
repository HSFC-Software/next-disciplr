import Avatar from "@/components/base/avatar";
import style from "./badge.module.scss";
import {
  TbSquareRoundedXFilled,
  TbSquareRoundedCheckFilled,
} from "react-icons/tb";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props = {
  first_name: string;
  last_name: string;
  image_url?: string;
  editable?: boolean;
  onRemove?: () => void;
  status?: "Active" | "Inactive";
  onSetActive?: (e?: any) => void;
  id: string;
  onLongPress?: () => void;
};

let longPressTimer: NodeJS.Timeout;
export default function MemberBadge(props: Props) {
  const {
    first_name,
    last_name,
    editable,
    onRemove,
    status,
    onSetActive,
    id,
    onLongPress,
  } = props;

  const router = useRouter();

  const handleOnLongPress = useLongPress(() => {
    onLongPress?.();
  }, 250);

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

  const longPressHandler = () => {
    if (onLongPress) longPressTimer = setTimeout(onLongPress, 300);
  };

  useEffect(
    () => () => {
      clearTimeout(longPressTimer);
    },
    []
  );

  return (
    <button
      {...handleOnLongPress}
      draggable
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

function useLongPress(callback = () => {}, ms = 200) {
  const [startLongPress, setStartLongPress] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (startLongPress) {
      timerId = setTimeout(callback, ms);
    } else {
      clearTimeout(timerId!);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [callback, ms, startLongPress]);

  return {
    onMouseDown: () => setStartLongPress(true),
    onMouseUp: () => setStartLongPress(false),
    onMouseLeave: () => setStartLongPress(false),
    onTouchStart: () => setStartLongPress(true),
    onTouchEnd: () => setStartLongPress(false),
  };
}
