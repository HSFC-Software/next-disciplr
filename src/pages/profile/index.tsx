import Header from "@/components/base/header";
import Layout from "@/components/templates/page";
import Head from "next/head";
import styles from "./profile.module.scss";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { Dropdown } from "flowbite-react";
import { useGetProfile } from "@/lib/queries";
import moment from "moment";
import Body from "@/components/base/body";
import { store } from "@/lib/models";
import { useFlags } from "launchdarkly-react-client-sdk";
import { supabase } from "@/lib/supabase";
import { destroyCookie } from "nookies";

export default function Home() {
  const { data: profile } = useGetProfile();
  const { enableUpdateProfile } = useFlags();

  let name = profile?.first_name ?? "-";
  if (profile?.middle_name) name += ` ${profile?.middle_name}`;
  if (profile?.last_name) name += ` ${profile?.last_name}`;

  const handleUpdateProfile = () => {
    if (!enableUpdateProfile) return;

    store.dispatch.Profile.setUpdateReference(profile?.id ?? "");
    window.location.href = "/update-profile";
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      // TODO: handle unable to sign out session
    }
    destroyCookie(null, "token");
    window.location.href = "/sign-in";
  };

  return (
    <>
      <Head>
        <title>Disciplr</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout activeRoute="profile">
        <Header>
          <div className="flex w-full justify-between items-center">
            <span>Profile</span>
            <Dropdown
              label={
                <span className="text-3xl">
                  <HiOutlineCog6Tooth />
                </span>
              }
              placement="bottom-end"
              inline
              arrowIcon={null!}
            >
              <Dropdown.Item
                onClick={handleUpdateProfile}
                className={`${
                  !enableUpdateProfile ? "pointer-events-none opacity-25" : ""
                } ${styles.dropdownItem}`}
              >
                Update Profile
              </Dropdown.Item>
              <Dropdown.Item
                onClick={handleSignOut}
                className={styles.dropdownItem}
              >
                Sign out
              </Dropdown.Item>
            </Dropdown>
          </div>
        </Header>
        <Body>
          <section className="px-7 grow overflow-y-auto h-full">
            <div className="flex justify-center py-5 mb-4">
              <div className="w-[100px] h-[100px] bg-gray-100 rounded-full flex justify-center items-center text-4xl font-bold text-slate-700">
                {profile?.first_name[0] ?? "-"}
              </div>
            </div>
            <label className={`${styles.label} uppercase font-medium`}>
              General Information
            </label>
            <div className="py-5 flex flex-col gap-2">
              <label className={styles.label}>Name</label>
              <div className="text-lg">{name}</div>
            </div>
            <div className="py-5 flex flex-col gap-2">
              <label className={styles.label}>Birthday</label>
              <div className="text-lg">
                {profile?.birthday
                  ? moment(profile?.birthday).format("LL")
                  : "-"}
              </div>
            </div>
            <div className="py-5 flex flex-col gap-2">
              <label className={styles.label}>Sex</label>
              <div className="text-lg">{profile?.sex ?? "-"}</div>
            </div>

            <label className={`${styles.label} uppercase font-medium mt-7`}>
              Contact Information
            </label>
            <div className="py-5 flex flex-col gap-2">
              <label className={styles.label}>Mobile</label>
              <div className="text-lg">{profile?.contact_number ?? "-"}</div>
            </div>
            <div className="py-5 flex flex-col gap-2">
              <label className={styles.label}>Email Address</label>
              <div className="text-lg">{profile?.email}</div>
            </div>
            <div className="py-5 flex flex-col gap-2">
              <label className={styles.label}>Address</label>
              <div className="text-lg">{profile?.address ?? "-"}</div>
            </div>
            {/* <div className="mt-12 mb-10 text-center">
              <button className="py-3 px-12 rounded-lg bg-[#6e7ac5] text-white">
                Logout
              </button>
            </div> */}
          </section>
        </Body>
      </Layout>
    </>
  );
}
