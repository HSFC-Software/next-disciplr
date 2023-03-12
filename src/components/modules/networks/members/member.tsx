import style from "./member.module.scss";
import MemberBadge from "@/components/base/member-badge/badge";
import { useGetNetworkMembers } from "@/lib/queries";
import { useRouter } from "next/router";
import { useModalContext } from "@/components/base/modal/Provider";
import { TbSquareRoundedXFilled } from "react-icons/tb";

export default function Member() {
  const router = useRouter();
  const { data: members } = useGetNetworkMembers(String(router.query.id));

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
          let warning = `Are you sure you want to make ${member.disciples.first_name} Inactive?`;

          if (member.status === "Inactive")
            warning = `Are you sure you want to remove ${member.disciples.first_name}?`;

          const handleConfirm = () => {
            //
          };

          return (
            <MemberBadge
              editable={router.pathname === "/networks/[id]/update"}
              onRemove={() =>
                showModal(
                  <div className="text-center bg-white px-7 mx-7 w-full py-12 rounded-3xl relative">
                    <button
                      onClick={closeModal}
                      className="absolute top-0 right-0 mt-[-12px] mr-[-12px] text-[#E22134]"
                    >
                      <TbSquareRoundedXFilled size={35} />
                    </button>
                    <div className="mb-3">{warning}</div>
                    <button
                      onClick={handleConfirm}
                      className="bg-[#E22134] text-white py-3 px-7 rounded-lg"
                    >
                      Confirm
                    </button>
                  </div>
                )
              }
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
