import React from 'react'
import { IoPersonAdd } from "react-icons/io5";
import { GrDocumentUpdate } from "react-icons/gr";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { BsPersonWalking } from "react-icons/bs";
import { PiStudentBold } from "react-icons/pi";
import { BsPersonFillX } from "react-icons/bs";
import { BsPersonDashFill } from "react-icons/bs";
import { GiTeacher } from "react-icons/gi";
import { FaUsersGear } from "react-icons/fa6";
import { TbReportSearch } from "react-icons/tb";

import Link from 'next/link';
function HrPortalDashboard() {
    return (
        <>
            <div className=' flex p-5 md:p-5 justify-center flex-wrap-reverse gap-y-10 gap-x-24'>
                <div className='Emplyee-Summary flex-3 backdrop-blur-3xl  p-5 rounded-lg border-2 border-white ' >

                    <h2 className='font-thin text-2xl font-serif'>Employee Summary</h2>
                    <br />
                    <label className='mr-12 text-xl'>Total Faculty</label>
                    <label className=' text-xl'>556</label>
                    <br />
                    <br />
                    <label className='mr-12 text-xl'>Total Faculty</label>
                    <label className=' text-xl'>556</label>
                    <br />
                    <br />
                    <label className='mr-12 text-xl'>Total Faculty</label>
                    <label className=' text-xl'>556</label>
                    <br />
                    <br />
                    <label className='mr-12 text-xl'>Total Faculty</label>
                    <label className=' text-xl'>556</label>
                    <br />
                    <br />
                    <label className='mr-12 text-xl'>Total Faculty</label>
                    <label className=' text-xl'>556</label>

                </div>
                <div className='flex-1 parent-cards-child-div '>
                    <h2 className=' text-xl text-white font-bold text-center  sm:text-3xl font-serif '>THE CUI HR PORTAL ATTOCK</h2>
                    <div className='  flex justify-center md:justify-start gap-x-6 gap-y-6 sm::gap-x-12 sm:gap-y-10 mt-5 flex-wrap'>
                        <Link href={'/HRportal/AddData'}>
                        <div className=' cards w-28 h-28 bg-white rounded-2xl text-center p-5 items-center flex  flex-col '>
                            <div>
                                <IoPersonAdd size={40} />
                            </div>

                            <div>
                                <h1 className=' text-sm font-serif text-balance'>Add Faculty</h1>
                            </div>

                        </div>
                        </Link>
                        <Link href={'/HRportal/UpdateData'}>
                        
                        <div className='cards w-28 h-28 bg-white rounded-2xl text-center p-5 items-center flex  flex-col '>
                            <div>
                            <GrDocumentUpdate size={40} />
                            </div>

                            <div>
                                <h1 className=' text-sm font-serif text-balance'>Update Faculty</h1>
                            </div>

                        </div> 
                        </Link>
                        <Link href={'/HRportal/GetAllData'}>
                       
                        <div className='cards w-28 h-28 bg-white rounded-2xl text-center p-5 items-center flex  flex-col '>
                            <div>
                                <GiTeacher size={40} />
                            </div>

                            <div>
                                <h1 className=' text-sm font-serif text-balance'>All Employers</h1>
                            </div>

                        </div>
                        </Link>
                        <Link href={'/HRportal/GetFacultyData'}>

                     
                        
                         <div className='cards w-28 h-28 bg-white rounded-2xl text-center p-5 items-center flex  flex-col '>
                            <div>
                            <BsPersonWalking size={40} />
                            </div>

                            <div>
                                <h1 className=' text-sm font-serif text-balance'>Faculty</h1>
                            </div>

                        </div>
                        </Link>
                        <Link href={'/HRportal/GetNonFacultyData'}>
                        
                        <div className='cards w-28 h-28 bg-white rounded-2xl text-center p-5 items-center flex  flex-col '>
                            <div>
                            <PiStudentBold size={40} />
                            </div>

                            <div>
                                <h1 className=' text-sm font-serif text-balance'>Non Faculty</h1>
                            </div>

                        </div>
                        </Link>
                        <Link href={'/HRportal/GetSGStaff'}>
                          <div className='cards w-28 h-28 bg-white rounded-2xl text-center p-5 items-center flex  flex-col '>
                            <div>
                            <FaUsersGear size={40} />
                            </div>

                            <div>
                                <h1 className=' text-sm font-serif text-balance'>SG STAFF</h1>
                            </div>
                           
                        </div>
                        </Link>
                        <Link href={'/HRportal/GetOnDutyEmplyees'}>
                        <div className='cards w-28 h-28 bg-white rounded-2xl text-center p-5 items-center flex  flex-col '>
                            <div>
                            <FaPersonCircleCheck size={40} />
                            </div>

                            <div>
                                <h1 className=' text-sm font-serif text-balance'>On Duty Employess</h1>
                            </div>

                        </div> 
                        </Link>
                        <Link href={'/HRportal/GetOnLeaveEmplyees'}>
                        <div className=' cards w-28 h-28 bg-white rounded-2xl text-center p-5 items-center flex  flex-col '>
                            <div>
                            <BsPersonDashFill size={40} />

                            </div>

                            <div>
                                <h1 className=' text-sm font-serif text-balance'>On Leave Employees</h1>
                            </div>

                        </div>
                        </Link>
                        <Link href={'/HRportal/GetResignEmplyees'}>
                        <div className=' cards w-28 h-28 bg-white rounded-2xl text-center p-5 items-center flex  flex-col '>
                            <div>
                            <BsPersonFillX size={40} />
                            </div>

                            <div>
                                <h1 className=' text-sm font-serif text-balance'>Resigned  Terminate </h1>
                            </div>

                        </div>
                        </Link>
                        <Link href={'/HRportal/SearchData'}>
                        <div className=' cards w-28 h-28 bg-white rounded-2xl text-center p-5 items-center flex  flex-col '>
                            <div>
                            <TbReportSearch size={40}/>
                            </div>

                            <div>
                                <h1 className=' text-sm font-serif text-balance'>Generate Report</h1>
                            </div>

                        </div>
                        </Link>
                       

                    </div>
                </div>

            </div>
        </>
    )
}

export default HrPortalDashboard