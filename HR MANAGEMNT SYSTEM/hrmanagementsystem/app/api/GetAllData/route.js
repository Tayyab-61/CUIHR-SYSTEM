import pool from "@/app/lib/db";
import { NextResponse } from 'next/server'; // Ensure you import NextResponse

export async function GET() {
    try {
        // Connect to the database
        const connection = await pool.getConnection();

    
          // Fetch data from all tables
          const [personalData] = await connection.query(`SELECT * FROM employee_personal_data`);
          const [contactData] = await connection.query(`SELECT * FROM employee_contact_detail`);
          const [educationData] = await connection.query(`SELECT * FROM educational_detail`);
          const [employmentData] = await connection.query(`SELECT * FROM employment_detail`);
          const [otherData] = await connection.query(`SELECT * FROM other_detail`);

        await connection.release(); // Release the connection back to the pool

        // Send the data as JSON
        return NextResponse.json({ personalData,contactData,educationData,employmentData,otherData, message: "Data Retrieved Successfully" }, { status: 200 });
    } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}