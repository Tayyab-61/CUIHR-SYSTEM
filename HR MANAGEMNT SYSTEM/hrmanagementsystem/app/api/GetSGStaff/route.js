import pool from "@/app/lib/db";
import { NextResponse } from 'next/server';

export async function GET() {
    let connection;

    try {
        // Connect to the database
        connection = await pool.getConnection();

        // Fetch data from all tables
        const [personalData] = await connection.query(`
            SELECT e.* 
            FROM employee_personal_data e
            JOIN employment_detail em ON e.employeeID = em.employeeID
            WHERE em.grade = 'SG-Staff'`); // Enclose 'SF-STAFF' in quotes

        const [contactData] = await connection.query(`SELECT ec.* FROM employee_contact_detail ec  JOIN employment_detail em ON ec.employeeID = em.employeeID
        WHERE em.grade = 'SG-Staff'`);
        const [educationData] = await connection.query(`SELECT ed.* FROM educational_detail ed JOIN employment_detail em ON ed.employeeID = em.employeeID
        WHERE em.grade = 'SG-Staff'`);
        const [employmentData] = await connection.query(`SELECT * FROM employment_detail em where em.grade = 'SG-Staff'`);
        const [otherData] = await connection.query(`SELECT od.* FROM other_detail od JOIN employment_detail em ON od.employeeID = em.employeeID
        WHERE em.grade = 'SG-Staff'`);

        // Send the data as JSON
        return NextResponse.json({ personalData, contactData, educationData, employmentData, otherData, message: "Data Retrieved Successfully" }, { status: 200 });
    } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    } finally {
        if (connection) {
            await connection.release(); // Ensure the connection is released
        }
    }
}