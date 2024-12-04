'use client'
import Header from '@/app/Components/Header'
import { useRouter } from 'next/navigation';
import React, { useState,useEffect } from 'react'

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
                      router.push('/HRportal/UpdateData');
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
    const handleEmployeeChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleContactChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleEmploymentChange = (e) => {
        setEmployment({ ...employment, [e.target.name]: e.target.value });
    };

    const handleEducationChange = (e) => {
        setEducation({ ...education, [e.target.name]: e.target.value });
    };

    const handleOtherChange = (e) => {
        setOther({ ...other, [e.target.name]: e.target.value });
    };
    async function DeleteEmployeeData() {
        
    
        if (!employeeID || typeof employeeID !== 'string') {
            return alert("Enter a valid Employee ID");
        }
    
        try {
            const response = await fetch('/api/updateEmployeeData', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ employeeID }), // Wrap employeeID in an object
            });
    
            const result = await response.json();
            if (response.ok) {
                alert('Employee deleted successfully');
            } else {
                alert('Error: ' + result.message);
            }
        } catch (err) {
            console.error("Error:", err);
            alert('An error occurred.');
        }
    }
    async function FindEmployeeId() {
        if (employeeID.trim() != "") {
            await fetch('/api/updateEmployeeData', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ employeeID }),
            })
                .then((res) => res.json())
                .then(({ data }) => {
                    if(data===undefined){
                       return alert("This employee Record is not exist")
                    }
                    else{
                        const { employee, contact, employment, education, other } = data;

                        setEmployee(employee);
                        setContact(contact);
                        setEmployment(employment);
                        setEducation(education);
                        setOther(other)
                        return alert("Data Reterive Successfully");
                    }
                    
                })
                .catch((err) => console.log("Error fetching data:", ));

           

        } else {
            alert('Please enter employee id')

        }
    }
    async function updateEmployeeData() {
        if (employeeID.trim() !== "") {
            const updatedData = {
                employeeID,
                employee,
                contact,
                employment,
                education,
                other,
            };
    
            try {
                const response = await fetch('/api/updateEmployeeData', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedData),
                });
    
                const result = await response.json();
                if (response.ok) {
                    alert('Data updated successfully');
                } else {
                    alert('Error updating data: ' + result.message);
                }
            } catch (err) {
                console.error("Error:", err);
                alert('An error occurred.');
            }
        } else {
            alert('Please enter employee ID');
        }
    }
    
    return (
        <>
            <Header />
            <div>
                <h1 className='text-3xl font-bold mt-6 text-center'>UPDATE OR DELETE RECORD HERE</h1>
                <div className=' flex justify-center gap-4 items-center flex-col mt-5'>
                    <div>
                        <label className='text-xl font-bold text-center'>Search Employee ID</label>
                        <input
                            value={employeeID}
                            onChange={(e) => setEmployeeID(e.target.value)}
                            className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64 ml-10'
                            type='text'
                            placeholder='Enter employee id' />
                    </div>
                    <div>
                        <button
                            onClick={FindEmployeeId}
                            className=' bg-green-500 p-2 text-xl w-40 rounded-lg cursor-pointer hover:bg-green-600 '
                        >Search</button>
                    </div>

                </div>

            </div>
            <h2 className='text-2xl font-semibold mt-2 ml-4 '>Employee Personal Detail</h2>
            <div className='flex flex-wrap  gap-x-8 gap-y-2 p-4 overflow-auto'>
               
                <div>
                    <label className='font-bold text-sm'>Name</label>
                    <br />
                    <input
                        type='text'
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                        name="name"
                        value={employee.name || ''}
                        onChange={handleEmployeeChange}

                    />

                </div>
                <div>
                    <label className='font-bold text-sm'>Father Name</label>
                    <br />
                    <input
                        type='text'
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                        name="fatherName"
                        value={employee.fatherName || ''}
                        onChange={handleEmployeeChange}
                    />

                </div>

                <div>
                    <label className='font-bold text-sm'>Religion</label>
                    <br />
                    <input
                        type='text'
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                        name="religion"
                        value={employee.religion || ''}
                        onChange={handleEmployeeChange}
                    />

                </div>
                <div>
                    <label className='font-bold text-sm'>Gender</label>
                    <br />
                    <input
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                        list="genderOptions"
                        id="gender"
                        name="gender"
                        value={employee.gender || ''}
                        onChange={handleEmployeeChange}
                        placeholder="Select or type..."
                    />
                    <datalist id="genderOptions">
                        <option value="Male" />
                        <option value="Female" />
                    </datalist>


                </div>
                <div>
                    <label className='font-bold text-sm'>Date of Birth</label>
                    <br />
                    <input
                        type='date'
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                        name="dob"
                        value={employee.dob || ''}
                        onChange={handleEmployeeChange}
                    />


                </div>
                <div>
                    <label className='font-bold text-sm'>Blood Group</label>
                    <br />
                    <select
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                        id="bloodGroup"
                        name="bloodGroup"
                        value={employee.bloodGroup || ''}
                        onChange={handleEmployeeChange}
                    >
                        <option value="" disabled>Select your blood group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                  

                </div>
                <div>
                    <label className='font-bold text-sm'>Disability Status</label>
                    <br />
                    <select
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'

                    
                        name="disabilityStatus"
                        value={employee.disabilityStatus || ''}
                        onChange={handleEmployeeChange}
                    >
                        <option value="" disabled>Select disability status</option>
                        <option value="None">None</option>
                        <option value="Physical Disability">Physical Disability</option>
                        <option value="Visual Impairment">Visual Impairment</option>
                        <option value="Hearing Impairment">Hearing Impairment</option>
                        <option value="Cognitive Disability">Cognitive Disability</option>
                        <option value="Other">Other</option>
                    </select>


                </div>
                 <div>
                    <label className='font-bold text-sm'>Marital Status</label>
                    <br />
                    <select
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                       
                        name='maritalStatus'
                        value={employee.maritalStatus}
                        onChange={handleEmployeeChange}
                    >
                        <option value="" disabled>Select marital status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                    </select>
                   
                </div>
                <div>
                    <label className='font-bold text-sm'>Domicile</label>
                    <br />
                    <input
                        type='text'
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                        name='domicile'
                        value={employee.domicile}
                        onChange={handleEmployeeChange}
                    />
                 
                </div>
              <div>
                    <label className='font-bold text-sm'>Province</label>
                    <br />
                    <input
                        type='text'
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                       name='province'
                        value={employee.province}
                        onChange={handleEmployeeChange}
                    />
                    
                </div>
                <div>
                    <label className='font-bold text-sm'>Nationality</label>
                    <br />
                    <input
                        type='text'
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                        name='nationality'
                        value={employee.nationality}
                        onChange={handleEmployeeChange}
                    />
                 

                </div>



                <div>
                    <label className="font-bold text-sm">Spouse Name</label>
                    <br />
                    <input
                        type="text"
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                        placeholder="Enter Spouse Name"
                         name='spouseName'
                        value={employee.spouseName}
                        onChange={handleEmployeeChange}
                    />
                
                </div>
                <div>
                    <label className="font-bold text-sm">Spouse CNIC</label>
                    <br />
                    <input
                        type="text"
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                        placeholder="Enter Spouse CNIC"
                        name='spouseCnic'
                        value={employee.spouseCnic}
                        onChange={handleEmployeeChange}
                    />
                 
                </div>
                <div>
                    <label className="font-bold text-sm">Spouse Nationality</label>
                    <br />
                    <input
                        type="text"
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                        placeholder="Enter Spouse Nationality"
                        name='spouseNationality'
                        value={employee.spouseNationality}
                        onChange={handleEmployeeChange}
                    />
                 
                </div>
                 <div>
                    <label className="font-bold text-sm">Nomination (Next of Kin)</label>
                    <br />
                    <input
                        type="text"
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                        placeholder="Enter Nomination"
                        name='nomination'
                        value={employee.nomination}
                        onChange={handleEmployeeChange}
                    />
                   

                </div>
            </div>
            <hr />
            <h2 className='text-2xl font-semibold mt-8 ml-4'>Employee Contact Detail</h2>
            <div className='flex flex-wrap gap-x-8 gap-y-2 p-4 overflow-auto'>
               
               <div>
                    <label className='font-bold text-sm'>Contact No</label>
                    <br />
                    <input
                        type='tel'
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                         name='contactNo'
                        value={contact.contactNo}
                        onChange={handleContactChange}
                    />
                

                </div>
                <div>
                    <label className='font-bold text-sm'>CNIC</label>
                    <br />
                    <input
                        type='text'
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                        name='cnic'
                        value={contact.cnic}
                        onChange={handleContactChange}
                    />
               
                </div>

                <div>
                    <label className='font-bold text-sm'>Email ID</label>
                    <br />
                    <input
                        type='email'
                         name='emailId'
                        value={contact.emailId}
                        onChange={handleContactChange}
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                    />
                  

                </div>

             <div>
                    <label className='font-bold text-sm'>Mailing Address</label>
                    <br />
                    <input
                        type='text'
                          name='mailingAddress'
                        value={contact.mailingAddress}
                        onChange={handleContactChange}
                       
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                    />
               

                </div>

                <div>
                    <label className='font-bold text-sm'>Permanent Address</label>
                    <br />
                    <input
                        type='text'
                       name='permanentAddress'
                        value={contact.permanentAddress}
                        onChange={handleContactChange}
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                    />
                  
                </div>
    </div>
            <hr />


                <h2 className="text-2xl font-semibold mt-8 ml-4">Employment Details</h2>

            <div className="flex p-4 flex-wrap  gap-x-8 gap-y-2">
               
                <div>
                    <label className="font-bold text-sm">Designation</label>
                    <br />
                    <input
                        type="text"
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                        name='designation'
                        value={employment.designation}
                        onChange={handleEmploymentChange}
                        
                    />
                   

                </div>

                        <div>
                    <label className="font-bold text-sm">Scale</label>
                    <br />
                    <input
                        type="text"
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                           name='scale'
                        value={employment.scale}
                        onChange={handleEmploymentChange}
                    />
               
                </div>

               <div>
                    <label className="font-bold text-sm">Grade</label>
                    <br />
                    
                     <select
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                        
                        name='grade'
                        value={employment.grade}
                        onChange={handleEmploymentChange}
                       
                    >
                        <option value="" disabled>Select Grade</option>
                        <option value="Faculty">Faculty</option>
                        <option value="NonFaculty">Non Faculty</option>
                        <option value="SG-Staff">SG-Staff</option>
                       
                        
                    </select>
                 

                </div>

                <div>
                    <label className="font-bold text-sm">Department</label>
                    <br />
                    <input
                        type="text"
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                        name='department'
                        value={employment.department}
                        onChange={handleEmploymentChange}
                       
                    />
                   
                </div>

                <div>
                    <label className="font-bold text-sm">Appointment Through</label>
                    <br />
                    <input
                        type="text"
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                        name='appointmentThrough'
                        value={employment.appointmentThrough}
                        onChange={handleEmploymentChange}
                    />
                    

                </div>

                <div>
                    <label className="font-bold text-sm">Time Scale</label>
                    <br />
                    <input
                        type="text"
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                        name='timeScale'
                        value={employment.timeScale}
                        onChange={handleEmploymentChange}
                    />
                   
                </div>

                <div>
                    <label className="font-bold text-sm">Promotion Date</label>
                    <br />
                    <input
                        type="date"
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                         name='promotionDates'
                        value={employment.promotionDates}
                        onChange={handleEmploymentChange}
                    />
                 
                </div>

                <div>
                    <label className="font-bold text-sm">Selection Board</label>
                    <br />
                    <input
                        type="text"
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                        name='selectionBoard'
                        value={employment.selectionBoard}
                        onChange={handleEmploymentChange}
                    />
                  
                </div>

                <div>
                    <label className="font-bold text-sm">Date of Joining</label>
                    <br />
                    <input
                        type="date"
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                        name='dateOfJoining'
                        value={employment.dateOfJoining}
                        onChange={handleEmploymentChange}
                    />
                 

                </div>

                <div>
                    <label className="font-bold text-sm">Current Experience</label>
                    <br />
                    <input
                        type="text"
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                        name='currentExperience'
                        value={employment.currentExperience}
                        onChange={handleEmploymentChange}
                       
                    />
                  

                </div>

                <div>
                    <label className="font-bold text-sm">Previous Experience</label>
                    <br />
                    <input
                        type="text"
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                        name='previousExperience'
                        value={employment.previousExperience}
                        onChange={handleEmploymentChange}
                    />
                   

                </div>

                <div>
                    <label className="font-bold text-sm">Contract Expiry Date</label>
                    <br />
                    <input
                        type="date"
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                        name='contractExpiryDate'
                        value={employment.contractExpiryDate}
                        onChange={handleEmploymentChange}
                       
                    />
                
                </div>

                <div>
                    <label className="font-bold text-sm">Current Status</label>
                    <br />
                   
                     <select
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                        
                        name='currentStatus'
                        value={employment.currentStatus}
                        onChange={handleEmploymentChange}
                        required
                    >
                       <option value="" disabled>Select Current Status</option>
                        <option value="working">working</option>
                        <option value="Leave_InLand">Leave_InLand</option>
                        <option value="Leave_Ex_Pak">Leave_Ex_Pak</option>
                        <option value="Resigned">Resigned</option>
                        <option value="Terminate">Terminate</option>
                        
                    </select>
                  
                </div>
             </div>
            <hr />
            <h2 className="text-2xl font-semibold mt-8  ml-4 ">Educational Details</h2>

            <div className="flex p-4  flex-wrap  gap-x-8 gap-y-2">
               
              <div>
                    <label className="font-bold text-sm">Last Qualification</label>
                    <br />
                    <select
                         name='lastQualification'
                        value={education.lastQualification}
                        onChange={handleEducationChange}
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                    >
                        <option value="">Select Qualification</option>
                        <option value="Matic">Matric</option>
                        <option value="FSC/FA/DAE">FSC/FA/DAE</option>
                        <option value="BS">BS</option>
                        <option value="MA/MSc">MA/MSc</option>
                        <option value="MS">MS</option>
                        <option value="PHD">PhD</option>
                    </select>
               
                </div>

                <div>
                    <label className="font-bold text-sm">Subject</label>
                    <br />
                    <input
                        type="text"
                        name='subject'
                        value={education.subject}
                        onChange={handleEducationChange}
                       
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                    />
                   

                </div>

                <div>
                    <label className="font-bold text-sm">Passing Year</label>
                    <br />
                    <input
                        type="date"
                        name='passingYear'
                        value={education.passingYear}
                        onChange={handleEducationChange}
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                    />
                   
                </div>

                <div>
                    <label className="font-bold text-sm">Board/University</label>
                    <br />
                    <input
                        type="text"
                        name='boardUniversity'
                        value={education.boardUniversity}
                        onChange={handleEducationChange}
                        
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                    />
                 

                </div>

                <div>
                    <label className="font-bold text-sm">Country</label>
                    <br />
                    <input
                        type="text"
                        name='country'
                        value={education.country}
                        onChange={handleEducationChange}
                       
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                    />
              
                </div>
              </div>
            <hr />
            <h2 className='text-2xl font-semibold mt-8 ml-4'>Other Details</h2>
            <div className='flex flex-wrap gap-x-8 gap-y-2 p-4 overflow-auto'>
               
                <div>
                    <label className='font-bold text-sm'>Degree Verification Status</label>
                    <br />
                    <input
                        type='text'
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                        name='degreeVerificationStatus'
                        value={other.degreeVerificationStatus}
                        onChange={handleOtherChange}
                        />
                 
                </div>

                <div>
                    <label className='font-bold text-sm'>TTS Endorsement Status</label>
                    <br />
                    <input
                        type='text'
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                        name='ttsEndorsementStatus'
                        value={other.ttsEndorsementStatus}
                        onChange={handleOtherChange}
                        
                    />
                
                </div>

                <div>
                    <label className='font-bold text-sm'>DTRC Midterm</label>
                    <br />
                    <input
                        type='text'
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                         name='dtrcMidterm'
                        value={other.dtrcMidterm}
                        onChange={handleOtherChange}
                    />
                   

                </div>

                <div>
                    <label className='font-bold text-sm'>DTRC Final</label>
                    <br />
                    <input
                        type='text'
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                         name='dtrcFinal'
                        value={other.dtrcFinal}
                        onChange={handleOtherChange}
                        
                    />
                    

                </div>

                <div>
                    <label className='font-bold text-sm'>TRP Status</label>
                    <br />
                    <input
                        type='text'
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                        name='trpStatus'
                        value={other.trpStatus}
                        onChange={handleOtherChange}
                        
                    />
                   

                </div>

                <div>
                    <label className='font-bold text-sm'>Final Remarks</label>
                    <br />
                    <input
                        type='text'
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                        name='finalRemarks'
                        value={other.finalRemarks}
                        onChange={handleOtherChange}
                    />
                   
                </div> 
            </div>
            <div className='flex justify-center gap-5 mb-20'>
                <div>
                <button  className=' bg-blue-500 p-2 text-xl w-40 rounded-lg cursor-pointer hover:bg-green-600 ' onClick={updateEmployeeData}>Update Record</button>
                </div>
                <div>
                <button  className=' bg-red-500 p-2 text-xl w-40 rounded-lg cursor-pointer hover:bg-green-600 ' onClick={DeleteEmployeeData}>Delete Record</button>

                </div>
            </div>
           
          


        </>
    )
}

export default page