import pool from '@/app/lib/db';
import { NextResponse } from 'next/server';
 // Import your database connection

 export async function POST(req) {
    try {
      const body = await req.json(); // Parse the request body
      
      const {
        EmployeePersonalData,
        EmployeeContactDetail,
        EmployementDetail,
        EducationalDetail,
        OtherDetail,
      } = body;
  
      const connection = await pool.getConnection();
  
      await connection.beginTransaction(); // Start a transaction
  
      try {
        const employeeID = EmployeePersonalData[0]; // Assuming the first item in EmployeePersonalData is the employeeID
  
        // Check if employeeID already exists
        const [existingEmployee] = await connection.execute(
          `SELECT employeeID FROM employee_personal_data WHERE employeeID = ?`,
          [employeeID]
        );
  
        if (existingEmployee.length > 0) {
          await connection.release(); // Release the connection
          return NextResponse.json(
            { message: 'Employee ID already exists!' },
            { status: 400 }
          );
        }
  
        // Insert Employee Personal Data
        const [personalResult] = await connection.execute(
          `INSERT INTO employee_personal_data (employeeID, name, fatherName, religion, gender, dob, bloodGroup, disabilityStatus, maritalStatus, domicile, province, nationality, spouseName, spouseCnic, spouseNationality, nomination)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          EmployeePersonalData
        );
  
        // Insert Employee Contact Detail
        const [contactResult] = await connection.execute(
          `INSERT INTO employee_contact_detail (employeeID,contactNo, cnic, emailId, mailingAddress, permanentAddress)
          VALUES (?,?, ?, ?, ?, ?)`,
          EmployeeContactDetail
        );
  
        // Insert Employment Detail
        const [employmentResult] = await connection.execute(
          `INSERT INTO employment_detail (employeeID,designation, scale, grade, department, appointmentThrough, timeScale, promotionDates, selectionBoard, dateOfJoining, currentExperience, previousExperience, contractExpiryDate, currentStatus)
          VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          EmployementDetail
        );
  
        // Insert Educational Detail
        const [educationResult] = await connection.execute(
          `INSERT INTO educational_detail (employeeID,lastQualification, subject, passingYear, boardUniversity, country)
          VALUES (?,?, ?, ?, ?, ?)`,
          EducationalDetail
        );
  
        // Insert Other Detail
        const [otherResult] = await connection.execute(
          `INSERT INTO other_detail (employeeID,degreeVerificationStatus, ttsEndorsementStatus, dtrcMidterm, dtrcFinal, trpStatus, finalRemarks)
          VALUES (?,?, ?, ?, ?, ?, ?)`,
          OtherDetail
        );
  
        // Commit the transaction
        await connection.commit();
        connection.release();
  
        return NextResponse.json({ message: 'Data saved successfully!' });
      } catch (err) {
        await connection.rollback(); // Rollback on error
        connection.release();
        throw err;
      }
  
    } catch (err) {
      console.error('Error saving data:', err);
      return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }
  