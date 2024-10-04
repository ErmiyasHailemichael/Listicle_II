// // routes/items.js

// import { Router } from 'express';
// import { pool } from '../config/database.js'; // Import the database connection pool

// const router = Router();


// // GET all items
// router.get('/', async (req, res) => {
//     try {
//         const result = await pool.query('SELECT * FROM items');
//         res.json(result.rows);
//     } catch (error) {
//         console.error('Error fetching items:', error.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Search items by name or category
// // Search items
// router.get('/search', async (req, res) => {
//     const { query } = req.query; // Assume you're sending a 'query' parameter
//     try {
//         const result = await pool.query(
//             `SELECT * FROM items WHERE name ILIKE $1 OR description ILIKE $1`,
//             [`%${query}%`]
//         );
//         res.json(result.rows);
//     } catch (error) {
//         console.error('Error searching items:', error.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


// // POST new item
// router.post('/', async (req, res) => {
//     const { name, text, category, image, submittedBy } = req.body;
    
//     // Check for missing fields
//     if (!name || !text || !category || !image || !submittedBy) {
//         return res.status(400).json({ error: "All fields are required." });
//     }

//     try {
//         const newItem = await pool.query(
//             `INSERT INTO items (name, text, category, image, submittedby) 
//              VALUES ($1, $2, $3, $4, $5) RETURNING *`, 
//             [name, text, category, image, submittedBy]
//         );

//         res.status(201).json(newItem.rows[0]); // Return created item with status 201
//     } catch (error) {
//         console.error('Error inserting data:', error.message);
//         res.status(500).json({ error: "Error inserting data." });
//     }
// });

// // Export the router
// export default router;

// routes/items.js
import express from 'express';
import { pool } from '../config/database.js';

const router = express.Router();

// Fetch all items or search by query
router.get('/', async (req, res) => {
    const { search } = req.query;
    try {
        let query = 'SELECT * FROM items';
        if (search) {
            query += ` WHERE title ILIKE $1 OR description ILIKE $1`;
            console.log(`Query: ${query}`);  // Debugging the SQL query
            const items = await pool.query(query, [`%${search}%`]);
            return res.json(items.rows);
        }
        const items = await pool.query(query);
        res.json(items.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Fetch a single item by ID
// router.get('/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const item = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
//         if (item.rows.length > 0) {
//             res.json(item.rows[0]);
//         } else {
//             res.status(404).json({ error: 'Item not found' });
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });
// routes/items.js

// Make sure all fields are being selected
router.get('/:id', async (req, res) => {
    const { id } = req.params;  // The item ID from the URL
    try {
        const item = await pool.query('SELECT * FROM items WHERE id = $1', [id]);  // Query database for the specific item
        if (item.rows.length > 0) {
            res.json(item.rows[0]);  // Send back the first item as a JSON response
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



export default router;

