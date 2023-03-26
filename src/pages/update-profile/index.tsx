import Layout from '@/components/templates/Layout'
import styles from "./update-profile.module.scss";
import Head from 'next/head'
import React, { useState } from 'react'
import { useGetProfile } from '@/lib/queries';

export default function index() {

    const { data: profile } = useGetProfile();

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthday, setBirthday] = useState("")
    const [gender, setGender] = useState("")
    const [contact, setContact] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")

    const handleUpdate =  () => {
        
    }

    return (
        <>
        <Head>
            <title>Disciplr</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Layout>
            <section className="px-7 grow overflow-y-auto h-full">
                <div className="flex justify-center py-5 mb-4">
                    <div  className="w-[100px] h-[100px] bg-gray-100 rounded-full flex justify-center items-center text-4xl font-bold text-slate-700">
                        -
                    </div>
                </div>
                <label className={`${styles.label} uppercase font-medium`}>
                General Information
                </label>
                <div className="py-5 flex flex-col gap-2">
                    <label className={styles.label}>
                            First Name
                    </label>
                    <input 
                        className={styles.input} 
                        type="text" placeholder={profile?.first_name ?? "First Name"}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="py-5 flex flex-col gap-2">
                    <label className={styles.label}>
                            Last Name
                    </label>
                    <input 
                        className={styles.input} 
                        type="text" placeholder={profile?.last_name ?? "Last Name"}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="py-5 flex flex-col gap-2">
                    <label className={styles.label}>Birthday</label>
                    <input 
                        className={styles.input} 
                        type="date" 
                        placeholder={profile?.birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                </div>
                <div className="py-5 flex flex-col gap-2">
                    <label className={styles.label}>Gender</label>
                    <select className={styles.dropdownItem} id="gender">
                        <option value="">{profile?.gender ?? "-Select-"}</option>
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
                        className={styles.input} 
                        type="text" 
                        placeholder={profile?.contact_number ?? "Contact Number"} 
                        onChange={(e) => setContact( e.target.value )}
                    />
                </div>
                <div className="py-5 flex flex-col gap-2">
                    <label className={styles.label}>Email Address</label>
                    <input 
                        className={styles.input} 
                        type="email" 
                        placeholder={profile?.email ?? "Email Address"}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="py-5 flex flex-col gap-2">
                    <label className={styles.label}>Address</label>
                    <input 
                        className={styles.input} 
                        type="text" 
                        placeholder={profile?.address ?? "Adress"} 
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <button 
                    onClick={handleUpdate}
                    className="py-3 px-12 rounded-md bg-[#554AF0] text-white"
                    >
                    Update
                </button>
            </section>   
        </Layout>
    </>
    )
}
