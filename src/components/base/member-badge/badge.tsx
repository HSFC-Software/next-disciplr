import Avatar from "@/components/base/avatar";
import style from "./badge.module.scss";

type Props = {
  first_name: string;
  last_name: string;
  image_url?: string;
};

export default function MemberBadge(props: Props) {
  const { first_name, last_name, image_url } = props;
  return (
    <div className={style.badge_main}>
      {/* <img
        className={style.badge_img}
        src="https://assets.entrepreneur.com/content/3x2/2000/20200429211042-GettyImages-1164615296.jpeg?crop=1:1"
        alt=""
      /> */}
      <Avatar fontSize="base" size={40}>
        {`${first_name?.charAt(0) ?? ""}${last_name?.charAt(0) ?? ""}`.trim()}
      </Avatar>

      <div className={style.badge_name}>
        {first_name} {last_name}
      </div>
    </div>
  );
}
