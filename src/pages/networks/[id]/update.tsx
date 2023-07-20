import Modal from "@/components/base/modal";
import Header from "@/components/base/header";
import Layout from "@/components/templates/page";
import { useGetNetworkDetails } from "@/lib/queries";
import Head from "next/head";
import { useRouter } from "next/router";
import Member from "@/components/modules/networks/members/member";
import Body from "@/components/base/body";
import { Networks } from "@/components/modules/networks/networks";
import { useEffect, useState } from "react";
import {
  useMarkInactiveNetwork,
  useUpdateNetwork,
  useRemoveNetwork,
} from "@/lib/mutations";
import { BiBookmarkAltMinus } from "react-icons/bi";
import { TbSquareRoundedXFilled } from "react-icons/tb";
import {
  ModalProvider,
  useModalContext,
} from "@/components/base/modal/Provider";

const UpdateNetworkDetails = () => {
  const router = useRouter();

  const networkId = String(router.query.id);
  const { data: network } = useGetNetworkDetails(networkId);
  const { mutate: update } = useUpdateNetwork(networkId);
  const { mutate: markInactive, isLoading: inactivating } =
    useMarkInactiveNetwork();
  const { mutate: removeNetwork, isLoading: isRemoving } =
    useRemoveNetwork(networkId);

  const [showInactiveWarning, setShowInactiveWarning] = useState(false);
  const [showRemoveNetowrkWarning, setShowRemoveNetworkWarning] =
    useState(false);

  const [name, setName] = useState("");

  useEffect(() => {
    if (network) {
      setName(network.name);
    }
  }, [network]);

  const handleSuccess = () => {
    router.push("/networks/" + networkId);
  };

  const handleSave = () => {
    update({ name }, { onSuccess: handleSuccess });
  };

  const handleMakeInactive = () => {
    markInactive(network?.id ?? "", {
      onSuccess: () => setShowInactiveWarning(false),
    });
  };

  const handleRemoveNetwork = () => {
    removeNetwork(network?.id ?? "", {
      onSuccess: (response: any) => {
        setShowRemoveNetworkWarning(false);
        if (response?.parent?.id) {
          router.push(`/networks/${response?.parent?.id}`);
        } else {
          router.push("/networks");
        }
      },
    });
  };

  const handleRemove = () => setShowRemoveNetworkWarning(true);

  const handleMakeActive = () => {
    update({ status: "Active" });
  };

  const markInactiveWarning = (
    <Modal isOpen={showInactiveWarning}>
      <div className="text-center bg-white px-7 mx-7 w-full py-12 rounded-3xl relative">
        <button
          onClick={() => setShowInactiveWarning(false)}
          className="absolute top-0 right-0 mt-[-12px] mr-[-12px] text-[#E22134]"
        >
          <TbSquareRoundedXFilled size={35} />
        </button>
        <div className="mb-3">
          Are you sure you want to make this network <strong>Inactive</strong>?
        </div>
        <button
          disabled={inactivating}
          onClick={() => handleMakeInactive()}
          className="disabled:opacity-50 bg-[#E22134] text-white py-3 px-7 rounded-lg"
        >
          Confirm
        </button>
      </div>
    </Modal>
  );

  const markRemoveWarning = (
    <Modal isOpen={showRemoveNetowrkWarning}>
      <div className="text-center bg-white px-7 mx-7 w-full py-12 rounded-3xl relative">
        <button
          onClick={() => setShowRemoveNetworkWarning(false)}
          className="absolute top-0 right-0 mt-[-12px] mr-[-12px] text-[#E22134]"
        >
          <TbSquareRoundedXFilled size={35} />
        </button>
        <div className="mb-3">
          Are you sure you want to remove this network? This cannot be undone.
        </div>
        <button
          disabled={inactivating}
          onClick={handleRemoveNetwork}
          className="disabled:opacity-50 bg-[#E22134] text-white py-3 px-7 rounded-lg"
        >
          Confirm
        </button>
      </div>
    </Modal>
  );

  return (
    <>
      <Head>
        <title>Disciplr</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout activeRoute="networks" isNavigationHidden>
        <Header
          showBackArrrow
          onBack={() => {
            router.push(`/networks/${router.query.id}`);
          }}
        >
          <div className="flex w-full justify-between items-center">
            <span className="whitespace-nowrap overflow-hidden text-ellipsis">
              Update Network
            </span>
            <button
              onClick={handleSave}
              className="pl-4 shrink-0 text-sm font-medium text-[#6e7ac5]"
            >
              Save
            </button>
          </div>
        </Header>
        {network?.status === "Inactive" && (
          <div className="bg-orange-200 w-full left-0 text-base p-4">
            <span className="text-xs font-semibold">
              This network is Inactive.{" "}
            </span>
            <button
              onClick={handleMakeActive}
              className="text-xs text-[#6e7ac5]"
            >
              Want to set this network active?
            </button>
          </div>
        )}
        <Body>
          <div
            style={{
              opacity: network?.status === "Inactive" ? 0.7 : 1,
            }}
            className="flex flex-col gap-12"
          >
            <div>
              <div className="flex flex-col gap-2 px-7 mt-7">
                <label className="block uppercase text-sm">Network Name</label>
                <input
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-[#f2f2f8] w-full px-4 py-3 rounded-lg outline-none"
                  placeholder="Enter Network Name"
                />
              </div>
            </div>
            <div className="px-7 flex flex-col gap-12">
              <Member />
              <Networks id={network?.id ?? ""} />
              {network?.status === "Active" && (
                <div className="flex justify-center">
                  <button
                    // disabled={inactivating}
                    onClick={() => setShowInactiveWarning(true)}
                    className="flex items-center gap-2 rounded-xl p-3 px-5 bg-[#F5F5F5] text-orange-500"
                  >
                    <BiBookmarkAltMinus size={24} />
                    <div className="font-semibold">
                      Mark this network as Inactive
                    </div>
                  </button>
                </div>
              )}
              {network?.status === "Inactive" && (
                <div className="flex justify-center">
                  <button
                    disabled={!network}
                    onClick={handleRemove}
                    className="flex items-center gap-2 rounded-xl p-3 px-5 bg-[#F5F5F5] text-red-500"
                  >
                    <BiBookmarkAltMinus size={24} />
                    <div className="font-semibold">
                      Remove and disconnect this network
                    </div>
                  </button>
                </div>
              )}
              <div />
            </div>
          </div>
        </Body>
        {markInactiveWarning}
        {markRemoveWarning}
      </Layout>
    </>
  );
};

export default UpdateNetworkDetails;
