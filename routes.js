const express = require('express');
const router = express.Router();
const db = require('./db'); // For SQLite or MongoDB models

// POST /transactions - Add a new transaction
router.post('/transactions', (req, res) => {
  const { type, category, amount, date, description } = req.body;

  db.run(
    'INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)',
    [type, category, amount, date, description],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

// GET /transactions - Retrieve all transactions
router.get('/transactions', (req, res) => {
  db.all('SELECT * FROM transactions', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(rows);
  });
});

// GET /transactions/:id - Retrieve transaction by ID
router.get('/transactions/:id', (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM transactions WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Transaction not found' });
    res.status(200).json(row);
  });
});

// PUT /transactions/:id - Update a transaction
router.put('/transactions/:id', (req, res) => {
  const { id } = req.params;
  const { type, category, amount, date, description } = req.body;

  db.run(
    `UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?`,
    [type, category, amount, date, description, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ changes: this.changes });
    }
  );
});

// DELETE /transactions/:id - Delete a transaction
router.delete('/transactions/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM transactions WHERE id = ?', id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ deleted: this.changes });
  });
});

// GET /summary - Retrieve a summary of transactions
router.get('/summary', (req, res) => {
  const summary = {
    totalIncome: 0,
    totalExpense: 0,
    balance: 0
  };

  db.all('SELECT type, amount FROM transactions', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    rows.forEach(row => {
      if (row.type === 'income') {
        summary.totalIncome += row.amount;
      } else {
        summary.totalExpense += row.amount;
      }
    });

    summary.balance = summary.totalIncome - summary.totalExpense;
    res.status(200).json(summary);
  });
});

module.exports = router;