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

let now = new Date();
export default function UpdateProfile() {
  const router = useRouter();
  const { data: profile } = useGetProfile();
  const { mutate: updateUser } = useUpdateUser();
  const id = useSelector((state: State) => state.Profile.updateReference);

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
      <Layout>
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
          <div className="border-b" />
          <section className="px-7 py-3">
            <div className="py-5 flex flex-col gap-2">
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
          <div className="border-b" />
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
              />
            </div>
          </section>
          <div className="border-b" />
          <section className="px-7 py-3">
            <div className="py-5 flex flex-col gap-2">
              <label className={styles.label}>Birthday</label>
              <div className="relative items-center flex">
                {/* <input
                  className="border-0 text-white w-full outline-0 select-none"
                  id="birthday"
                  name="birthday"
                  type="date"
                  onChange={formik.handleChange}
                  value={formik.values.birthday}
                /> */}
                {/* <div className="absolute left-0">{formik.values.birthday}</div> */}
              </div>
            </div>
          </section>
          <div className="border-b" />
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
          <div className="border-b" />
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
          <div className="border-b" />
          <section className="px-7 py-3 bg-white">
            <div className="py-5 flex flex-col gap-2">
              <label className={styles.label}>Email Address</label>
              <div className="opacity-50">{formik.values.email}</div>
            </div>
          </section>
          <div className="border-b" />

          <section className="px-7 py-3 bg-white">
            <div className="py-5 flex flex-col gap-2">
              <label className={styles.label}>Address</label>
              <textarea
                id="address"
                name="address"
                rows={7}
                onChange={formik.handleChange}
                value={formik.values.address}
              />
            </div>
          </section>
        </section>
        <DatePicker />
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
const years = Array.from({ length: 100 }, (_, i) => 2000 + i);

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

  selectedEl.scrollIntoView({ behavior: "smooth", block: "center" });

  const children = e?.target?.children;
  Array.from(children).forEach((el: any) => {
    if (el === selectedEl) return; // skip selected element (to avoid unnecessary re-rendering
    el?.classList.remove("text-gray-800");
    el?.classList.add("text-gray-400");
  });

  // apply styles to selected element
  selectedEl.classList.remove("text-gray-400");
  selectedEl.classList.add("text-gray-800");
}, 300);

function DatePicker(props: { minDate?: Date; maxDate?: Date }) {
  const [month, setMonth] = useState<Month | null>(null);
  const [date, setDate] = useState<number | null>(null);
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    const containers = ["month", "dates", "years"];
    containers.forEach((key) => {
      const element = document.getElementById(`${key}-container`);
      element?.addEventListener("scroll", handleScrollDebounced);
    });
  }, []);

  return (
    <div
      style={{
        zIndex: 200,
      }}
      id="date-picker"
      className="fixed bottom-0 bg-[#F8F8F9] w-screen h-[30%] flex justify-center gap-4"
    >
      <div
        id="month-container"
        className="month overflow-y-auto hide-scrollbar hide-scrollbar-webkit"
      >
        <div className="h-[50%]" />
        {months.map((m, i) => {
          return (
            <div
              className="py-2 text-gray-400 text-xl"
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
        id="dates-container"
        className="date overflow-y-auto hide-scrollbar hide-scrollbar-webkit"
      >
        <div className="h-[50%]" />
        {dates.map((d) => {
          return (
            <div className="py-2 text-gray-400 text-xl" key={d}>
              {d}
            </div>
          );
        })}
        <div className="h-[50%]" />
      </div>
      <div
        id="years-container"
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
        className="h-[60px] w-full border-t border-b absolute border-[#EBEAED] top-0 bottom-0 my-auto pointer-events-none"
      />
    </div>
  );
}
