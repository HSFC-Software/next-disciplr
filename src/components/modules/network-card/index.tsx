import Avatar from "@/components/base/avatar";
import { store } from "@/lib/models";
import moment from "moment";
import Link from "next/link";
import styles from "./index.module.scss";

type Props = {
  first_name?: string;
  last_name?: string;
  created_at?: string;
  member_count: number;
  status: "Active" | "Inactive";
  image_url?: string;
  alias?: string;
  id: string;
};

export default function NetworkCard(props: Props) {
  const { created_at, member_count, status, id } = props;

  const words = props?.alias?.trim().split(" ");
  let initials = words?.[0].charAt(0);
  if (words?.length! > 1) {
    initials = `${words?.[0]?.charAt(0)}${words?.[1]?.charAt(0)}`;
  }

  const handleClick = () => {
    store.dispatch.BreadCrumbs.setIcon("GroupIcon");
    store.dispatch.BreadCrumbs.setPages([
      {
        title: "Networks",
        url: `${document.URL}`,
      },
    ]);
  };

  return (
    <Link onClick={handleClick} href={`/networks/${id}`}>
      <div className={`${styles.card_main} ${status}`}>
        <div className={styles.card_body}>
          <div className="relative">
            <Avatar fontSize="text-xl" size={77}>
              {initials}
            </Avatar>
            <div className={styles.card_status}>{member_count} members</div>
          </div>
          <div className={styles.card_content}>
            <div>{props?.alias}</div>
            <div className={styles.card_createdAt}>
              Opened last {moment(created_at).fromNow()}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
