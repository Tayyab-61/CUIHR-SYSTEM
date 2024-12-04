'use client'
import React, { useState,useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Header from '@/app/Components/Header';
import { useRouter } from 'next/navigation';

function Page() {
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
                      router.push('/HRportal/SearchData');
                  }
              })
              .catch(() => router.push('/'));
      }
  }, [router]);
    const [employeeID, setEmployeeID] = useState('');
    const [employee, setEmployee] = useState({});
    const [contact, setContact] = useState({});
    const [employment, setEmployment] = useState({});
    const [education, setEducation] = useState({});
    const [other, setOther] = useState({});


    async function FindEmployeeId() {
       
        if (employeeID.trim() !== "") {
            await fetch('/api/updateEmployeeData', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ employeeID }),
            })
                .then((res) => res.json())
                .then(({ data }) => {
                    if (data === undefined) {
                        alert("This employee record does not exist");
                    } else {
                        const { employee, contact, employment, education, other } = data;

                        setEmployee(employee);
                        setContact(contact);
                        setEmployment(employment);
                        setEducation(education);
                        setOther(other);
                        alert("Data Retrieved Successfully");
                    }
                })
                .catch(() => console.log("Error fetching data"));
        } else {
            alert('Please enter employee ID');
        }
    }

    function downloadPDF() {
        const doc = new jsPDF();

        // Add Title
        doc.setFontSize(16);
        doc.text('Employee Data Report', 14, 10);

        // Add Tables for each section
        doc.autoTable({
            startY: 20,
            head: [['Field', 'Value']],
            body: Object.entries(employee).map(([key, value]) => [key, value || '']),
            theme: 'grid',
        });

        doc.autoTable({
            startY: doc.previousAutoTable.finalY + 10,
            head: [['Contact Field', 'Value']],
            body: Object.entries(contact).map(([key, value]) => [key, value || '']),
            theme: 'grid',
        });

        doc.autoTable({
            startY: doc.previousAutoTable.finalY + 10,
            head: [['Employment Field', 'Value']],
            body: Object.entries(employment).map(([key, value]) => [key, value || '']),
            theme: 'grid',
        });

        doc.autoTable({
            startY: doc.previousAutoTable.finalY + 10,
            head: [['Education Field', 'Value']],
            body: Object.entries(education).map(([key, value]) => [key, value || '']),
            theme: 'grid',
        });

        doc.autoTable({
            startY: doc.previousAutoTable.finalY + 10,
            head: [['Other Field', 'Value']],
            body: Object.entries(other).map(([key, value]) => [key, value || '']),
            theme: 'grid',
        });

        doc.save(`${employeeID}_employee_report.pdf`);
    }

    return (
        <>
        <Header/>
        <div className='container mx-auto p-4'>
            <div className='flex justify-center gap-4 items-center flex-col mt-5'>
                <div>
                    <label className='text-xl font-bold'>Search Employee ID</label>
                    <input
                        value={employeeID}
                        onChange={(e) => setEmployeeID(e.target.value)}
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64 ml-10 rounded-md border border-gray-400'
                        type='text'
                        placeholder='Enter employee ID'
                    />
                </div>
                <div>
                    <button
                        onClick={FindEmployeeId}
                        className='bg-green-500 p-2 text-xl w-40 rounded-lg cursor-pointer hover:bg-green-600'
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Display Data in Sections */}
            {employeeID && (
                <div className='mt-10'>
                    <h2 className='text-2xl font-bold mb-4'>Employee Details</h2>
                    <table className='table-auto w-full border border-gray-300 mb-6'>
                        <thead>
                            <tr className='bg-gray-200'>
                                <th className='border px-4 py-2'>Field</th>
                                <th className='border px-4 py-2'>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(employee).map(([key, value], index) => (
                                <tr key={index}>
                                    <td className='border px-4 py-2 capitalize'>{key}</td>
                                    <td className='border px-4 py-2'>{value || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h2 className='text-2xl font-bold mb-4'>Contact Details</h2>
                    <table className='table-auto w-full border border-gray-300 mb-6'>
                        <thead>
                            <tr className='bg-gray-200'>
                                <th className='border px-4 py-2'>Field</th>
                                <th className='border px-4 py-2'>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(contact).map(([key, value], index) => (
                                <tr key={index}>
                                    <td className='border px-4 py-2 capitalize'>{key}</td>
                                    <td className='border px-4 py-2'>{value || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h2 className='text-2xl font-bold mb-4'>Employment Details</h2>
                    <table className='table-auto w-full border border-gray-300 mb-6'>
                        <thead>
                            <tr className='bg-gray-200'>
                                <th className='border px-4 py-2'>Field</th>
                                <th className='border px-4 py-2'>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(employment).map(([key, value], index) => (
                                <tr key={index}>
                                    <td className='border px-4 py-2 capitalize'>{key}</td>
                                    <td className='border px-4 py-2'>{value || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h2 className='text-2xl font-bold mb-4'>Education Details</h2>
                    <table className='table-auto w-full border border-gray-300 mb-6'>
                        <thead>
                            <tr className='bg-gray-200'>
                                <th className='border px-4 py-2'>Field</th>
                                <th className='border px-4 py-2'>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(education).map(([key, value], index) => (
                                <tr key={index}>
                                    <td className='border px-4 py-2 capitalize'>{key}</td>
                                    <td className='border px-4 py-2'>{value || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h2 className='text-2xl font-bold mb-4'>Other Details</h2>
                    <table className='table-auto w-full border border-gray-300'>
                        <thead>
                            <tr className='bg-gray-200'>
                                <th className='border px-4 py-2'>Field</th>
                                <th className='border px-4 py-2'>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(other).map(([key, value], index) => (
                                <tr key={index}>
                                    <td className='border px-4 py-2 capitalize'>{key}</td>
                                    <td className='border px-4 py-2'>{value || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button
                        onClick={downloadPDF}
                        className='bg-blue-500 text-white mt-6 p-3 rounded-md hover:bg-blue-700'
                    >
                        Download as PDF
                    </button>
                </div>
            )}
        </div>
        </>
    );
}

export default Page;
