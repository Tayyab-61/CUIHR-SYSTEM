import mysql from 'mysql2/promise';

// Configure the database connection
const pool = mysql.createPool({
  host: '127.0.0.1', // MySQL Host
  user: 'root', // Your MySQL Username
  password: '1234', // Your MySQL Password
  database: 'HRRecord', // Your Database Name
  waitForConnections: true,
  connectionLimit: 10, // Maximum number of connections
  queueLimit: 0,
});

export default pool;
