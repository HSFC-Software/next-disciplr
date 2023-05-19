import Head from "next/head";
import Image from "next/image";
import { useToken } from "@/lib/hooks";
import Auth from "@/components/base/auth";
import axios from "axios";

export default function Sms() {
  const token = useToken();

  if (!token) return <Auth />;

  const handleSubmit = () => {
    const textareaEl = document.getElementById("text-content");
    const recipientsEl = document.getElementById("recipients");
    const text = (textareaEl as any)?.value;
    const recipients = (recipientsEl as any)?.value;

    const receivers = recipients?.trim()?.split(" ");

    axios
      .post("/api/sms", { text, receivers })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Head>
        <title>Disciplr | SMS Text Blast</title>
        <meta name="description" content="Disciplr | Sign In" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="w-screen w-full h-screen flex items-center justify-center">
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
            <span className="font-bold text-primary">Disciplr</span> SMS Text
            Blast 🎉
          </div>

          <div className="my-7 px-7">
            <textarea
              id="text-content"
              placeholder="Text Message"
              className="w-full px-4 py-2 border-2 rounded-xl mt-2 border-gray-300 cursor"
              rows={7}
            />
            <textarea
              name="numbers"
              id="recipients"
              placeholder="Recipients"
              className="w-full px-4 py-2 border-2 rounded-xl mt-2 border-gray-300 cursor"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-[#6e7ac5] disabled:opacity-50 text-white px-14 py-3 rounded-xl hover:shadow-md"
          >
            Send
          </button>
          <div />
        </div>
      </main>
    </>
  );
}
