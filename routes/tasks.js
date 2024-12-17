const express = require('express');
const router = express.Router();
const db = require('../DB/database');


router.post('/add-task', (req, res) => {
    const { task, start_date, end_date } = req.body;

    if (!task || !start_date || !end_date) {
        return res.status(400).json({ error: 'Task, start date, and end date are required.' });
    }

    db.run(
        'INSERT INTO tasks (task, start_date, end_date) VALUES (?, ?, ?)',
        [task, start_date, end_date],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: this.lastID, task, start_date, end_date });
        }
    );
});


router.get('/tasks', (req, res) => {
    db.all('SELECT * FROM tasks', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

router.delete('/delete-task/:id', (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    });
});



module.exports = router;

