import { useEffect, useState } from "react";
import {
  useGetCourse,
  useGetSchoolRegistration,
  useGetSchoolRegistrationByReference,
} from "@/lib/queries";
import { useEnrollStudent } from "@/lib/mutations";
import { toast } from "react-toastify";
import { AiOutlineScan } from "react-icons/ai";
import { RiArrowLeftLine, RiSendPlane2Fill } from "react-icons/ri";
import { useRouter } from "next/router";
import { sendBulkSms } from "@/lib/api";

if (typeof window != "undefined") {
  var QrReader = require("react-qr-reader");
}

const App = () => {
  const router = useRouter();
  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
  const [data, setData] = useState("");
  const [isManual, setIsManual] = useState(false);

  const reference_id = data.split("/").at(-1);

  const { data: registration, isLoading: __registration } =
    useGetSchoolRegistrationByReference(reference_id ?? "");

  const course_id = registration?.course_id;

  const { data: course } = useGetCourse(course_id ?? "");
  const { mutate, isLoading } = useEnrollStudent();

  const handleReceivePayment = () => {
    if (registration?.id)
      mutate(registration?.id, {
        onSuccess: () => {
          toast.success("Payment received. Student enrolled. 🎉", {
            autoClose: 2500,
          });
          setTimeout(() => {
            setData("");
          }, 2500);

          if (registration?.contact_number) {
            sendBulkSms(
              "Congratulations! You have successfully enrolled for the [COURSE] batch [BATCH]. Proceed to window 3 to verify your enrollment",
              [registration?.contact_number],
              "Disciplr"
            );
          }
        },
      });
  };

  const handleScan = async (scanData: any) => {
    if (scanData && scanData !== "") {
      const matcher = /^https:\/\/\w+\.\w+\.\w+\/_\/\w+$/;
      const url = scanData;

      console.log("matched?", matcher.test(url));

      // check if data matches a valid url
      if (matcher.test(url)) {
        setData(scanData);
        setStartScan(false); // close scanner
      }
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  const handleEnterManually = () => {
    const reference = (document.getElementById("reference-input") as any)
      ?.value;

    setData("https://api.fishgen.org/_/" + reference);
    setIsManual(true);
  };

  useEffect(() => {
    function handleDoubleClick() {
      setSelected(selected === "environment" ? "user" : "environment");
    }

    const el = document.querySelector(".scanner > section > section div");
    if (el) el.addEventListener("dblclick", handleDoubleClick);
    return () => el?.removeEventListener("dblclick", handleDoubleClick);
  });

  const handleBack = () => {
    setData("");
  };

  const showNoResult = isManual && !registration && !__registration;

  useEffect(() => {
    if (showNoResult) {
      toast.error("No result found. Please try again.", {
        autoClose: 2500,
        position: "top-center",
      });

      setIsManual(false);
      (document.getElementById("reference-input") as any).value = "";
    }
  }, [showNoResult]);

  return (
    <div className="p-7 scanner-container w-screen flex flex-col">
      <header className="shrink-0 text-primary font-bold text-2xl flex flex-col gap-4">
        {!!registration && (
          <button onClick={handleBack}>
            <RiArrowLeftLine size={38} />
          </button>
        )}
        School of Leaders
      </header>
      <main className="grow flex justify-center items-center h-full">
        {startScan && (
          <div className="scanner flex justify-center items-center relative">
            <QrReader
              facingMode={selected}
              delay={1000}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "300px" }}
            />
            <span className="text-[225px] absolute">
              <AiOutlineScan />
            </span>
          </div>
        )}
        {!startScan && !registration && (
          <div className="w-[300px] h-[300px] bg-[#F9F9F9] rounded-[20%] flex justify-center items-center">
            <span className="text-[225px]">
              <AiOutlineScan />
            </span>
          </div>
        )}
        {!!registration && (
          <div className="flex flex-col gap-4 mt-12 self-start">
            <header className="text-xl text-[#656565]">
              Enrolling for <strong>{course?.title}</strong>
            </header>
            <div className="w-full mt-7">
              <label className="text-[12px] text-[#686777] font-medium uppercase mb-1">
                First name
              </label>
              <input
                readOnly
                value={registration?.first_name}
                className="bg-[#F9F9F9] py-3 px-4 rounded-xl w-full cursor-not-allowed outline-0"
              />
            </div>
          </div>
        )}
      </main>
      <footer className="shrink-0 px-7">
        {!registration && (
          <div className="relative flex items-center mb-4">
            <input
              id="reference-input"
              className="bg-[#F9F9F9] w-full p-5 rounded-2xl"
              placeholder="Enter Reference Manually"
            />
            <button
              disabled={isManual}
              onClick={handleEnterManually}
              className="absolute text-3xl px-4 right-0 text-[#6E7AC5] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RiSendPlane2Fill />
            </button>
          </div>
        )}
        {!registration && (
          <button
            className="bg-[#6E7AC5] w-full text-white p-5 rounded-2xl"
            onClick={() => {
              setStartScan(!startScan);
            }}
          >
            {startScan && "Close Scanner"}
            {!startScan && "Open Scanner"}
          </button>
        )}
        {!!registration && (
          <button
            disabled={
              isLoading ||
              registration.status === "ENROLLED" ||
              registration.status === "REJECTED"
            }
            onClick={handleReceivePayment}
            className="bg-primary w-full text-white p-5 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Receive Payment
          </button>
        )}
      </footer>
    </div>
  );
};

export default App;
