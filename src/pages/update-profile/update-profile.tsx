import Layout from "@/components/templates/page";
import styles from "./update-profile.module.scss";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useGetProfile } from "@/lib/queries";
import Header from "@/components/base/header";
import { useFormik } from "formik";
import { Profile } from "@/types/profile";
import { useUpdateUser } from "@/lib/mutations";
import { UpdateUserPaypload } from "@/lib/api";
import { useSelector } from "react-redux";
import { State } from "@/lib/models";
import { useRouter } from "next/router";
import debounce from "lodash.debounce";
import moment from "moment";

export default function UpdateProfile() {
  const router = useRouter();
  const { data: profile } = useGetProfile();
  const { mutate: updateUser } = useUpdateUser();
  const id = useSelector((state: State) => state.Profile.updateReference);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formik = useFormik<Profile>({
    enableReinitialize: true,
    initialValues: (profile as Profile) ?? {},
    onSubmit: (values) => {
      const payload = {
        ...values,
        id,
      } as UpdateUserPaypload;

      updateUser(payload, {
        onSuccess: () => {
          // TODO:make it dynamic
          window.location.href = "/profile";
        },
      });
    },
  });

  const handleUpdate = () => {
    formik.handleSubmit();
  };

  const initials = `${formik.values?.first_name?.charAt(0) ?? ""}${
    formik.values?.last_name?.charAt(0) ?? ""
  }`.trim();
  return (
    <>
      <Head>
        <title>Disciplr</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout activeRoute="profile">
        <Header showBackArrrow onBack={() => router.back()}>
          <div className="flex w-full justify-between items-center">
            <span className="whitespace-nowrap overflow-hidden text-ellipsis">
              Update Profile
            </span>
            <button
              onClick={handleUpdate}
              className="pl-4 shrink-0 text-sm font-medium text-[#6e7ac5]"
            >
              Save
            </button>
          </div>
        </Header>
        <DatePicker
          isVisible={showDatePicker}
          onClose={() => setShowDatePicker(false)}
          onConfirm={(value) => {
            const date = String(value.date).padStart(2, "0");
            const month = String(value.month).padStart(2, "0");
            formik.setFieldValue("birthday", `${value.year}-${month}-${date}`);
          }}
        />
        <section className={`grow overflow-y-auto h-full ${styles.content}`}>
          <div className="flex justify-center py-5 mb-4">
            <div className="w-[100px] h-[100px] bg-gray-100 rounded-full flex justify-center items-center text-4xl font-bold text-slate-700">
              {initials}
            </div>
          </div>
          <section className="px-7 py-3">
            <label className={`${styles.label} uppercase font-medium`}>
              General Information
            </label>
            <div className="py-5 flex flex-col gap-2">
              <label className={styles.label}>Name</label>
              <input
                className="px-0 border-0"
                autoFocus
                id="first_name"
                name="first_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.first_name}
                placeholder="First Name"
              />
            </div>
          </section>
          <section className="px-7">
            <div className="flex flex-col gap-2">
              <label className={styles.label}>Middle Name</label>
              <input
                className="border-0 px-0 outline-0"
                id="middle_name"
                name="middle_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.middle_name}
                placeholder="Middle Name"
              />
            </div>
          </section>
          <section className="px-7 py-3">
            <div className="py-5 flex flex-col gap-2">
              <label className={styles.label}>Last Name</label>
              <input
                className="border-0 px-0 outline-0"
                id="last_name"
                name="last_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.last_name}
                placeholder="Last Name"
              />
            </div>
          </section>
          <section className="px-7 py-3">
            <div className="py-5 flex flex-col gap-2">
              <label className={styles.label}>Birthday</label>
              <button
                onClick={() => setShowDatePicker(true)}
                className="text-left"
              >
                {moment(formik.values.birthday).format("LL")}
              </button>
            </div>
          </section>
          <section className="px-7 py-3 bg-white">
            <div className="py-5 flex flex-col gap-2">
              <label className={styles.label}>Sex</label>
              <select
                name="sex"
                onChange={formik.handleChange}
                value={formik.values.sex}
                className={styles.dropdownItem}
                id="gender"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </section>
          <section className="px-7 py-3 bg-white">
            <label
              className={`${styles.label} uppercase font-medium mt-7 mb-4`}
            >
              Contact Information
            </label>
            <div className="py-5 flex flex-col gap-2">
              <label className={styles.label}>Mobile</label>
              <input
                className="border-0 px-0 outline-0"
                id="contact_number"
                name="contact_number"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.contact_number}
              />
            </div>
          </section>
          <section className="px-7 py-3 bg-white">
            <div className="py-5 flex flex-col gap-2">
              <label className={styles.label}>Email Address</label>
              <div className="opacity-50">{formik.values.email}</div>
            </div>
          </section>

          <section className="px-7 py-3 bg-white">
            <div className="py-5 flex flex-col gap-2">
              <label className={styles.label}>Address</label>
              <textarea
                id="address"
                name="address"
                rows={7}
                onChange={formik.handleChange}
                value={formik.values.address}
                className="border-0 px-0"
              />
            </div>
          </section>
        </section>
      </Layout>
    </>
  );
}

type Month =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

