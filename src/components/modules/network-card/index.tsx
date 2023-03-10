import { getNetworksByDiscipler } from "@/lib/api";
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

  if (status === "Active") {
    return (
      <Link href={`/networks/${id}`}>
        <div className={styles.card_main}>
          <div className={styles.card_body}>
            <img
              className={styles.card_img}
              src="https://assets.entrepreneur.com/content/3x2/2000/20200429211042-GettyImages-1164615296.jpeg?crop=1:1"
              alt=""
            />
            <div className={styles.card_status}>{member_count} members</div>
            <div className={styles.card_content}>
              <div>{props?.alias}</div>
              <div className={styles.card_createdAt}>{created_at}</div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/networks/${id}`}>
      <div className={styles.card_main}>
        <div className={styles.card_body_inactive}>
          <img
            className={styles.card_img}
            src="https://assets.entrepreneur.com/content/3x2/2000/20200429211042-GettyImages-1164615296.jpeg?crop=1:1"
            alt=""
          />
          <div className={styles.card_status_inactive}>
            {member_count} members
          </div>
          <div className={styles.card_content}>
            <div>{props.alias}</div>
            <div className={styles.card_createdAt}>{created_at}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
