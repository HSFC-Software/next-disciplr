import { getNetworksByDiscipler } from "@/lib/api";
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
  console.log(words);
  let initials = words?.[0].charAt(0);
  if (words?.length! > 1) {
    initials = `${words?.[0]?.charAt(0)}${words?.[1]?.charAt(0)}`;
  }

  return (
    <Link href={`/networks/${id}`}>
      <div className={`${styles.card_main} ${status}`}>
        <div className={styles.card_body}>
          <div className="relative">
            <div className={styles.card_img}>{initials}</div>
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
