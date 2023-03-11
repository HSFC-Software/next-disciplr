import style from "./member.module.scss";
import MemberBadge from "@/components/base/member-badge/badge";
import { useGetNetworkMembers } from "@/lib/queries";
import { useRouter } from "next/router";

export default function Member() {
  const router = useRouter();
  const { data: members } = useGetNetworkMembers(String(router.query.id));

  return (
    <div className={style.member_main}>
      <div className={style.member_nav}>
        <div className={style.member_count}>MEMBERS(9)</div>
        <div className={style.member_addnew}>
          ADD NEW
          <button className={style.member_button}>+</button>
        </div>
      </div>
      <div className={style.member_list}>
        {members?.map((member) => {
          return (
            <MemberBadge
              key={member.id}
              first_name={member.disciples.first_name ?? ""}
              last_name={member.disciples.last_name ?? ""}
            />
          );
        })}
      </div>
      {/* <div className={style.member_show}>Show Inactive Network</div> */}
    </div>
  );
}
