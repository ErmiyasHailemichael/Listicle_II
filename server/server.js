// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import itemsRouter from './routes/items.js'; // Import your items router
// import { pool } from './config/database.js'; // Import your database connection

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Use the items router for any requests to /items
// app.use('/items', itemsRouter); // This line connects the items routes

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// server.js
// server.cjs
// server.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import itemsRouter from './routes/items.js'; // Import your items router
import { pool } from './config/database.js'; // Import your database connection
import path from 'path'; // Import path for handling file paths
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the client directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '..', 'client'))); // Serve static files

// Use the items router for any requests to /items
app.use('/items', itemsRouter); // This line connects the items routes

// Set up the default route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html')); // Updated path
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

