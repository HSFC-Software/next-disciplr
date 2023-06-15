import Layout from "@/components/templates/page";
import styles from "./update-profile.module.scss";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useGetProfileById } from "@/lib/queries";
import Header from "@/components/base/header";
import { useFormik } from "formik";
import { Profile } from "@/types/profile";
import { useUpdateUser, useUpdateProfilePicture } from "@/lib/mutations";
import { UpdateUserPaypload } from "@/lib/api";
import { useSelector } from "react-redux";
import { State } from "@/lib/models";
import { useRouter } from "next/router";
import moment from "moment";
import DatePicker from "@/components/modules/datepicker";
import SelectPicker from "@/components/modules/selectpicker";
import { MdContentCopy } from "react-icons/md";
import { toast } from "react-toastify";
import Avatar from "@/components/base/avatar";
import { TiCamera } from "react-icons/ti";

export default function UpdateProfile() {
  const router = useRouter();
  const { id: profileId } = router.query;
  const { data: profile } = useGetProfileById(profileId as string);
  const { mutate: updateUser } = useUpdateUser();
  const id = useSelector((state: State) => state.Profile.updateReference);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSexPicker, setShowSexPicker] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const { mutate: updateProfilePicture, isLoading: isUploadingProfileImage } =
    useUpdateProfilePicture(profile?.id ?? "");

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
          toast("Changes successfuly applied 🎉", { autoClose: 1500 });
          // router.push(`/profile/${profileId}`)
        },
      });
    },
  });

  const handleUpdate = () => {
    formik.handleSubmit();
  };

  const handleCopyToClipBoard = (str: string) => {
    navigator.clipboard.writeText(str);
  };

  const handleCopySignInGoogle = () => {
    handleCopyToClipBoard("https://app.fishgen.org/sign-in?provider=google");
    toast("Copied to clipboard 📋 ", { autoClose: 500, hideProgressBar: true });
  };

  const handleCopySignUpEmailPassword = () => {
    handleCopyToClipBoard(
      `https://app.fishgen.org/sign-up?email=${profile?.email}`
    );
    toast("Copied to clipboard 📋 ", { autoClose: 500, hideProgressBar: true });
  };

  const handleChangeFile = (e: any) => {
    if (e?.target?.files?.length > 0) {
      setSelectedPhoto(e.target.files[0]);
      updateProfilePicture(e.target.files[0], {
        onSuccess() {
          // show success message
          setPreviewURL("");
        },
        onError() {
          // show error message
          setSelectedPhoto(null);
          setPreviewURL("");
        },
        onSettled() {
          setSelectedPhoto(null);
        },
      });
    }
  };

  useEffect(() => {
    if (selectedPhoto) {
      setPreviewURL(URL.createObjectURL(selectedPhoto!));
    }
  }, [selectedPhoto]);

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
            <button onClick={handleUpdate} className="text-base text-[#6e7ac5]">
              Save
            </button>
          </div>
        </Header>
        <SelectPicker
          label="Sex"
          isVisible={showSexPicker}
          value={formik.values.sex}
          onConfirm={(value) => {
            formik.setFieldValue("sex", value);
          }}
          onClose={() => setShowSexPicker(false)}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </SelectPicker>
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
            <div className="relative">
              <span
                className={`${
                  (!!previewURL || isUploadingProfileImage) && "opacity-60"
                }`}
              >
                <Avatar
                  id={profileId as string}
                  size={101}
                  fontSize="text-4xl"
                />
              </span>
              <div className="absolute right-0 bottom-0 mr-[-8px]">
                <button
                  onClick={() =>
                    document.getElementById("profile-photo")?.click?.()
                  }
                  className="text-2xl bg-gray-300 p-2 rounded-full"
                >
                  <TiCamera />
                </button>
                <input
                  onChange={handleChangeFile}
                  id="profile-photo"
                  className="hidden"
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                />
              </div>
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
                className={`text-left text-2xl ${styles.input}`}
              >
                {formik.values.birthday ? (
                  <>{moment(formik.values.birthday).format("LL")}</>
                ) : (
                  <span className="opacity-50">Tap to enter birthday</span>
                )}
              </button>
            </div>
          </section>
          <section className="px-7 py-3">
            <label className={styles.label}>Sex</label>
            <button
              onClick={() => setShowSexPicker(true)}
              className={`text-left text-2xl ${styles.input}`}
            >
              {formik.values.sex ? (
                <>{formik.values.sex}</>
              ) : (
                <span className="opacity-50">Tap to Select</span>
              )}
            </button>
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
                placeholder="Enter Mobile Number"
              />
            </div>
          </section>
          {/* <section className="px-7 py-3 bg-white">
            <div className="py-5 flex flex-col gap-2">
              <label className={styles.label}>Email Address</label>
              <div className="opacity-50">{formik.values.email}</div>
            </div>
          </section> */}

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
          <section className="px-7 py-3 bg-white">
            <label className={`${styles.label} uppercase font-medium`}>
              Disciplr Account
            </label>
            <div className="py-5 flex flex-col gap-2">
              <label className={styles.label}>Email</label>
              <input
                className="border-0 px-0 outline-0"
                id="email"
                name="email"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="Enter email"
              />
            </div>
            {profile?.email && (
              <>
                <label className={styles.label}>Sign-in via google</label>
                <div className="flex justify-between items-center mt-2 text-[#6e7ac5]">
                  <div
                    onClick={handleCopySignInGoogle}
                    className="cursor-pointer"
                  >
                    https://app.fishgen.org/sign-in?provider=google
                  </div>
                  <button
                    onClick={handleCopySignInGoogle}
                    className="text-xl text-[#6e7ac5]"
                  >
                    <MdContentCopy />
                  </button>
                </div>
                <div className="mt-4" />
                <label className={styles.label}>
                  Sign-in via email and password
                </label>
                <div className="flex justify-between items-center mt-2 text-[#6e7ac5]">
                  <div
                    onClick={handleCopySignUpEmailPassword}
                    className="cursor-pointer"
                  >
                    https://app.fishgen.org/sign-up?email={profile?.email}
                  </div>
                  <button
                    onClick={handleCopySignUpEmailPassword}
                    className="text-xl text-[#6e7ac5]"
                  >
                    <MdContentCopy />
                  </button>
                </div>
              </>
            )}
          </section>
        </section>
      </Layout>
    </>
  );
}
