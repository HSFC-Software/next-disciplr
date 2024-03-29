import style from "./member.module.scss";
import MemberBadge from "@/components/base/member-badge/badge";
import { useGetNetworkDetails, useGetNetworkMembers } from "@/lib/queries";
import { useRouter } from "next/router";
import { useModalContext } from "@/components/base/modal/Provider";
import { TbSquareRoundedXFilled } from "react-icons/tb";
import {
  useBatchInactiveMember,
  useLinkExistingMember,
  useRemoveMember,
  useUnlinkMember,
} from "@/lib/mutations";
import { useEffect, useState } from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { Dropdown } from "flowbite-react";
import { RotatingLines } from "react-loader-spinner";

export default function Member() {
  const router = useRouter();
  const networkId = String(router.query.id);
  const { data: network } = useGetNetworkDetails(networkId);
  const { data: members } = useGetNetworkMembers(networkId);
  const { mutate: unlink, isLoading: isUnlinking } = useUnlinkMember(networkId);
  const { mutate: remove } = useRemoveMember(networkId);
  const { mutate: active } = useLinkExistingMember(networkId);
  const [selectedMemberIds, setSelectedMemberIds] = useState<any[]>([]);
  const { mutate: batchInactive, isLoading: isInactivating } =
    useBatchInactiveMember();

  const { showModal, closeModal } = useModalContext();

  const handleOnAddMember = () => {
    router.push("/networks/add-member?id=" + router.query.id);
  };

  const activeMembers = members?.filter((member) => member.status === "Active");
  const inactiveMembers = members?.filter(
    (member) => member.status === "Inactive"
  );

  const handleSetToActive = (id: string, e?: any) => {
    e.target.disabled = true;
    active(
      {
        disciple_id: id,
        network_id: networkId,
      },
      {
        onSettled() {
          e.target.disabled = false;
        },
      }
    );
  };

  const handleBacthInactive = () => {
    batchInactive(
      selectedMemberIds.map((id) => {
        const member: any = members?.find(
          (member) => member.disciples.id === id
        );
        console.log("id:", member.id);
        return member.id;
      }),
      {
        onSuccess() {
          setSelectedMemberIds([]);
        },
      }
    );
  };

  return (
    <div className={style.member_main}>
      <div className={style.member_nav}>
        <header className="text-[#686777] uppercase font-semibold">
          MEMBERS({activeMembers?.length ?? 0})
        </header>

        {network?.status === "Active" &&
          router.pathname === "/networks/[id]/update" && (
            <button
              onClick={handleOnAddMember}
              className="text-[#6e7ac5] font-medium text-xs hover:underline"
            >
              ADD NEW
              <span className="ml-2 px-2 bg-[#6e7ac5] text-white rounded-lg text-lg">
                +
              </span>
            </button>
          )}
      </div>

      {router.pathname === "/networks/[id]/update" && (
        <>
          {selectedMemberIds.length > 0 && (
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <header className="text-[#686777] font-semibold mb-4">
                  Selected
                </header>

                <Dropdown
                  disabled={isInactivating}
                  label={
                    <>
                      {isInactivating ? (
                        <RotatingLines strokeColor="#6e7ac5" width="24" />
                      ) : (
                        <button className="text-2xl pl-4 pr-1 text-[#6e7ac5]">
                          <IoEllipsisHorizontal />
                        </button>
                      )}
                    </>
                  }
                  placement="bottom-end"
                  inline
                  arrowIcon={null!}
                >
                  <Dropdown.Item className="font-normal text-xs px-7 py-4">
                    Move to a new network
                  </Dropdown.Item>
                  <Dropdown.Item className="font-normal text-xs px-7 py-4">
                    Move to another network
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={handleBacthInactive}
                    className="font-normal text-xs px-7 py-4"
                  >
                    Make Inactive
                  </Dropdown.Item>
                </Dropdown>
              </div>
              <div className={style.member_list}>
                {selectedMemberIds
                  .map((id) =>
                    members?.find((member) => member.disciples.id === id)
                  )
                  ?.filter((member) => !selectedMemberIds.includes(member?.id))
                  ?.map((member) => {
                    const warning = (
                      <>
                        Are you sure you want to make{" "}
                        {member?.disciples.first_name} <strong>Inactive</strong>
                        ?{" "}
                      </>
                    );

                    const handleConfirm = (e: any) => {
                      e.target.disabled = true;
                      unlink(member?.id ?? "", {
                        onSuccess: closeModal,
                        onSettled: () => {
                          e.target.disabled = false;
                        },
                      });
                    };

                    return (
                      <MemberBadge
                        id={member?.disciples.id ?? ""}
                        status={member?.status}
                        editable
                        onSetActive={(e) =>
                          handleSetToActive(member?.disciples.id ?? "", e)
                        }
                        onRemove={() =>
                          setSelectedMemberIds((prev) =>
                            prev.filter((item) => item !== member?.disciples.id)
                          )
                        }
                        key={member?.id}
                        first_name={member?.disciples.first_name ?? ""}
                        last_name={member?.disciples.last_name ?? ""}
                      />
                    );
                  })}
              </div>
            </div>
          )}
        </>
      )}

      {(activeMembers?.length ?? 0) > 0 && (
        <div className="mb-4">
          <header className="text-[#686777] font-semibold mb-4">Active</header>
          <div className={style.member_list}>
            {activeMembers
              ?.filter(
                (member) => !selectedMemberIds.includes(member.disciples.id)
              )
              ?.map((member) => {
                const warning = (
                  <>
                    Are you sure you want to make {member.disciples.first_name}{" "}
                    <strong>Inactive</strong>?{" "}
                  </>
                );

                const handleConfirm = (e: any) => {
                  e.target.disabled = true;
                  unlink(member.id, {
                    onSuccess: closeModal,
                    onSettled: () => {
                      e.target.disabled = false;
                    },
                  });
                };

                return (
                  <MemberBadge
                    id={member.disciples.id ?? ""}
                    status={member.status}
                    editable={router.pathname === "/networks/[id]/update"}
                    onSetActive={(e) =>
                      handleSetToActive(member.disciples.id ?? "", e)
                    }
                    onLongPress={() => {
                      if (router.pathname === "/networks/[id]/update")
                        setSelectedMemberIds((prev) => [
                          ...prev,
                          member.disciples.id,
                        ]);
                    }}
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
                            disabled={isUnlinking}
                            onClick={handleConfirm}
                            className="disabled:opacity-50 bg-[#E22134] text-white py-3 px-7 rounded-lg"
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

      {activeMembers?.length === 0 && (
        <div className="flex flex-col justify-center items-center gap-4 mb-7">
          <div className="opacity-75">
            <GroupSvg />
          </div>
          <div className="text-sm text-gray-500">
            There are no members in this network yet
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

              const handleConfirm = (e: any) => {
                e.target.disabled = true;
                remove(member.id, {
                  onSuccess: closeModal,
                  onSettled() {
                    e.target.disabled = false;
                  },
                });
              };

              return (
                <MemberBadge
                  id={member.disciples.id ?? ""}
                  editable={router.pathname === "/networks/[id]/update"}
                  onSetActive={(e) =>
                    handleSetToActive(member.disciples.id ?? "", e)
                  }
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
                          className="disabled:opacity-50 bg-[#E22134] text-white py-3 px-7 rounded-lg"
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

function GroupSvg() {
  return (
    <svg
      width="77"
      height="58"
      viewBox="0 0 22 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.949 10.5399C7.49903 10.5399 4.58807 11.1037 4.58807 13.2794C4.58807 15.4561 7.51783 16 10.949 16C14.399 16 17.31 15.4362 17.31 13.2605C17.31 11.0839 14.3802 10.5399 10.949 10.5399Z"
        fill="#6e7ac5"
      />
      <path
        opacity="0.4"
        d="M10.949 8.46703C13.2851 8.46703 15.1583 6.58307 15.1583 4.23351C15.1583 1.88306 13.2851 0 10.949 0C8.61293 0 6.73975 1.88306 6.73975 4.23351C6.73975 6.58307 8.61293 8.46703 10.949 8.46703Z"
        fill="#6e7ac5"
      />
      <path
        opacity="0.4"
        d="M20.0879 5.21926C20.6923 2.84179 18.9203 0.706573 16.6639 0.706573C16.4186 0.706573 16.184 0.73359 15.9548 0.779519C15.9243 0.786723 15.8903 0.802032 15.8724 0.829049C15.8518 0.86327 15.867 0.909199 15.8894 0.938917C16.5672 1.89531 16.9567 3.05973 16.9567 4.3097C16.9567 5.50744 16.5995 6.62413 15.9727 7.5508C15.9082 7.64626 15.9655 7.77504 16.0792 7.79485C16.2368 7.82277 16.398 7.83718 16.5627 7.84168C18.2058 7.88491 19.6805 6.82135 20.0879 5.21926Z"
        fill="#6e7ac5"
      />
      <path
        d="M21.8093 10.8169C21.5084 10.1721 20.7823 9.72996 19.6782 9.51292C19.1571 9.38504 17.7468 9.20493 16.4351 9.22925C16.4154 9.23195 16.4046 9.24546 16.4028 9.25446C16.4002 9.26707 16.4055 9.28868 16.4315 9.30219C17.0377 9.60388 19.381 10.916 19.0864 13.6834C19.0738 13.8032 19.1696 13.9067 19.2887 13.8887C19.8654 13.8059 21.349 13.4853 21.8093 12.4866C22.0636 11.9588 22.0636 11.3456 21.8093 10.8169Z"
        fill="#6e7ac5"
      />
      <path
        opacity="0.4"
        d="M6.04483 0.779793C5.8165 0.732964 5.58101 0.706848 5.33567 0.706848C3.07926 0.706848 1.30726 2.84207 1.91255 5.21953C2.31906 6.82162 3.79379 7.88518 5.43685 7.84195C5.60161 7.83745 5.76368 7.82214 5.92037 7.79513C6.03409 7.77531 6.09139 7.64653 6.02692 7.55107C5.40014 6.6235 5.04288 5.50771 5.04288 4.30997C5.04288 3.0591 5.43327 1.89468 6.11109 0.939192C6.13258 0.909473 6.1487 0.863545 6.12721 0.829324C6.1093 0.801407 6.07617 0.786998 6.04483 0.779793Z"
        fill="#6e7ac5"
      />
      <path
        d="M2.32156 9.51267C1.21752 9.7297 0.492248 10.1719 0.191392 10.8167C-0.0637974 11.3453 -0.0637974 11.9586 0.191392 12.4872C0.651629 13.485 2.13531 13.8065 2.71195 13.8885C2.83104 13.9065 2.92595 13.8038 2.91342 13.6831C2.61883 10.9166 4.9621 9.60453 5.56918 9.30284C5.59425 9.28843 5.59962 9.26772 5.59694 9.25421C5.59515 9.2452 5.5853 9.2317 5.5656 9.22989C4.25294 9.20468 2.84358 9.38479 2.32156 9.51267Z"
        fill="#6e7ac5"
      />
    </svg>
  );
}
