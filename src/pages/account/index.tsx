import Avatar from "@/components/base/avatar";
import Header from "@/components/base/header";
import Layout from "@/components/templates/page";
import { useGetProfile } from "@/lib/queries";
import Head from "next/head";
import { TiUser } from "react-icons/ti";
import { BsPersonFillLock } from "react-icons/bs";
import { TbMessageCircle2Filled } from "react-icons/tb";
import { IoLogOut } from "react-icons/io5";
import Link from "next/link";
import { destroyCookie } from "nookies";

export default function Accounts() {
  const { data: profile } = useGetProfile();

  let name = profile?.first_name ?? "-";
  if (profile?.middle_name) name += ` ${profile?.middle_name}`;
  if (profile?.last_name) name += ` ${profile?.last_name}`;

  const handleSignOut = async () => {
    destroyCookie(null, "token");
    window.location.href = "/sign-in";
  };

  return (
    <>
      <Head>
        <title>Disciplr</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout activeRoute="account">
        <Header>
          <div className="flex w-full justify-between items-center">
            <span>Account</span>
          </div>
        </Header>
        <div className="flex gap-4 px-7 items-center">
          <Avatar
            fontSize="text-xl"
            size={77}
            imgSrc={profile?.img_url}
            id={profile?.id}
          />
          <div>
            <span className="font-bold text-lg">{name}</span>
            <div className="text-sm text-gray-400">{profile?.email}</div>
            <div className="text-sm text-gray-400">
              {profile?.contact_number}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 py-7">
          <div>
            <Link href="/update-profile">
              <div className="flex items-center bg-[#f9f9f9] py-4 mx-7 px-5 gap-3 rounded-3xl">
                <div className="h-[45px] w-[45px] bg-[#E8E8E8] rounded-full flex justify-center items-center text-3xl text-[#6e7ac5]">
                  <TiUser />
                </div>
                <div className="font-semibold text-gray-600">Profile</div>
              </div>
            </Link>
          </div>
          <div>
            <Link href="/account/accounts">
              <div className="flex items-center bg-[#f9f9f9] py-4 mx-7 px-5 gap-3 rounded-3xl">
                <div className="h-[45px] w-[45px] bg-[#E8E8E8] rounded-full flex justify-center items-center text-3xl text-[#6e7ac5]">
                  <BsPersonFillLock />
                </div>
                <div className="font-semibold text-gray-600">
                  Accounts and Security
                </div>
              </div>
            </Link>
          </div>
          <div>
            <Link
              href={`https://docs.google.com/forms/d/e/1FAIpQLSecEX9VaJ6QhQWVIQX6lBaEeKl7uUtfQA_iHPKUOdaJcHF6xA/viewform?usp=pp_url&entry.900631397=${profile?.email}`}
            >
              <div className="flex items-center bg-[#f9f9f9] py-4 mx-7 px-5 gap-3 rounded-3xl">
                <div className="h-[45px] w-[45px] bg-[#E8E8E8] rounded-full flex justify-center items-center text-2xl text-[#6e7ac5]">
                  <TbMessageCircle2Filled />
                </div>
                <div className="font-semibold text-gray-600">Support</div>
              </div>
            </Link>
          </div>
          <div>
            <button onClick={handleSignOut} className="w-full">
              <div className="flex items-center bg-[#f9f9f9] py-4 mx-7 px-5 gap-3 rounded-3xl">
                <div className="h-[45px] w-[45px] bg-[#E8E8E8] rounded-full flex justify-center items-center text-2xl text-[#6e7ac5]">
                  <IoLogOut />
                </div>
                <div className="font-semibold text-gray-600">Logout</div>
              </div>
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}
