import Head from "next/head";
import { useState } from "react";
import Image from "next/image";
import SelectPicker from "@/components/modules/selectpicker";
import { useGetSubNetworks } from "@/lib/queries";
import { useFormik } from "formik";
import { useLinkNewMember } from "@/lib/mutations";
import { toast } from "react-toastify";
import { useToken } from "@/lib/hooks";
import Auth from "@/components/base/auth";

export default function Registraion() {
  const token = useToken();
  const primaryNetworks = useGetSubNetworks(
    "4758a17f-3a5b-4884-8243-df6aa14df578"
  );
  const [selectedNetworkId, setSelectedNetworkId] = useState("");
  const [showLeaderDropdown, setShowLeaderDropdown] = useState(false);

  const network = primaryNetworks.data?.find(
    (item) => item.id === selectedNetworkId
  );

  const { mutate: register, isLoading } = useLinkNewMember(network?.id ?? "");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: "",
      last_name: "",
      contact_number: "",
    },
    onSubmit: (values) => {
      register(
        {
          first_name: values.first_name,
          last_name: values.last_name,
          contact_number: values.contact_number,
          network_id: network?.networks_id.id ?? "",
        },
        {
          onSuccess: () => {
            toast.success("Account created successfully! 🎉", {
              autoClose: 1500,
            });
            setSelectedNetworkId("");
            formik.resetForm();
          },
          onError: () => {
            toast.error("Unable to register account! 🎉", {
              autoClose: 1500,
            });
          },
        }
      );
    },
  });

  if (!token) return <Auth />;

  return (
    <>
      <Head>
        <title>Disciplr | Registration Campaign</title>
        <meta name="description" content="Disciplr | Sign In" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="w-screen w-full h-screen flex items-center justify-center">
        <SelectPicker
          label="Leader"
          isVisible={showLeaderDropdown}
          value={selectedNetworkId}
          onConfirm={(value) => {
            setSelectedNetworkId(value);
          }}
          onClose={() => setShowLeaderDropdown(false)}
        >
          {primaryNetworks.data?.map((item) => {
            return (
              <option key={item.id} value={String(item.id)}>
                {item.networks_id.name}
              </option>
            );
          })}
        </SelectPicker>
        <div className="text-center">
          <div className="flex justify-center mb-7">
            <Image
              src="/disciplr-logo.png"
              alt="disciplr"
              width="100"
              height="100"
            />
          </div>
          <div className="text-base font-light text-gray-300">
            <span className="font-bold text-primary">Disciplr</span>{" "}
            Registration Campaign 🎉
          </div>

          <div className="my-7 px-7">
            <input
              disabled={isLoading}
              name="first_name"
              onChange={formik.handleChange}
              value={formik.values.first_name}
              type="text"
              placeholder="Firt Name"
              className="w-full px-4 py-2 border-2 rounded-xl mt-2 border-gray-300 cursor"
            />
            <input
              disabled={isLoading}
              name="last_name"
              onChange={formik.handleChange}
              value={formik.values.last_name}
              autoFocus
              id="lastname"
              placeholder="Last Name"
              type="text"
              className="w-full px-4 py-2 border-2 rounded-xl mt-2 border-gray-300"
            />
            <input
              disabled={isLoading}
              onChange={formik.handleChange}
              value={formik.values.contact_number}
              name="contact_number"
              type="text"
              placeholder="Contact Number"
              className="w-full px-4 py-2 border-2 rounded-xl mt-2 border-gray-300 cursor-not-allowed"
            />
            <input
              disabled={isLoading}
              onClick={() => setShowLeaderDropdown(true)}
              onFocus={() => setShowLeaderDropdown(false)}
              value={network?.networks_id.name}
              readOnly
              type="text"
              placeholder="Select Network"
              className="w-full px-4 py-2 border-2 rounded-xl mt-2 border-gray-300 cursor"
            />
          </div>
          <button
            disabled={
              isLoading ||
              !formik.values.first_name ||
              !network ||
              !formik.values.last_name
            }
            onClick={() => formik.handleSubmit?.()}
            className="bg-[#6e7ac5] disabled:opacity-50 text-white px-14 py-3 rounded-xl hover:shadow-md"
          >
            Register
          </button>
          <div />
        </div>
      </main>
    </>
  );
}
