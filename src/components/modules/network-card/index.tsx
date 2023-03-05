import styles from "./index.module.scss";

type Props = {
  first_name: string;
  last_name: string;
  created_at: string;
  member_count: number;
  status: "Active" | "Inactive";
  image_url?: string;
};

export default function NetworkCard(props: Props) {
  const { first_name, last_name, created_at, member_count, status } = props;

  return (
    <div className={styles.card}>
      {first_name} {last_name} {created_at} {member_count} {status}
    </div>
  );
}
