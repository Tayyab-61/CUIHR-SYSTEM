 // Ensure your database pool connection is correctly imported
import pool from "@/app/lib/db";
import { NextResponse } from "next/server";





export async function DELETE(req) {
    const { employeeID } = await req.json(); // Correctly parse the JSON body

    // Validate input
    if (!employeeID) {
        return NextResponse.json({ message: "Employee ID is required" }, { status: 400 });
    }

    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.getConnection();

        // Check if the employee exists
        const [rows] = await connection.execute(
            `SELECT * FROM employee_personal_data WHERE employeeID = ?`,
            [employeeID]
        );

        if (rows.length === 0) {
            return NextResponse.json({ message: "Employee not found" }, { status: 404 });
        }

        // Delete all records associated with the employeeID
        await connection.execute(
            `DELETE FROM employee_personal_data WHERE employeeID = ?`,
            [employeeID]
        );

        return NextResponse.json({ message: "Employee record deleted successfully" }, { status: 200 }); // Use 200 for success
    } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    } finally {
        if (connection) connection.release(); // Release the connection back to the pool
    }
}
export async function POST(req) {
  try {
    const { employeeID } = await req.json(); // Get employeeID from the frontend request body

    if (!employeeID) {
      return NextResponse.json({ message: "Employee ID is required" }, { status: 400 });
    }

    const connection = await pool.getConnection();

    try {
      // Query to fetch employee data from all related tables
      const [results] = await connection.execute(
        `
        SELECT 
          epd.*, 
          ecd.employeeID,ecd.contactNo, ecd.cnic, ecd.emailId, ecd.mailingAddress, ecd.permanentAddress,
          ed.employeeID, ed.designation, ed.scale, ed.grade, ed.department, ed.appointmentThrough, ed.timeScale, ed.promotionDates, ed.selectionBoard, ed.dateOfJoining, ed.currentExperience, ed.previousExperience, ed.contractExpiryDate, ed.currentStatus,
          edu.employeeID, edu.lastQualification, edu.subject, edu.passingYear, edu.boardUniversity, edu.country,
          od.employeeID,od.degreeVerificationStatus,od.ttsEndorsementStatus,od.dtrcMidterm,od.dtrcFinal,od.trpStatus, od.finalRemarks
        FROM employee_personal_data epd
        LEFT JOIN employee_contact_detail ecd ON epd.employeeID = ecd.employeeID
        LEFT JOIN employment_detail ed ON epd.employeeID = ed.employeeID
        LEFT JOIN educational_detail edu ON epd.employeeID = edu.employeeID
        LEFT JOIN other_detail od ON epd.employeeID = od.employeeID
        WHERE epd.employeeID = ?
        `,
        [employeeID]
      );

      connection.release();

      if (results.length === 0) {
        return NextResponse.json({ message: "No data found for this Employee ID" }, { status: 404 });
      }

      // Organize the data into structured objects
      const data = {
        employee: {
          id: results[0].id,
          employeeID: results[0].employeeID,
          name: results[0].name,
          fatherName: results[0].fatherName,
          religion: results[0].religion,
          gender: results[0].gender,
          dob: results[0].dob,
          bloodGroup: results[0].bloodGroup,
          disabilityStatus: results[0].disabilityStatus,
          maritalStatus: results[0].maritalStatus,
          domicile: results[0].domicile,
          province: results[0].province,
          nationality: results[0].nationality,
          spouseName: results[0].spouseName,
          spouseCnic: results[0].spouseCnic,
          spouseNationality: results[0].spouseNationality,
          nomination: results[0].nomination,
        },
        contact: {
          employeeID: results[0].employeeID,
          contactNo: results[0].contactNo,
          cnic: results[0].cnic,
          emailId: results[0].emailId,
          mailingAddress: results[0].mailingAddress,
          permanentAddress: results[0].permanentAddress,
        },
        employment: {
          employeeID: results[0].employeeID,
          designation: results[0].designation,
          scale: results[0].scale,
          grade: results[0].grade,
          department: results[0].department,
          appointmentThrough:results[0].appointmentThrough,
          timeScale:results[0].timeScale,
          promotionDates:results[0].promotionDates,
          selectionBoard:results[0].selectionBoard,
          dateOfJoining: results[0].dateOfJoining,
          currentExperience:results[0].currentExperience,
          previousExperience:results[0].previousExperience,
          contractExpiryDate:results[0].contractExpiryDate,
          currentStatus: results[0].currentStatus,
        },
        education: {
          employeeID: results[0].employeeID,
          lastQualification: results[0].lastQualification,
          subject: results[0].subject,
          passingYear: results[0].passingYear,
          boardUniversity: results[0].boardUniversity,
          country: results[0].country,
        },
        other: {
          employeeID: results[0].employeeID,
          degreeVerificationStatus: results[0].degreeVerificationStatus,
          ttsEndorsementStatus:results[0].ttsEndorsementStatus,
          dtrcMidterm:results[0].dtrcMidterm,
          dtrcFinal:results[0].dtrcFinal,
          trpStatus:results[0].trpStatus,
          finalRemarks: results[0].finalRemarks,
        },
      };

      return NextResponse.json({ data, message: "Data retrieved successfully!" });
    } catch (err) {
      connection.release();
      console.error("Error retrieving data:", err);
      return NextResponse.json({ message: "Error retrieving data" }, { status: 500 });
    }
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
export async function PUT(req) {
  const body = await req.json(); // Parse the request body

  const {
    employeeID,
    employee,
    contact,
    employment,
    education,
    other,
  } = body;
  const{
    name,
    fatherName,
    religion,
    gender,
    dob,
    bloodGroup,
    disabilityStatus,
    maritalStatus,
    domicile,
    province,
    nationality,
    spouseName,
    spouseCnic,
    spouseNationality,
    nomination}=employee;
    const{
     contactNo,
     cnic,
     emailId,
     mailingAddress,
     permanentAddress
    }=contact;
  const {
    designation,
    scale,
    grade,
    department,
    appointmentThrough,
    timeScale,
    promotionDates,
    selectionBoard,
    dateOfJoining,
    currentExperience,
    previousExperience,
    contractExpiryDate,
    currentStatus
  } = employment;
  const{
    lastQualification,
    subject,
    passingYear,
    boardUniversity,
    country
  }=education;
  const{
    degreeVerificationStatus,
    ttsEndorsementStatus,
    dtrcMidterm,
    dtrcFinal,
    trpStatus,
    finalRemarks

  }=other
 

  let connection;
  const toNullIfUndefined = (value) => (value === undefined ? null : value);
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction(); // Start a transaction

    // Check if employeeID already exists
    const [existingEmployee] = await connection.execute(
      `SELECT employeeID FROM employee_personal_data WHERE employeeID = ?`,
      [employeeID]
    );

    if (existingEmployee.length > 0) {
    const[Personal_data]=  await connection.execute(
        `UPDATE employee_personal_data 
        SET 
          name = ?, 
          fatherName = ?, 
          religion = ?, 
          gender = ?, 
          dob = ?, 
          bloodGroup = ?, 
          disabilityStatus = ?, 
          maritalStatus = ?, 
          domicile = ?, 
          province = ?, 
          nationality = ?, 
          spouseName = ?, 
          spouseCnic = ?, 
          spouseNationality = ?, 
          nomination = ? 
        WHERE employeeID = ?`,
        [
          toNullIfUndefined(name),
          toNullIfUndefined(fatherName),
          toNullIfUndefined(religion),
          toNullIfUndefined(gender),
          toNullIfUndefined(dob),
          toNullIfUndefined(bloodGroup),
          toNullIfUndefined(disabilityStatus),
          toNullIfUndefined(maritalStatus),
          toNullIfUndefined(domicile),
          toNullIfUndefined(province),
          toNullIfUndefined(nationality),
          toNullIfUndefined(spouseName),
          toNullIfUndefined(spouseCnic),
          toNullIfUndefined(spouseNationality),
          toNullIfUndefined(nomination),
          employeeID
        ]
      );
    const[contact_data]=  await connection.execute(
        `UPDATE employee_contact_detail
        SET 
          contactNo = ?, 
          cnic = ?, 
          emailId = ?, 
          mailingAddress = ?, 
          permanentAddress = ? 
        WHERE employeeID = ?`,
        [
          toNullIfUndefined(contactNo),
        toNullIfUndefined(cnic),
        toNullIfUndefined(emailId),
        toNullIfUndefined(mailingAddress),
        toNullIfUndefined(permanentAddress),
          employeeID
        ]
      )

      const [employment_detail] = await connection.execute(
        `UPDATE employment_detail 
        SET 
          
          designation = ?, 
          scale = ?, 
          grade = ?, 
          department = ?, 
          appointmentThrough = ?, 
          timeScale = ?, 
          promotionDates = ?, 
          selectionBoard = ?, 
          dateOfJoining = ?, 
          currentExperience = ?, 
          previousExperience = ?, 
          contractExpiryDate = ?, 
          currentStatus = ? 
        WHERE employeeID = ?`,
        [
          toNullIfUndefined(designation),
          toNullIfUndefined(scale),
          toNullIfUndefined(grade),
          toNullIfUndefined(department),
          toNullIfUndefined(appointmentThrough),
          toNullIfUndefined(timeScale),
          toNullIfUndefined(promotionDates),
          toNullIfUndefined(selectionBoard),
          toNullIfUndefined(dateOfJoining ),
          toNullIfUndefined(currentExperience),
          toNullIfUndefined(previousExperience),
          toNullIfUndefined(contractExpiryDate),
          toNullIfUndefined(currentStatus),
          employeeID
        ]
      );
      const[education_data]=await connection.execute(
        `UPDATE educational_detail 
        SET 
          lastQualification = ?, 
          subject = ?, 
          passingYear = ?, 
          boardUniversity = ?, 
          country = ? 
        WHERE employeeID = ?`,
        [
          toNullIfUndefined(lastQualification),
        toNullIfUndefined(subject),
        toNullIfUndefined(passingYear),
        toNullIfUndefined(boardUniversity),
        toNullIfUndefined(country),
          employeeID
        ]
      );
      const[other_details]=await connection.execute(
        `UPDATE other_detail
        SET 
          degreeVerificationStatus = ?, 
          ttsEndorsementStatus = ?, 
          dtrcMidterm = ?, 
          dtrcFinal = ?, 
          trpStatus = ?, 
          finalRemarks = ? 
        WHERE employeeID = ?`,
        [
          toNullIfUndefined(degreeVerificationStatus),
        toNullIfUndefined(ttsEndorsementStatus),
        toNullIfUndefined(dtrcMidterm),
        toNullIfUndefined(dtrcFinal),
        toNullIfUndefined(trpStatus),
        toNullIfUndefined(finalRemarks),
        employeeID
        ]
      );

      await connection.commit(); // Commit the transaction
      return new Response(JSON.stringify({ message: 'Employee data updated successfully' }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: 'Employee not found' }), { status: 404 });
    }
  } catch (error) {
    console.error("Database error:", error);
    return new Response(JSON.stringify({ message: 'An error occurred' }), { status: 500 });
  } finally {
    if (connection) {
      await connection.release(); // Ensure connection is released
    }
  }
}