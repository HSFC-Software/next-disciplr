import Layout from '@/components/templates/Layout'
import styles from "./update-profile.module.scss";
import Head from 'next/head'
import React, { useState } from 'react'

export default function index() {

    const [firstname, setFirstName] = useState("")
    const [birthday, setBirthday] = useState("")
    const [gender, setGender] = useState("")
    const [mobile, setMobile] = useState("")
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
                            Name
                    </label>
                    <input className={styles.input} type="text" placeholder='Full Name' />
                </div>
                <div className="py-5 flex flex-col gap-2">
                    <label className={styles.label}>Birthday</label>
                    <input className={styles.input} type="date" />
                </div>
                <div className="py-5 flex flex-col gap-2">
                    <label className={styles.label}>Gender</label>
                    <select className={styles.dropdownItem} id="gender">
                        <option value="">-Select-</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <label className={`${styles.label} uppercase font-medium mt-7`}>
                Contact Information
                </label>
                <div className="py-5 flex flex-col gap-2">
                    <label className={styles.label}>Mobile</label>
                    <input className={styles.input} type="text" placeholder='Mobile Number' />
                </div>
                <div className="py-5 flex flex-col gap-2">
                    <label className={styles.label}>Email Address</label>
                    <input className={styles.input} type="email" placeholder='Email Adress'/>
                </div>
                <div className="py-5 flex flex-col gap-2">
                    <label className={styles.label}>Address</label>
                    <input className={styles.input} type="text" placeholder='Address' />
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
