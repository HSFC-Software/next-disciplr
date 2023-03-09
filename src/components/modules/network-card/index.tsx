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
      <>

        {/* active */}
        <div className={styles.card_main}>
            <div className={styles.card_body}>
                  <img className={styles.card_img} src="https://assets.entrepreneur.com/content/3x2/2000/20200429211042-GettyImages-1164615296.jpeg?crop=1:1" alt=""/>
                  <div className={styles.card_status}>{member_count} {status}</div>
                <div className={styles.card_content}>
                    <div>{first_name} {last_name}</div>
                    <div className={styles.card_createdAt}>{created_at}</div>
                </div>
            </div>    
        </div>

        {/* inactive */}
          <div className={styles.card_main}>
          <div className={styles.card_body_inactive}>
                  <img className={styles.card_img} src="https://assets.entrepreneur.com/content/3x2/2000/20200429211042-GettyImages-1164615296.jpeg?crop=1:1" alt=""/>
                  <div className={styles.card_status_inactive}>{member_count} {status}</div>
                <div className={styles.card_content}>
                    <div>{first_name} {last_name}</div>
                    <div className={styles.card_createdAt}>{created_at}</div>
                </div>
            </div>    
        </div> 

        </>
    )
}
