// routes/items.js

import { Router } from 'express';
import { pool } from '../config/database.js'; // Import the database connection pool

const router = Router();

// GET all items
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM items');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching items:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Search items by name or category
router.get('/search', async (req, res) => {
    const { query } = req.query; // Get the search query from the request parameters
    try {
        const result = await pool.query(
            `SELECT * FROM items WHERE name ILIKE $1 OR category ILIKE $1`, 
            [`%${query}%`] // Use ILIKE for case-insensitive search
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error searching items:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST new item
router.post('/', async (req, res) => {
    const { name, text, category, image, submittedBy } = req.body;
    
    // Check for missing fields
    if (!name || !text || !category || !image || !submittedBy) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const newItem = await pool.query(
            `INSERT INTO items (name, text, category, image, submittedby) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`, 
            [name, text, category, image, submittedBy]
        );

        res.status(201).json(newItem.rows[0]); // Return created item with status 201
    } catch (error) {
        console.error('Error inserting data:', error.message);
        res.status(500).json({ error: "Error inserting data." });
    }
});

// Export the router
export default router;
