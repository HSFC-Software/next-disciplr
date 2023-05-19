import Head from "next/head";
import Image from "next/image";
import { useToken } from "@/lib/hooks";
import Auth from "@/components/base/auth";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useSendBulkSms } from "@/lib/mutations";
import { toast } from "react-toastify";

export default function Sms() {
  const token = useToken();
  const [mobileNumbers, setMobileNumber] = useState<string[]>([]);
  const [showInput, setShowInput] = useState(false);
  const { isLoading, mutate } = useSendBulkSms();

  if (!token) return <Auth />;

  const handleSubmit = () => {
    const textareaEl = document.getElementById("text-content");
    const text = (textareaEl as any)?.value;

    if (!text) return;

    mutate(
      {
        text,
        receivers: mobileNumbers,
      },
      {
        onSuccess() {
          toast.success("Message sent! 🎉", {
            autoClose: 1500,
          });
        },
        onError() {
          toast.error("Unable to send at the moment. Please try again", {
            autoClose: 1500,
          });
        },
      }
    );
  };

  const handlePress = (e: any) => {
    const value = e.target.value;
    if (e.code === "Backspace" && value === "") {
      const _mutableMobileNumbers = [...mobileNumbers];
      _mutableMobileNumbers.pop();

      setMobileNumber(_mutableMobileNumbers);
      return;
    }

    if (e.code === "Enter" || e.code === "Space") {
      setMobileNumber((prev) => {
        return [...prev, value];
      });

      e.target.value = "";
    }
  };

  const handleRemoveItem = (number: string) => {
    setMobileNumber((prev) => prev.filter((item) => number !== item));
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
              autoFocus
              id="text-content"
              placeholder="Text Message"
              className="w-full px-4 py-2 border-2 rounded-xl mt-2 border-gray-300 cursor"
              rows={7}
            />

            <div
              onClick={() => {
                setShowInput(true);
                document?.getElementById("mobile-input")?.focus?.();
              }}
              className="flex gap-x-1 gap-y-3 flex-wrap px-4 py-3 border-2 rounded-xl mt-2 border-gray-300 cursor text-left max-w-[420px] w-screen max-h-[120px] overflow-y-auto"
            >
              {mobileNumbers.map((number) => (
                <span
                  className="bg-[#e6e6e6] pl-3 flex items-center font-medium rounded-lg"
                  key={number}
                >
                  {number}
                  <button
                    onClick={() => handleRemoveItem(number)}
                    className="px-2 text-[#FB5D64]"
                  >
                    <FaTimes />
                  </button>
                </span>
              ))}
              {!showInput && mobileNumbers.length === 0 && (
                <span className="text-[#6a7380]">Recipients</span>
              )}

              <input
                maxLength={11}
                placeholder={
                  mobileNumbers.length === 0 && showInput ? "Recipients" : ""
                }
                id="mobile-input"
                className="outline-0"
                onKeyDown={handlePress}
                onFocus={() => setShowInput(true)}
                onBlur={() => {
                  if (mobileNumbers.length === 0) {
                    setShowInput(false);
                  }
                }}
              />
            </div>
          </div>
          <button
            disabled={isLoading || mobileNumbers.length === 0}
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
