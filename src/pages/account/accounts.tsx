import Header from "@/components/base/header";
import Layout from "@/components/templates/page";
import Head from "next/head";
import Link from "next/link";
import { BsFillShieldLockFill } from "react-icons/bs";
import { BiLogoGooglePlus } from "react-icons/bi";
import { parseCookies } from "nookies";

export default function AccountsSecurity() {
  const handleChangePassword = () => {
    const cookie = parseCookies();

    const token = cookie.token;
    const redirect_uri = window.location.href;

    window.location.href = `https://sso.fishgen.org/change-password?token=${token}&redirect_uri=${redirect_uri}`;
  };

  return (
    <>
      <Head>
        <title>Disciplr</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout activeRoute="account">
        <Header showBackArrrow>
          <div className="flex w-full justify-between items-center">
            <span>Accounts and Security</span>
          </div>
        </Header>
        <div className="flex flex-col gap-3 py-7">
          <div>
            <Link className="opacity-50" href="#">
              <div className="flex items-center bg-[#f9f9f9] py-4 mx-7 px-5 gap-3 rounded-3xl">
                <div className="h-[45px] w-[45px] bg-[#E8E8E8] rounded-full flex justify-center items-center text-3xl text-[#6e7ac5]">
                  <BiLogoGooglePlus />
                </div>
                <div className="font-semibold text-gray-600">
                  Link google account
                </div>
              </div>
            </Link>
          </div>
          <div>
            <button onClick={handleChangePassword} className="w-full">
              <div className="flex items-center bg-[#f9f9f9] py-4 mx-7 px-5 gap-3 rounded-3xl">
                <div className="h-[45px] w-[45px] bg-[#E8E8E8] rounded-full flex justify-center items-center text-2xl text-[#6e7ac5]">
                  <BsFillShieldLockFill />
                </div>
                <div className="font-semibold text-gray-600">
                  Change Password
                </div>
              </div>
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}