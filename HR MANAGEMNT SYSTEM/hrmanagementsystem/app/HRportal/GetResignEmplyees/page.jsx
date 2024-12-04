
'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

function page() {
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
                      router.push('/HRportal/GetResignEmplyees');
                  }
              })
              .catch(() => router.push('/'));
      }
  }, [router]);
    const [data, setData] = useState({
        personalData: [],
        contactData: [],
        educationData: [],
        employmentData: [],
        otherData: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch data from the backend API
        const fetchData = async () => {
            try {
                const response = await fetch('/api/GetResignEmployees');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p className="text-center text-xl">Loading...</p>;
    if (error) return <p className="text-red-500 text-center">Error: {error}</p>;
    const exportToExcel = () => {
        const workbook = XLSX.utils.book_new();
    
        // Define a function to format and add sheets
        const addSheet = (sheetData, sheetName) => {
            if (sheetData.length > 0) {
                const sheet = XLSX.utils.json_to_sheet(sheetData);
    
                // Make headers bold
                const range = XLSX.utils.decode_range(sheet['!ref']);
                for (let C = range.s.c; C <= range.e.c; ++C) {
                    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
                    if (!sheet[cellAddress]) continue;
                    sheet[cellAddress].s = {
                        font: { bold: true },
                    };
                }
    
                XLSX.utils.book_append_sheet(workbook, sheet, sheetName);
            }
        };
    
        // Add all sheets with formatted headers
        let sheetCount = 0; // Track the number of sheets added
        if (data.personalData.length) {
            addSheet(data.personalData, 'Personal Record');
            sheetCount++;
        }
        if (data.contactData.length) {
            addSheet(data.contactData, 'Contact Record');
            sheetCount++;
        }
        if (data.educationData.length) {
            addSheet(data.educationData, 'Education Record');
            sheetCount++;
        }
        if (data.employmentData.length) {
            addSheet(data.employmentData, 'Employment Record');
            sheetCount++;
        }
        if (data.otherData.length) {
            addSheet(data.otherData, 'Other Record');
            sheetCount++;
        }
    
        // If no sheets were added, create a default sheet
        if (sheetCount === 0) {
            const defaultSheet = XLSX.utils.aoa_to_sheet([['No data available']]);
            XLSX.utils.book_append_sheet(workbook, defaultSheet, 'No Data');
        }
    
        // Export the workbook
        try {
            XLSX.writeFile(workbook, 'FacultyDetails.xlsx');
        } catch (err) {
            console.error('Error exporting Excel file:', err.message);
            alert('Unable to export Excel file. Please try again.');
        }
    };
    
    return (
        <div className="p-6">
            <h1 className="text-3xl text-center font-bold mb-4">Resigned/Terminate Employees</h1>

            {/* Employee Personal Data */}
            <h2 className="text-xl font-semibold mt-6 mb-2">Personal Record</h2>
            <table className="min-w-full border border-gray-300 rounded-lg text-sm overflow-hidden">
                <thead className="bg-gray-200 ">
                    <tr>
                        <th className="px-4 py-2 text-left">Employee ID</th>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Father Name</th>
                        <th className="px-4 py-2 text-left">Relegion</th>
                        <th className="px-4 py-2 text-left">Gender</th>
                        <th className="px-4 py-2 text-left">Date of Birth</th>
                        <th className="px-4 py-2 text-left">Blood Group</th>
                        <th className="px-4 py-2 text-left">Disability</th>
                        <th className="px-4 py-2 text-left">Martial Status</th>
                        <th className="px-4 py-2 text-left">Domicile</th>
                        <th className="px-4 py-2 text-left">Province</th>
                        <th className="px-4 py-2 text-left">Nationality</th>
                        <th className="px-4 py-2 text-left">Spouse Name</th>
                        <th className="px-4 py-2 text-left">Spouse Cnic</th>
                        <th className="px-4 py-2 text-left">Spouse Nationality</th>
                        <th className="px-4 py-2 text-left">Spouse Nomination</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {data.personalData.map((row) => (
                        <tr key={row.employeeID} className="hover:bg-gray-100">
                            <td className="border px-4 py-2">{row.employeeID}</td>
                            <td className="border px-4 py-2">{row.name}</td>
                            <td className="border px-4 py-2">{row.fatherName}</td>
                            <td className="border px-4 py-2">{row.religion}</td>
                            <td className="border px-4 py-2">{row.gender}</td>
                            <td className="border px-4 py-2">{row.dob}</td>
                            <td className="border px-4 py-2">{row.bloodGroup}</td>
                            <td className="border px-4 py-2">{row.disabilityStatus}</td>
                            <td className="border px-4 py-2">{row.maritalStatus}</td>
                            <td className="border px-4 py-2">{row.domicile}</td>
                            <td className="border px-4 py-2">{row.province}</td>
                            <td className="border px-4 py-2">{row.nationality}</td>
                            <td className="border px-4 py-2">{row.spouseName}</td>
                            <td className="border px-4 py-2">{row.spouseCnic}</td>
                            <td className="border px-4 py-2">{row.spouseNationality}</td>
                            <td className="border px-4 py-2">{row.nomination}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Employee Contact Data */}
            <h2 className="text-xl font-semibold mt-6 mb-2">Contact Record</h2>
            <table className="min-w-full border border-gray-300 rounded-lg text-sm overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2 text-left">Employee ID</th>
                        <th className="px-4 py-2 text-left">Contact No</th>
                        <th className="px-4 py-2 text-left">CNIC</th>
                        <th className="px-4 py-2 text-left">Email Address</th>
                        <th className="px-4 py-2 text-left">Mailing Address</th>
                        <th className="px-4 py-2 text-left">Permanent Address</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {data.contactData.map((row) => (
                        <tr key={row.employeeID} className="hover:bg-gray-100">
                            <td className="border px-4 py-2">{row.employeeID}</td>
                            <td className="border px-4 py-2">{row.contactNo}</td>
                            <td className="border px-4 py-2">{row.cnic}</td>
                            <td className="border px-4 py-2">{row.emailId}</td>
                            <td className="border px-4 py-2">{row.mailingAddress}</td>
                            <td className="border px-4 py-2">{row.permanentAddress}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
             {/* Employment Data */}
             <h2 className="text-xl font-semibold mt-6 mb-2">Employment Record</h2>
            <table className="min-w-full border border-gray-300 text-sm rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2 text-left">Employee ID</th>
                        <th className="px-4 py-2 text-left">Designation</th>
                        <th className="px-4 py-2 text-left">Scale</th>
                        <th className="px-4 py-2 text-left">Grade</th>
                        <th className="px-4 py-2 text-left">Department</th>
                        <th className="px-4 py-2 text-left">Appointment Through</th>
                        <th className="px-4 py-2 text-left">Time Scale</th>
                        <th className="px-4 py-2 text-left">Promotion Date</th>
                        <th className="px-4 py-2 text-left">Selection Board</th>
                        <th className="px-4 py-2 text-left">Date of Joining</th>
                        <th className="px-4 py-2 text-left">Current Experience</th>
                        <th className="px-4 py-2 text-left">Previous Experience</th>
                        <th className="px-4 py-2 text-left">Contract Expiry Date</th>
                        <th className="px-4 py-2 text-left">Current Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {data.employmentData.map((row) => (
                        <tr key={row.employeeID} className="hover:bg-gray-100">
                            <td className="border px-4 py-2">{row.employeeID}</td>
                            <td className="border px-4 py-2">{row.designation}</td>
                            <td className="border px-4 py-2">{row.scale}</td>
                            <td className="border px-4 py-2">{row.grade}</td>
                            <td className="border px-4 py-2">{row.department}</td>
                            <td className="border px-4 py-2">{row.appointmentThrough}</td>
                            <td className="border px-4 py-2">{row.timeScale}</td>
                            <td className="border px-4 py-2">{row.promotionDates}</td>
                            <td className="border px-4 py-2">{row.selectionBoard}</td>
                            <td className="border px-4 py-2">{row.dateOfJoining}</td>
                            <td className="border px-4 py-2">{row.currentExperience}</td>
                            <td className="border px-4 py-2">{row.previousExperience}</td>
                            <td className="border px-4 py-2">{row.contractExpiryDate}</td>
                            <td className="border px-4 py-2">{row.currentStatus}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Education Data */}
            <h2 className="text-xl font-semibold mt-6 mb-2">Education Record</h2>
            <table className="min-w-full border border-gray-300 text-sm rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2 text-left">Employee ID</th>
                        <th className="px- 4 py-2 text-left">Last Qualification</th>
                        <th className="px-4 py-2 text-left">Subject</th>
                        <th className="px-4 py-2 text-left">Passing Year</th>
                        <th className="px-4 py-2 text-left">Board/University</th>
                        <th className="px-4 py-2 text-left">Country</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {data.educationData.map((row) => (
                        <tr key={row.employeeID} className="hover:bg-gray-100">
                            <td className="border px-4 py-2">{row.employeeID}</td>
                            <td className="border px-4 py-2">{row.lastQualification}</td>
                            <td className="border px-4 py-2">{row.subject}</td>
                            <td className="border px-4 py-2">{row.passingYear}</td>
                            <td className="border px-4 py-2">{row.boardUniversity}</td>
                            <td className="border px-4 py-2">{row.country}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

           

            {/* Other Data */}
            <h2 className="text-xl font-semibold tet mt-6 mb-2">Other Record</h2>
            <table className="min-w-full border border-gray-300 text-sm rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2 text-left">Employee ID</th>
                        <th className="px-4 py-2 text-left">Degree Verification Status</th>
                        <th className="px-4 py-2 text-left">TTS Endorsement Status</th>
                        <th className="px-4 py-2 text-left">DTRC Midterm</th>
                        <th className="px-4 py-2 text-left">DTRC Final</th>
                        <th className="px-4 py-2 text-left">TRP Status</th>
                        <th className="px-4 py-2 text-left">Final Remarks</th>
                        
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {data.otherData.map((row) => (
                        <tr key={row.employeeID} className="hover:bg-gray-100">
                            <td className="border px-4 py-2">{row.employeeID}</td>
                            <td className="border px-4 py-2">{row.degreeVerificationStatus}</td>
                            <td className="border px-4 py-2">{row.ttsEndorsementStatus}</td>
                            <td className="border px-4 py-2">{row.dtrcMidterm}</td>
                            <td className="border px-4 py-2">{row.dtrcFinal}</td>
                            <td className="border px-4 py-2">{row.trpStatus}</td>
                            <td className="border px-4 py-2">{row.finalRemarks}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                onClick={exportToExcel}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
                Export to Excel
            </button>               
        </div>
    );
}

export default page