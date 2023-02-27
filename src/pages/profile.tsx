import Header from "@/components/base/header";
import Layout from "@/components/templates/Layout";
import Head from "next/head";
import { useEffect } from "react";
import vhCheck from "vh-check";

export default function Home() {
  useEffect(() => {
    vhCheck("main");
  }, []);

  return (
    <>
      <Head>
        <title>Disciplr</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout activeRoute="profile">
        <Header>Profile</Header>
      </Layout>
    </>
  );
}
