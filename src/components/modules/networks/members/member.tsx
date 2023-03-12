import style from "./member.module.scss";
import MemberBadge from "@/components/base/member-badge/badge";
import { useGetNetworkMembers } from "@/lib/queries";
import { useRouter } from "next/router";
import { useModalContext } from "@/components/base/modal/Provider";

export default function Member() {
  const router = useRouter();
  const { data: members } = useGetNetworkMembers(String(router.query.id));
  console.log(router);

  const { showModal, closeModal } = useModalContext();

  const handleOnAddMember = () => {
    router.push("/networks/add-member?id=" + router.query.id);
  };

  return (
    <div className={style.member_main}>
      <div className={style.member_nav}>
        <header className="text-[#686777] uppercase font-semibold">
          MEMBERS({members?.length ?? 0})
        </header>

        <button
          onClick={handleOnAddMember}
          className="text-[#686777] font-light text-sm"
        >
          ADD NEW
          <span className="ml-2 px-2 bg-[#554AF0] text-white rounded-lg text-lg">
            +
          </span>
        </button>
      </div>
      <div className={style.member_list}>
        {members?.map((member) => {
          return (
            <MemberBadge
              editable={router.pathname === "/networks/[id]/update"}
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
