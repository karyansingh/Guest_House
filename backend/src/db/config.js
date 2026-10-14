import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,

    waitForConnections: true,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
    queueLimit: 0,

    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});


// Test database connection
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();

        console.log("MySQL database connected");

        connection.release();

    } catch (error) {
        console.error("MySQL connection failed:", error.message);
        process.exit(1);
    }
};

testConnection();


// ====================================================
// TRANSACTION
// ====================================================

export const executeTransaction = async (callback, ...params) => {

    let connection;

    try {

        // Get one connection from pool
        connection = await pool.getConnection();

        // Start transaction
        await connection.beginTransaction();

        // Execute callback
        const result = await callback(connection, ...params);

        // Commit
        await connection.commit();

        return {
            success: true,
            result
        };

    } catch (error) {

        // Rollback
        if (connection) {
            try {
                await connection.rollback();
            } catch (rollbackError) {
                console.error(
                    "Rollback failed:",
                    rollbackError.message
                );
            }
        }

        return {
            success: false,
            error: error.message ?? error
        };

    } finally {

        // Return connection to pool
        if (connection) {
            connection.release();
        }
    }
};


export default pool;