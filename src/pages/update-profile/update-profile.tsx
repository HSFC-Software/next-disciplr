import Layout from "@/components/templates/page";
import styles from "./update-profile.module.scss";
import Head from "next/head";
import React from "react";
import { useGetProfile } from "@/lib/queries";
import Header from "@/components/base/header";
import { useFormik } from "formik";
import { Profile } from "@/types/profile";
import { useUpdateUser } from "@/lib/mutations";
import { UpdateUserPaypload } from "@/lib/api";
import { useSelector } from "react-redux";
import { State } from "@/lib/models";

export default function UpdateProfile() {
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
        <Header>
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
        <section className="px-7 grow overflow-y-auto h-full">
          <div className="flex justify-center py-5 mb-4">
            <div className="w-[100px] h-[100px] bg-gray-100 rounded-full flex justify-center items-center text-4xl font-bold text-slate-700">
              {initials}
            </div>
          </div>
          <label className={`${styles.label} uppercase font-medium`}>
            General Information
          </label>
          <div className="py-5 flex flex-col gap-2">
            <label className={styles.label}>Name</label>
            <input
              className="border-0 px-0 outline-0"
              id="first_name"
              name="first_name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.first_name}
              placeholder="First Name"
            />
          </div>
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
          <div className="py-5 flex flex-col gap-2">
            <label className={styles.label}>Birthday</label>
            <div className="relative items-center flex">
              <input
                className="border-0 text-white w-full outline-0 select-none"
                id="birthday"
                name="birthday"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.birthday}
              />
              <div className="absolute left-0">{formik.values.birthday}</div>
            </div>
          </div>
          <div className="py-5 flex flex-col gap-2">
            <label className={styles.label}>Gender</label>
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

          <label className={`${styles.label} uppercase font-medium mt-7`}>
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
          <div className="py-5 flex flex-col gap-2">
            <label className={styles.label}>Email Address</label>
            <input
              className="border-0 px-0 outline-0"
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
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
      </Layout>
    </>
  );
}
