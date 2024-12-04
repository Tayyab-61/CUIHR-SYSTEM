'use client'
import { useEffect } from "react";
import React from 'react'
import Header from "../Components/Header";
import HrPortalDashboard from '../Components/HrPortalDashboard';
import { useRouter } from 'next/navigation';


function  page() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
        router.push('/'); // Redirect to login if no token
    } else {
        // Optionally verify the token with the backend
        fetch('/api/verifyOtp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                if (res.status !== 200) {
                    router.push('/HRportal');
                }
            })
            .catch(() => router.push('/'));
    }
}, [router]);

  // useEffect(() => {
  //     const token = document.cookie.split('; ').find(row => row.startsWith('super'));
  //     if (!token) router.push('/'); // Redirect to login if no token
  // }, []);
  return (
    <>
    <div className=" loginscreen absolute inset-0 bg-cover bg-blue-500 bg-center ring-opacity-85 "></div>
   
   <div className=" w-full h-full  relative z-10     ">
   <Header/>
   <div className='Hr-potal-div'>
   <HrPortalDashboard/>
   </div>
   
 
   </div>
   </>
  )
}

export default page