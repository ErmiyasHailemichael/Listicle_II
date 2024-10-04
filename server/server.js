import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import itemsRouter from './routes/items.js'; // Import your items router
import { pool } from './config/database.js'; // Import your database connection

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Use the items router for any requests to /items
app.use('/items', itemsRouter); // This line connects the items routes

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
