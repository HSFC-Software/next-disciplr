import Header from "@/components/base/header";
import Layout from "@/components/templates/page";
import Head from "next/head";
import styles from "./profile.module.scss";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { Dropdown } from "flowbite-react";
import { useGetProfile, useGetProfileById } from "@/lib/queries";
import moment from "moment";
import Body from "@/components/base/body";
import { store } from "@/lib/models";
import { useFlags } from "launchdarkly-react-client-sdk";
import { supabase } from "@/lib/supabase";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";
import Avatar from "@/components/base/avatar";

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const { data: profile } = useGetProfileById(id as string);
  const { enableUpdateProfile } = useFlags();

  let name = profile?.first_name ?? "-";
  if (profile?.middle_name) name += ` ${profile?.middle_name}`;
  if (profile?.last_name) name += ` ${profile?.last_name}`;

  const handleUpdateProfile = () => {
    if (!enableUpdateProfile) return;

    store.dispatch.Profile.setUpdateReference(profile?.id ?? "");
    router.push("/profile/[id]/update", `/profile/${profile?.id}/update`);
  };

  let title = "";

  if (profile) title = `${profile.first_name} ${profile.last_name}`;

  return (
    <>
      <Head>
        <title>Disciplr</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout activeRoute="profile">
        <Header showBackArrrow onBack={router.back}>
          <div className="flex w-full justify-between items-center">
            <span>{title ?? "Profile"}</span>
            <button
              onClick={handleUpdateProfile}
              className="text-base text-[#6e7ac5]"
            >
              Update
            </button>
          </div>
        </Header>
        <Body>
          <section className="px-7 grow overflow-y-auto h-full">
            <div className="flex justify-center py-5 mb-4">
              <Avatar
                size={101}
                fontSize="text-4xl"
                imgSrc={profile?.img_url}
                id={id as string}
              />
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
