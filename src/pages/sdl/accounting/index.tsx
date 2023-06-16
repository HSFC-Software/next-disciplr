import Layout from "@/components/templates/page";
import { useEnrollStudent } from "@/lib/mutations";
import { useGetSchoolRegistration } from "@/lib/queries";
import { supabase } from "@/lib/supabase";
import Head from "next/head";
import { useState } from "react";
import { toast } from "react-toastify";
import Scanner from "@/components/tmp/scanner";
import Flagged from "@/components/modules/flagged";

export default function Accounting() {
  const [registration_id, setRegistrationId] = useState("");

  const { data: registration, isLoading } =
    useGetSchoolRegistration(registration_id);
  const { mutate } = useEnrollStudent();

  const handleReceivePayment = async () => {
    mutate(registration_id || (global as any)?.id, {
      onSuccess() {
        setRegistrationId("");
        toast.success("Payment received. Student enrolled. 🎉", {
          autoClose: 2500,
        });
      },
    });
  };

  return (
    <Flagged flagKey="enableSdlAdmission">
      <>
        <Head>
          <title>Disciplr</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Layout activeRoute="" isNavigationHidden>
          <Scanner />
        </Layout>
      </>
    </Flagged>
  );
}
