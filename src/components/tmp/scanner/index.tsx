import { useEffect, useState } from "react";
import { useGetCourse, useGetSchoolRegistration } from "@/lib/queries";
import { useEnrollStudent } from "@/lib/mutations";
import { toast } from "react-toastify";
import { AiOutlineScan } from "react-icons/ai";
import { RiArrowLeftLine } from "react-icons/ri";
import { useRouter } from "next/router";

if (typeof window != "undefined") {
  var QrReader = require("react-qr-reader");
}

const App = () => {
  const router = useRouter();
  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
  const [data, setData] = useState("");

  const registration_id = data.split("/").at(-1);
  const course_id = data.split("/").at(-2);

  const { data: registration } = useGetSchoolRegistration(
    registration_id ?? ""
  );
  const { data: course } = useGetCourse(course_id ?? "");
  const { mutate, isLoading } = useEnrollStudent();

  const handleReceivePayment = () => {
    if (registration_id)
      mutate(registration_id, {
        onSuccess: () => {
          toast.success("Payment received. Student enrolled. 🎉", {
            autoClose: 2500,
          });
          setTimeout(() => {
            setData("");
          }, 2500);
        },
      });
  };

  const handleScan = async (scanData: any) => {
    if (scanData && scanData !== "") {
      const matcher =
        /^https:\/\/\w+\.\w+\.\w+\/\w+\/\w+\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
      const url = scanData;

      // check if data matches a valid url
      if (matcher.test(url)) {
        setData(scanData);

        setStartScan(false);
      }
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  useEffect(() => {
    function handleDoubleClick() {
      setSelected(selected === "environment" ? "user" : "environment");
    }

    const el = document.querySelector(".scanner > section > section div");
    if (el) el.addEventListener("dblclick", handleDoubleClick);
    return () => el?.removeEventListener("dblclick", handleDoubleClick);
  });

  return (
    <div className="p-7 scanner-container w-screen flex flex-col">
      <header className="shrink-0 text-primary font-bold text-2xl flex flex-col gap-4">
        {!!registration && (
          <button onClick={router.reload}>
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
          <button
            className="bg-[#6E7AC5] w-full text-white p-5 rounded-2xl"
            onClick={() => {
              setStartScan(!startScan);
            }}
          >
            Scan QR
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
