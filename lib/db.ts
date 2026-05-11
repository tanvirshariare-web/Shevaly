import { Pool } from 'pg';

// Create a new pool instance using the DATABASE_URL environment variable
// You can also pass individual config options like user, host, database, password, port
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // If you are connecting to a cloud database that requires SSL (like Neon, Render, etc.)
  // uncomment the following lines:
  // ssl: {
  //   rejectUnauthorized: false,
  // },
});

// Helper function to execute queries
export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Error executing query', { text, error });
    throw error;
  }
};

export default pool;
