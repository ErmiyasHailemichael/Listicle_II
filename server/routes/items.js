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

// POST new item
router.post('/', async (req, res) => {
    const { name, description, text, category, image, submittedBy } = req.body;
    
    // Check if all required fields are provided
    if (!name || !description || !text || !category || !image || !submittedBy) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const newItem = await pool.query(
            `INSERT INTO items (name, description, text, category, image, submittedby) 
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, 
            [name, description, text, category, image, submittedBy]
        );

        res.json(newItem.rows[0]);
    } catch (error) {
        console.error('Error inserting data:', error.message);
        res.status(500).send('Error inserting data');
    }
});

// PUT to update an item by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters
    const { name, description, text, category, image, submittedBy } = req.body;

    // Check if all required fields are provided
    if (!name || !description || !text || !category || !image || !submittedBy) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const result = await pool.query(
            `UPDATE items 
             SET name = $1, description = $2, text = $3, category = $4, image = $5, submittedby = $6 
             WHERE id = $7 RETURNING *`,
            [name, description, text, category, image, submittedBy, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Item not found.' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating item:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE an item by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters

    try {
        const result = await pool.query(
            `DELETE FROM items 
             WHERE id = $1 RETURNING *`,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Item not found.' });
        }

        res.json({ message: 'Item deleted successfully.' });
    } catch (error) {
        console.error('Error deleting item:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Export the router
export default router;
