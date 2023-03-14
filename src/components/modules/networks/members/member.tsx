import style from "./member.module.scss";
import MemberBadge from "@/components/base/member-badge/badge";
import { useGetNetworkDetails, useGetNetworkMembers } from "@/lib/queries";
import { useRouter } from "next/router";
import { useModalContext } from "@/components/base/modal/Provider";
import { TbSquareRoundedXFilled } from "react-icons/tb";
import { useRemoveMember, useUnlinkMember } from "@/lib/mutations";

export default function Member() {
  const router = useRouter();
  const networkId = String(router.query.id);
  const { data: network } = useGetNetworkDetails(networkId);
  const { data: members } = useGetNetworkMembers(networkId);
  const { mutate: unlink } = useUnlinkMember(networkId);
  const { mutate: remove } = useRemoveMember(networkId);

  const { showModal, closeModal } = useModalContext();

  const handleOnAddMember = () => {
    router.push("/networks/add-member?id=" + router.query.id);
  };

  const activeMembers = members?.filter((member) => member.status === "Active");
  const inactiveMembers = members?.filter(
    (member) => member.status === "Inactive"
  );

  return (
    <div className={style.member_main}>
      <div className={style.member_nav}>
        <header className="text-[#686777] uppercase font-semibold">
          MEMBERS({members?.length ?? 0})
        </header>

        {network?.status === "Active" &&
          router.pathname === "/networks/[id]/update" && (
            <button
              onClick={handleOnAddMember}
              className="text-[#686777] font-light text-sm"
            >
              ADD NEW
              <span className="ml-2 px-2 bg-[#554AF0] text-white rounded-lg text-lg">
                +
              </span>
            </button>
          )}
      </div>

      {(activeMembers?.length ?? 0) > 0 && (
        <div className="mb-4">
          <header className="text-[#686777] font-semibold mb-4">Active</header>
          <div className={style.member_list}>
            {activeMembers?.map((member) => {
              const warning = (
                <>
                  Are you sure you want to make {member.disciples.first_name}{" "}
                  <strong>Inactive</strong>?{" "}
                </>
              );

              const handleConfirm = () => {
                unlink(member.id, {
                  onSuccess: closeModal,
                });
              };

              return (
                <MemberBadge
                  status={member.status}
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
        </div>
      )}
      {(inactiveMembers?.length ?? 0) > 0 && (
        <>
          <header className="text-[#686777] font-semibold mb-4">
            Inactive
          </header>
          <div className={style.member_list}>
            {inactiveMembers?.map((member) => {
              let warning = (
                <>
                  Are you sure you want to make {member.disciples.first_name}{" "}
                  <strong>Inactive</strong>?{" "}
                </>
              );

              if (member.status === "Inactive")
                warning = (
                  <>
                    Are you sure you want to <strong>remove</strong>{" "}
                    {member.disciples.first_name}?
                  </>
                );

              const handleConfirm = () => {
                remove(member.id, {
                  onSuccess: closeModal,
                });
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
                  status={member.status}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