const months: Month[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dates = Array.from({ length: 31 }, (_, i) => i + 1);
const years = Array.from({ length: 2000 }, (_, i) => 1800 + i);

type DateValue = {
  month: Month;
  date: number;
  year: number;
  monthIndex: number;
};

type DatePickerProps = {
  onConfirm: (value: DateValue) => void;
  onClose: () => void;
};

function DatePicker(props: { isVisible: boolean } & DatePickerProps) {
  if (props.isVisible) {
    return <Picker onConfirm={props.onConfirm} onClose={props.onClose} />;
  }

  return null;
}

function Picker(props: DatePickerProps) {
  const [value, setValue] = useState({
    month: months[new Date().getMonth()],
    date: new Date().getDate(),
    year: new Date().getFullYear(),
    monthIndex: new Date().getMonth(),
  });

  const handleScrollDebounced = debounce((e) => {
    const scrollTop = e.target?.scrollTop;
    const optionEl = e?.target?.children?.[1];

    const elIndex = Math.floor(scrollTop / optionEl.offsetHeight);
    const maxIndex = e?.target?.children?.length - 3; // -3 because of the first and last element

    const centerEl = e?.target?.children?.[elIndex + 1];

    let selectedEl: HTMLElement;

    if (elIndex >= maxIndex) {
      const lastEl = e?.target?.children?.[e?.target?.children?.length - 2];
      selectedEl = lastEl;
    } else {
      selectedEl = centerEl;
    }

    selectedEl?.scrollIntoView({ behavior: "smooth", block: "center" });

    const children = e?.target?.children;
    Array.from(children).forEach((el: any) => {
      if (el === selectedEl) return; // skip selected element (to avoid unnecessary re-rendering
      el?.classList.remove("text-gray-800");
      el?.classList.add("text-gray-400");
    });

    // apply styles to selected element
    selectedEl?.classList.remove("text-gray-400");
    selectedEl?.classList.add("text-gray-800");

    // apply values
    const key = e.target.id.split("-container").join("");

    const payload = {
      [key]: selectedEl?.innerText,
    };

    if (key === "month") {
      (payload as any).monthIndex = months.indexOf(
        selectedEl?.innerText as Month
      );
    }

    setValue((prev) => ({ ...prev, ...payload }));
  }, 300);

  function handleConfirm() {
    props.onConfirm?.(value);
    props?.onClose?.();
  }

  // add scroll event
  useEffect(() => {
    const containers = ["month", "date", "year"];
    containers.forEach((key) => {
      const element = document.getElementById(`${key}-container`);
      element?.addEventListener("scroll", handleScrollDebounced);
    });
  }, []);

  // initialize height
  useEffect(() => {
    const datePickerEl = document.getElementById("date-picker");
    if (datePickerEl) {
      datePickerEl.style.height = `${window.innerHeight / 2.5}px`;
    }
  }, []);

  // initialize view
  useEffect(() => {
    const defaultMonth = months[new Date().getMonth()];
    const monthEl = document.getElementById("month-container");

    for (let i = 0; i < months.length; i++) {
      const month = months[i];
      if (month === defaultMonth) {
        monthEl?.children[i + 1].scrollIntoView({ block: "center" });
        monthEl?.children[i + 1].classList.add("text-gray-800");
        break;
      }
    }

    const dateEl = document.getElementById("date-container");
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      if (date === new Date().getDate()) {
        dateEl?.children[i + 1].scrollIntoView({ block: "center" });
        dateEl?.children[i + 1].classList.add("text-gray-800");
        break;
      }
    }

    const yearEl = document.getElementById("year-container");
    for (let i = 0; i < years.length; i++) {
      const year = years[i];
      if (year === new Date().getFullYear()) {
        yearEl?.children[i + 1].scrollIntoView({ block: "center" });
        yearEl?.children[i + 1].classList.add("text-gray-800");
        break;
      }
    }
  }, []);

  return (
    <div
      style={{
        zIndex: 200,
      }}
      className="fixed h-screen w-screen top-0 left-0 bg-black bg-opacity-50 flex flex-col justify-end"
    >
      <div className="flex items-center p-5 bg-[#F8F8F9] rounded-t-2xl border-[#EBEAED] border-b">
        <button onClick={() => props?.onClose()} className="text-gray-400">
          Cancel
        </button>
        <div className="grow text-center font-medium">Select Date</div>
        <button onClick={handleConfirm} className="text-[#6474dc]">
          Confirm
        </button>
      </div>
      <div className="bg-[#F8F8F9]">
        <div
          id="date-picker"
          className={`relative w-screen flex justify-center gap-4 ml-[-28px]`}
        >
          <div
            id="month-container"
            className="month overflow-y-auto hide-scrollbar hide-scrollbar-webkit"
          >
            <div className="h-[50%]" />
            {months.map((m, i) => {
              return (
                <div
                  className="py-2 text-gray-400 text-xl text-right"
                  key={m}
                  id={`month-${i}`}
                >
                  {m}
                </div>
              );
            })}
            <div className="h-[50%]" />
          </div>
          <div
            id="date-container"
            className="date overflow-y-auto hide-scrollbar hide-scrollbar-webkit px-4"
          >
            <div className="h-[50%]" />
            {dates.map((d) => {
              return (
                <div className="py-2 text-gray-400 text-center text-xl" key={d}>
                  {d}
                </div>
              );
            })}
            <div className="h-[50%]" />
          </div>
          <div
            id="year-container"
            className="year overflow-y-auto hide-scrollbar hide-scrollbar-webkit"
          >
            <div className="h-[50%]" />
            {years.map((y) => {
              return (
                <div className="py-2 text-gray-400 text-xl" key={y}>
                  {y}
                </div>
              );
            })}
            <div className="h-[50%]" />
          </div>
          <div
            id="select-area"
            className={`h-[60px] w-full border-t border-b absolute border-[#EBEAED] top-0 bottom-0 my-auto pointer-events-none left-[28px]`}
          />
        </div>
      </div>
    </div>
  );
}
