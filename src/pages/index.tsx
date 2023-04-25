import Layout from "@/components/templates/page";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Disciplr</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout activeRoute="/events" />
    </>
  );
}
