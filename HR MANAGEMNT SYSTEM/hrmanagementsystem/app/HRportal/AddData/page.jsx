'use client'
import Header from '@/app/Components/Header';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


export default function Home() {
    // State hooks for each input field
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
                      router.push('/HRportal/AddData');
                  }
              })
              .catch(() => router.push('/'));
      }
  }, [router]);


    const [employeeID, setEmployeeID] = useState("");
    const [name, setName] = useState("");
    const [fatherName, setFatherName] = useState("");

    const [religion, setReligion] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [disabilityStatus, setDisabilityStatus] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [domicile, setDomicile] = useState("");
    const [province, setProvince] = useState("");
    const [nationality, setNationality] = useState("");
    const [spouseName, setSpouseName] = useState('');
    const [spouseCnic, setSpouseCnic] = useState('');
    const [spouseNationality, setSpouseNationality] = useState('');
    const [Nomination, setNomination] = useState('');

    const [idError, setIdError] = useState(false);
    const [nameError, setnameError] = useState(false);
    const [FnameError, setFnameError] = useState(false);
    const [cnicError, setcnicError] = useState(false);
    const [ReligionError, setReligionError] = useState(false);
    const [GenderError, setGenderError] = useState(false);
    const [DobError, setDobError] = useState(false);
    const [BloodGroupError, setBloodGroupError] = useState(false);
    const [MaritalStatusError, setMaritalStatusError] = useState(false);
    const [DomicileError, setDomicileError] = useState(false);
    const [ProvinceError, setProvinceError] = useState(false);
    const [NationalityError, setNationalityError] = useState(false);
    const [SpouseNameError, setSpouseNameError] = useState(false);
    const [SpouseCnicError, setSpouseCnicError] = useState(false);
    const [SpouseNationalityError, setSpouseNationalityError] = useState(false);
    const [SpouseNominationError, setNominationError] = useState(false);

    //////Contact Details//////////////
    const [contactNo, setContactNo] = useState('');
    const [cnic, setCnic] = useState("");
    const [emailId, setEmailId] = useState('');
    const [mailingAddress, setMailingAddress] = useState('');
    const [permanentAddress, setPermanentAddress] = useState('');
    const [ContactError, setContactError] = useState('');
    const [EmailError, setEmailError] = useState('');
    const [MailError, setMailError] = useState('');
    const [PAError, setPAError] = useState('');


    ///Employment Details///////////////////
    const [designation, setDesignation] = useState('');
    const [scale, setScale] = useState('');
    const [grade, setGrade] = useState('');
    const [department, setDepartment] = useState('');
    const [appointmentThrough, setAppointmentThrough] = useState('');
    const [timeScale, setTimeScale] = useState('');
    const [promotionDates, setPromotionDates] = useState('');
    const [selectionBoard, setSelectionBoard] = useState('');
    const [dateOfJoining, setDateOfJoining] = useState('');
    const [currentExperience, setCurrentExperience] = useState('');
    const [previousExperience, setPreviousExperience] = useState('');
    const [contractExpiryDate, setContractExpiryDate] = useState('');
    const [currentStatus, setCurrentStatus] = useState('');

    //////Educational Details////////////////////
    const [lastQualification, setLastQualification] = useState('');
    const [subject, setSubject] = useState('');
    const [passingYear, setPassingYear] = useState('');
    const [boardUniversity, setBoardUniversity] = useState('');
    const [country, setCountry] = useState('');

    /////////other Details/////////////////
    const [degreeVerificationStatus, setDegreeVerificationStatus] = useState('');
    const [ttsEndorsementStatus, setTTSEndorsementStatus] = useState('');
    const [dtrcMidterm, setDtrcMidterm] = useState('');
    const [dtrcFinal, setDtrcFinal] = useState('');
    const [trpStatus, setTrpStatus] = useState('');
    const [finalRemarks, setFinalRemarks] = useState('');

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    const [designationError, setDesignationError] = useState(false);
    const [scaleError, setScaleError] = useState(false);
    const [gradeError, setGradeError] = useState(false);
    const [departmentError, setDepartmentError] = useState(false);
    const [appointmentThroughError, setAppointmentThroughError] = useState(false);
    const [timeScaleError, setTimeScaleError] = useState(false);
    const [promotionDatesError, setPromotionDatesError] = useState(false);
    const [selectionBoardError, setSelectionBoardError] = useState(false);
    const [dateOfJoiningError, setDateOfJoiningError] = useState(false);
    const [currentExperienceError, setCurrentExperienceError] = useState(false);
    const [previousExperienceError, setPreviousExperienceError] = useState(false);
    const [contractExpiryDateError, setContractExpiryDateError] = useState(false);
    const [currentStatusError, setCurrentStatusError] = useState(false);

    ///////// Educational Details ///////////
    const [lastQualificationError, setLastQualificationError] = useState(false);
    const [subjectError, setSubjectError] = useState(false);
    const [passingYearError, setPassingYearError] = useState(false);
    const [boardUniversityError, setBoardUniversityError] = useState(false);
    const [countryError, setCountryError] = useState(false);

    ///////// Other Details ///////////
    const [degreeVerificationStatusError, setDegreeVerificationStatusError] = useState(false);
    const [ttsEndorsementStatusError, setTTSEndorsementStatusError] = useState(false);
    const [dtrcMidtermError, setDtrcMidtermError] = useState(false);
    const [dtrcFinalError, setDtrcFinalError] = useState(false);
    const [trpStatusError, setTrpStatusError] = useState(false);
    const [finalRemarksError, setFinalRemarksError] = useState(false);
    // Handle changes for each input field
    const handleQualificationChange = (event) => setLastQualification(event.target.value);
    const handleSubjectChange = (event) => setSubject(event.target.value);
    const handlePassingYearChange = (event) => setPassingYear(event.target.value);
    const handleBoardUniversityChange = (event) => setBoardUniversity(event.target.value);
    const handleCountryChange = (event) => setCountry(event.target.value);
    const handleChange = (setter) => (event) => setter(event.target.value);

    const handleNameChange = (event) => setSpouseName(event.target.value);
    const handleCnicChange = (event) => setSpouseCnic(event.target.value);
    const handleNationalityChange = (event) => setSpouseNationality(event.target.value);

    // Handlers to update the state values when user types in the inputs
    const handleBloodGroupChange = (event) => {
        setBloodGroup(event.target.value);
    };

    const handleDisabilityStatusChange = (event) => {
        setDisabilityStatus(event.target.value);
    };

    const handleMaritalStatusChange = (event) => {
        setMaritalStatus(event.target.value);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleInputChange = (setter) => (event) => {
        setter(event.target.value);
    };
    const data = {

        EmployeePersonalData: [employeeID, name, fatherName, religion, gender, dob, bloodGroup, disabilityStatus, maritalStatus, domicile, province,
            nationality, spouseName, spouseCnic, spouseNationality, Nomination],
        EmployeeContactDetail: [employeeID,contactNo, cnic, emailId, mailingAddress, permanentAddress],
        EmployementDetail: [employeeID,designation, scale, grade, department, appointmentThrough, timeScale, promotionDates, selectionBoard, dateOfJoining,
            currentExperience, previousExperience, contractExpiryDate, currentStatus],
        EducationalDetail: [employeeID,lastQualification, subject, passingYear, boardUniversity, country],
        OtherDetail: [employeeID,degreeVerificationStatus, ttsEndorsementStatus, dtrcMidterm, dtrcFinal, trpStatus, finalRemarks],
    }

    async function  handleSubmit() {
        // Initialize an error flag to track if there are any errors

        let hasError = false;

        // Validate all required fields
        if (employeeID.trim() === "") {
            setIdError(true);
            hasError = true;
        } else {
            setIdError(false);

        }

        if (name.trim() === "") {
            setnameError(true);
            hasError = true;
        } else {
            setnameError(false);
        }

        if (fatherName.trim() === "") {
            setFnameError(true);
            hasError = true;
        } else {
            setFnameError(false);
        }

        if (cnic.trim() === "") {
            setcnicError(true);
            hasError = true;
        } else {
            setcnicError(false);
        }

        // You can also add more validations for other fields if needed
        if (religion.trim() === "") {
            setReligionError(true);
            hasError = true;
        } else {
            setReligionError(false);
        }

        if (gender.trim() === "") {
            setGenderError(true);
            hasError = true;
        } else {
            setGenderError(false);
        }

        if (dob.trim() === "") {
            setDobError(true);
            hasError = true;
        } else {
            setDobError(false);
        }

        if (bloodGroup.trim() === "") {
            setBloodGroupError(true);
            hasError = true;
        } else {
            setBloodGroupError(false);
        }



        if (maritalStatus.trim() === "") {
            setMaritalStatusError(true);
            hasError = true;
        } else {
            setMaritalStatusError(false);
        }

        if (domicile.trim() === "") {
            setDomicileError(true);
            hasError = true;
        } else {
            setDomicileError(false);
        }

        if (province.trim() === "") {
            setProvinceError(true);
            hasError = true;
        } else {
            setProvinceError(false);
        }

        if (nationality.trim() === "") {
            setNationalityError(true);
            hasError = true;
        } else {
            setNationalityError(false);
        }

        if (spouseName.trim() === "") {
            setSpouseNameError(true);
            hasError = true;
        } else {
            setSpouseNameError(false);
        }

        if (spouseCnic.trim() === "") {
            setSpouseCnicError(true);
            hasError = true;
        } else {
            setSpouseCnicError(false);
        }

        if (spouseNationality.trim() === "") {
            setSpouseNationalityError(true);
            hasError = true;
        } else {
            setSpouseNationalityError(false);
        }

        if (Nomination.trim() === "") {
            setNominationError(true);
            hasError = true;
        } else {
            setNominationError(false);
        }

        if (contactNo.trim() === "") {
            setContactError(true);
            hasError = true;
        } else {
            setContactError(false);
        }

        if (emailId.trim() === "") {
            setEmailError(true);
            hasError = true;
        } else {
            setEmailError(false);
        }
        if (mailingAddress.trim() === "") {
            setMailError(true);
            hasError = true;
        } else {
            setMailError(false);
        }

        if (permanentAddress.trim() === "") {
            setPAError(true);
            hasError = true;
        } else {
            setPAError(false);
        }
        if (designation.trim() === "") {
            setDesignationError(true);
            hasError = true;
        } else {
            setDesignationError(false);
        }

        if (scale.trim() === "") {
            setScaleError(true);
            hasError = true;
        } else {
            setScaleError(false);
        }

        if (grade.trim() === "") {
            setGradeError(true);
            hasError = true;
        } else {
            setGradeError(false);
        }

        if (department.trim() === "") {
            setDepartmentError(true);
            hasError = true;
        } else {
            setDepartmentError(false);
        }

        if (appointmentThrough.trim() === "") {
            setAppointmentThroughError(true);
            hasError = true;
        } else {
            setAppointmentThroughError(false);
        }

        if (timeScale.trim() === "") {
            setTimeScaleError(true);
            hasError = true;
        } else {
            setTimeScaleError(false);
        }

        if (promotionDates.trim() === "") {
            setPromotionDatesError(true);
            hasError = true;
        } else {
            setPromotionDatesError(false);
        }

        if (selectionBoard.trim() === "") {
            setSelectionBoardError(true);
            hasError = true;
        } else {
            setSelectionBoardError(false);
        }

        if (dateOfJoining.trim() === "") {
            setDateOfJoiningError(true);
            hasError = true;
        } else {
            setDateOfJoiningError(false);
        }

        if (currentExperience.trim() === "") {
            setCurrentExperienceError(true);
            hasError = true;
        } else {
            setCurrentExperienceError(false);
        }

        if (previousExperience.trim() === "") {
            setPreviousExperienceError(true);
            hasError = true;
        } else {
            setPreviousExperienceError(false);
        }

        if (contractExpiryDate.trim() === "") {
            setContractExpiryDateError(true);
            hasError = true;
        } else {
            setContractExpiryDateError(false);
        }

        if (currentStatus.trim() === "") {
            setCurrentStatusError(true);
            hasError = true;
        } else {
            setCurrentStatusError(false);
        }

        // Educational Details Validation
        if (lastQualification.trim() === "") {
            setLastQualificationError(true);
            hasError = true;
        } else {
            setLastQualificationError(false);
        }

        if (subject.trim() === "") {
            setSubjectError(true);
            hasError = true;
        } else {
            setSubjectError(false);
        }

        if (passingYear.trim() === "") {
            setPassingYearError(true);
            hasError = true;
        } else {
            setPassingYearError(false);
        }

        if (boardUniversity.trim() === "") {
            setBoardUniversityError(true);
            hasError = true;
        } else {
            setBoardUniversityError(false);
        }

        if (country.trim() === "") {
            setCountryError(true);
            hasError = true;
        } else {
            setCountryError(false);
        }

        // Other Details Validation
        if (degreeVerificationStatus.trim() === "") {
            setDegreeVerificationStatusError(true);
            hasError = true;
        } else {
            setDegreeVerificationStatusError(false);
        }

        if (ttsEndorsementStatus.trim() === "") {
            setTTSEndorsementStatusError(true);
            hasError = true;
        } else {
            setTTSEndorsementStatusError(false);
        }

        if (dtrcMidterm.trim() === "") {
            setDtrcMidtermError(true);
            hasError = true;
        } else {
            setDtrcMidtermError(false);
        }

        if (dtrcFinal.trim() === "") {
            setDtrcFinalError(true);
            hasError = true;
        } else {
            setDtrcFinalError(false);
        }

        if (trpStatus.trim() === "") {
            setTrpStatusError(true);
            hasError = true;
        } else {
            setTrpStatusError(false);
        }

        if (finalRemarks.trim() === "") {
            setFinalRemarksError(true);
            hasError = true;
        } else {
            setFinalRemarksError(false);
        }

     //   If any error is found, prevent form submission
        if (hasError) {
            alert("You must enter all required fields before submission");

            return;
        }
        try {
            const response = await fetch('/api/Savedata', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
            
            });
            console.log(data);
      
            const result = await response.json();
            console.log(result.message);
            alert(result.message);
           
          } catch (error) {
            console.error('Error saving data:', error);
          }

        // If no errors, proceed with successful submission
      
    }


    return (
        <>
            <Header />

            <h1 className='text-3xl font-bold mt-2 text-center'>ADD EMPLOYEE RECORD</h1>

            <h2 className='text-2xl font-semibold mt-2 ml-4 '>Employee Personal Detail</h2>
            <div className='flex flex-wrap  gap-x-8 gap-y-2 p-4 overflow-auto'>
                <div>
                    <label className='font-bold text-sm'>Employee ID </label>
                    <br />
                    <input
                        type='text'
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'

                        value={employeeID}
                        onChange={handleInputChange(setEmployeeID)}
                    />
                    {idError ? <p className='text-red-600'>Please enter employee ID</p> : <p></p>}
                </div>
                <div>
                    <label className='font-bold text-sm'>Name</label>
                    <br />
                    <input
                        type='text'
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                        value={name}
                        onChange={handleInputChange(setName)}

                    />
                    {nameError ? <p className='text-red-600'>Please enter name</p> : <p></p>}
                </div>
                <div>
                    <label className='font-bold text-sm'>Father Name</label>
                    <br />
                    <input
                        type='text'
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                        value={fatherName}
                        onChange={handleInputChange(setFatherName)}
                    />
                    {FnameError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}
                </div>

                <div>
                    <label className='font-bold text-sm'>Religion</label>
                    <br />
                    <input
                        type='text'
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                        value={religion}
                        onChange={handleInputChange(setReligion)}
                    />
                    {ReligionError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}
                </div>
                <div>
                    <label className='font-bold text-sm'>Gender</label>
                    <br />
                    <input
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                        list="genderOptions"
                        id="gender"
                        name="gender"
                        value={gender}
                        onChange={handleGenderChange}
                        placeholder="Select or type..."
                    />
                    <datalist id="genderOptions">
                        <option value="Male" />
                        <option value="Female" />
                    </datalist>
                    {GenderError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>
                <div>
                    <label className='font-bold text-sm'>Date of Birth</label>
                    <br />
                    <input
                        type='date'
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                        value={dob}
                        onChange={handleInputChange(setDob)}
                    />
                    {DobError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>
                <div>
                    <label className='font-bold text-sm'>Blood Group</label>
                    <br />
                    <select
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                        id="bloodGroup"
                        value={bloodGroup}
                        onChange={handleBloodGroupChange}
                        required
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
                    {BloodGroupError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>
                <div>
                    <label className='font-bold text-sm'>Disability Status</label>
                    <br />
                    <select
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'

                        value={disabilityStatus}
                        onChange={handleDisabilityStatusChange}
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
                        value={maritalStatus}
                        onChange={handleMaritalStatusChange}
                    >
                        <option value="" disabled>Select marital status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                    </select>
                    {MaritalStatusError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>
                <div>
                    <label className='font-bold text-sm'>Domicile</label>
                    <br />
                    <input
                        type='text'
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                        value={domicile}
                        onChange={handleInputChange(setDomicile)}
                    />
                    {DomicileError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>
                <div>
                    <label className='font-bold text-sm'>Province</label>
                    <br />
                    <input
                        type='text'
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                        value={province}
                        onChange={handleInputChange(setProvince)}
                    />
                    {ProvinceError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>
                <div>
                    <label className='font-bold text-sm'>Nationality</label>
                    <br />
                    <input
                        type='text'
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                        value={nationality}
                        onChange={handleInputChange(setNationality)}
                    />
                    {NationalityError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>



                <div>
                    <label className="font-bold text-sm">Spouse Name</label>
                    <br />
                    <input
                        type="text"
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                        placeholder="Enter Spouse Name"
                        value={spouseName}
                        onChange={handleNameChange}
                    />
                    {SpouseNameError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>
                <div>
                    <label className="font-bold text-sm">Spouse CNIC</label>
                    <br />
                    <input
                        type="text"
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                        placeholder="Enter Spouse CNIC"
                        value={spouseCnic}
                        onChange={handleCnicChange}
                    />
                    {SpouseCnicError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>
                <div>
                    <label className="font-bold text-sm">Spouse Nationality</label>
                    <br />
                    <input
                        type="text"
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                        placeholder="Enter Spouse Nationality"
                        value={spouseNationality}
                        onChange={handleNationalityChange}
                    />
                    {SpouseNationalityError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>
                <div>
                    <label className="font-bold text-sm">Nomination (Next of Kin)</label>
                    <br />
                    <input
                        type="text"
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                        placeholder="Enter Nomination"
                        value={Nomination}
                        onChange={(e) => setNomination(e.target.value)}
                    />
                    {SpouseNominationError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>
            </div>
            <hr />
            <h2 className='text-2xl font-semibold mt-8 ml-4'>Employee Contact Detail</h2>
            <div className='flex flex-wrap gap-x-8 gap-y-2 p-4 overflow-auto'>
                <div>
                    <label className='font-bold text-sm'>Employee ID </label>
                    <br />
                    <input
                        readOnly
                        type='text'
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'

                        value={employeeID}
                        onChange={handleInputChange(setEmployeeID)}
                    />
                    {idError ? <p className='text-red-600'>Please enter employee ID</p> : <p></p>}
                </div>
                <div>
                    <label className='font-bold text-sm'>Contact No</label>
                    <br />
                    <input
                        type='tel'
                        value={contactNo}
                        onChange={(e) => setContactNo(e.target.value)}
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                    />
                    {ContactError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>
                <div>
                    <label className='font-bold text-sm'>CNIC</label>
                    <br />
                    <input
                        type='text'
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                        value={cnic}
                        onChange={handleInputChange(setCnic)}
                    />
                    {cnicError ? <p className='text-red-600'>Please enter CNIC number</p> : <p></p>}

                </div>

                <div>
                    <label className='font-bold text-sm'>Email ID</label>
                    <br />
                    <input
                        type='email'
                        value={emailId}
                        onChange={(e) => setEmailId(e.target.value)}
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                    />
                    {EmailError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>

                <div>
                    <label className='font-bold text-sm'>Mailing Address</label>
                    <br />
                    <input
                        type='text'
                        value={mailingAddress}
                        onChange={(e) => setMailingAddress(e.target.value)}
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                    />
                    {MailError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>

                <div>
                    <label className='font-bold text-sm'>Permanent Address</label>
                    <br />
                    <input
                        type='text'
                        value={permanentAddress}
                        onChange={(e) => setPermanentAddress(e.target.value)}
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                    />
                    {PAError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>
            </div>
            <hr />


            <h2 className="text-2xl font-semibold mt-8 ml-4">Employment Details</h2>

            <div className="flex p-4 flex-wrap  gap-x-8 gap-y-2">
                <div>
                    <label className='font-bold text-sm'>Employee ID </label>
                    <br />
                    <input
                        readOnly
                        type='text'
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'

                        value={employeeID}
                        onChange={handleInputChange(setEmployeeID)}
                    />
                    {idError ? <p className='text-red-600'>Please enter employee ID</p> : <p></p>}
                </div>
                <div>
                    <label className="font-bold text-sm">Designation</label>
                    <br />
                    <input
                        type="text"
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                        value={designation}
                        onChange={handleChange(setDesignation)}
                    />
                    {designationError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>

                <div>
                    <label className="font-bold text-sm">Scale</label>
                    <br />
                    <input
                        type="text"
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                        value={scale}
                        onChange={handleChange(setScale)}
                    />
                    {scaleError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>

                <div>
                    <label className="font-bold text-sm">Grade</label>
                    <br />
                   
                    <select
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                        
                        value={grade}
                        onChange={handleChange(setGrade)}
                       
                    >
                        <option value="" disabled>Select Grade</option>
                        <option value="Faculty">Faculty</option>
                        <option value="NonFaculty">Non Faculty</option>
                        <option value="SG-Staff">SG-Staff</option>
                       
                        
                    </select>
                    {gradeError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>

                <div>
                    <label className="font-bold text-sm">Department</label>
                    <br />
                    <input
                        type="text"
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                        value={department}
                        onChange={handleChange(setDepartment)}
                    />
                    {departmentError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>

                <div>
                    <label className="font-bold text-sm">Appointment Through</label>
                    <br />
                    <input
                        type="text"
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                        value={appointmentThrough}
                        onChange={handleChange(setAppointmentThrough)}
                    />
                    {appointmentThroughError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>

                <div>
                    <label className="font-bold text-sm">Time Scale</label>
                    <br />
                    <input
                        type="text"
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                        value={timeScale}
                        onChange={handleChange(setTimeScale)}
                    />
                    {timeScaleError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>

                <div>
                    <label className="font-bold text-sm">Promotion Date</label>
                    <br />
                    <input
                        type="date"
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                        value={promotionDates}
                        onChange={handleChange(setPromotionDates)}
                    />
                    {promotionDatesError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>

                <div>
                    <label className="font-bold text-sm">Selection Board</label>
                    <br />
                    <input
                        type="text"
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                        value={selectionBoard}
                        onChange={handleChange(setSelectionBoard)}
                    />
                    {selectionBoardError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>

                <div>
                    <label className="font-bold text-sm">Date of Joining</label>
                    <br />
                    <input
                        type="date"
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                        value={dateOfJoining}
                        onChange={handleChange(setDateOfJoining)}
                    />
                    {dateOfJoiningError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>

                <div>
                    <label className="font-bold text-sm">Current Experience</label>
                    <br />
                    <input
                        type="text"
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                        value={currentExperience}
                        onChange={handleChange(setCurrentExperience)}
                    />
                    {currentExperienceError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>

                <div>
                    <label className="font-bold text-sm">Previous Experience</label>
                    <br />
                    <input
                        type="text"
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                        value={previousExperience}
                        onChange={handleChange(setPreviousExperience)}
                    />
                    {previousExperienceError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>

                <div>
                    <label className="font-bold text-sm">Contract Expiry Date</label>
                    <br />
                    <input
                        type="date"
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                        value={contractExpiryDate}
                        onChange={handleChange(setContractExpiryDate)}
                    />
                    {contractExpiryDateError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>

                <div>
                    <label className="font-bold text-sm">Current Status</label>
                    <br />
                   
                    <select
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                        
                        value={currentStatus}
                        onChange={handleChange(setCurrentStatus)}
                        required
                    >
                        <option value="" disabled>Select Current Status</option>
                        <option value="working">working</option>
                        <option value="Leave_InLand">Leave_InLand</option>
                        <option value="Leave_Ex_Pak">Leave_Ex_Pak</option>
                        <option value="Resigned">Resigned</option>
                        <option value="Terminate">Terminate</option>
                        
                    </select>
                    {currentStatusError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>
            </div>
            <hr />
            <h2 className="text-2xl font-semibold mt-8  ml-4 ">Educational Details</h2>

            <div className="flex p-4  flex-wrap  gap-x-8 gap-y-2">
                <div>
                    <label className='font-bold text-sm'>Employee ID </label>
                    <br />
                    <input
                        readOnly
                        type='text'
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'

                        value={employeeID}
                        onChange={handleInputChange(setEmployeeID)}
                    />
                    {idError ? <p className='text-red-600'>Please enter employee ID</p> : <p></p>}
                </div>
                <div>
                    <label className="font-bold text-sm">Last Qualification</label>
                    <br />
                    <select
                        value={lastQualification}
                        onChange={handleQualificationChange}
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
                    {lastQualificationError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>

                <div>
                    <label className="font-bold text-sm">Subject</label>
                    <br />
                    <input
                        type="text"
                        value={subject}
                        onChange={handleSubjectChange}
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                    />
                    {subjectError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>

                <div>
                    <label className="font-bold text-sm">Passing Year</label>
                    <br />
                    <input
                        type="date"
                        value={passingYear}
                        onChange={handlePassingYearChange}
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                    />
                    {passingYearError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>

                <div>
                    <label className="font-bold text-sm">Board/University</label>
                    <br />
                    <input
                        type="text"
                        value={boardUniversity}
                        onChange={handleBoardUniversityChange}
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                    />
                    {boardUniversityError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>

                <div>
                    <label className="font-bold text-sm">Country</label>
                    <br />
                    <input
                        type="text"
                        value={country}
                        onChange={handleCountryChange}
                        className="bg-zinc-300 p-2 md:w-96 sm:w-80 w-64"
                    />
                    {countryError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>
            </div>
            <hr />
            <h2 className='text-2xl font-semibold mt-8 ml-4'>Other Details</h2>
            <div className='flex flex-wrap gap-x-8 gap-y-2 p-4 overflow-auto'>
                <div>
                    <label className='font-bold text-sm'>Employee ID </label>
                    <br />
                    <input
                        readOnly
                        type='text'
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'

                        value={employeeID}
                        onChange={handleInputChange(setEmployeeID)}
                    />
                    {idError ? <p className='text-red-600'>Please enter employee ID</p> : <p></p>}
                </div>
                <div>
                    <label className='font-bold text-sm'>Degree Verification Status</label>
                    <br />
                    <input
                        type='text'
                        value={degreeVerificationStatus}
                        onChange={(e) => setDegreeVerificationStatus(e.target.value)}
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                    />
                    {degreeVerificationStatusError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>

                <div>
                    <label className='font-bold text-sm'>TTS Endorsement Status</label>
                    <br />
                    <input
                        type='text'
                        value={ttsEndorsementStatus}
                        onChange={(e) => setTTSEndorsementStatus(e.target.value)}
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                    />
                    {ttsEndorsementStatusError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>

                <div>
                    <label className='font-bold text-sm'>DTRC Midterm</label>
                    <br />
                    <input
                        type='text'
                        value={dtrcMidterm}
                        onChange={(e) => setDtrcMidterm(e.target.value)}
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                    />
                    {dtrcMidtermError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>

                <div>
                    <label className='font-bold text-sm'>DTRC Final</label>
                    <br />
                    <input
                        type='text'
                        value={dtrcFinal}
                        onChange={(e) => setDtrcFinal(e.target.value)}
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                    />
                    {dtrcFinalError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>

                <div>
                    <label className='font-bold text-sm'>TRP Status</label>
                    <br />
                    <input
                        type='text'
                        value={trpStatus}
                        onChange={(e) => setTrpStatus(e.target.value)}
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                    />
                    {trpStatusError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>

                <div>
                    <label className='font-bold text-sm'>Final Remarks</label>
                    <br />
                    <input
                        type='text'
                        value={finalRemarks}
                        onChange={(e) => setFinalRemarks(e.target.value)}
                        className='bg-zinc-300 p-2 md:w-96 sm:w-80 w-64'
                    />
                    {finalRemarksError ? <p className='text-red-600'>Please enter required value here</p> : <p></p>}

                </div>
            </div>
            <button className='p-4 rounded-md hover:bg-green-800 ml-4 mt-2 mb-20 text-2xl bg-green-600 text-white' onClick={handleSubmit}>Submit Record</button>




        </>
    );
}
