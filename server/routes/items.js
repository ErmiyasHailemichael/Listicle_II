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


// Make sure all fields are being selected
router.get('/:id', async (req, res) => {
    const { id } = req.params;  
    try {
        const item = await pool.query('SELECT * FROM items WHERE id = $1', [id]); 
        if (item.rows.length > 0) {
            res.json(item.rows[0]);  
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



export default router;

