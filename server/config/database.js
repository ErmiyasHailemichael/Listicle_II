import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const config = {
    connectionString: process.env.CONNECTION_STRING,
};

const pool = new pg.Pool(config);

pool.connect()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error:', err));

export { pool };
