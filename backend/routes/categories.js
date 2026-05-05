const express = require('express');
const Category = require('../models/Category');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // For demo purposes, return default categories without auth
        const defaultCategories = [
            { _id: '1', name: 'Food', emoji: '🍽️' },
            { _id: '2', name: 'Expenses', emoji: '💸' },
            { _id: '3', name: 'Meditation', emoji: '🧘' },
            { _id: '4', name: 'Exercise', emoji: '💪' },
            { _id: '5', name: 'Work', emoji: '📘' },
            { _id: '6', name: 'Sleep', emoji: '😴' },
        ];
        res.json(defaultCategories);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

router.post('/', async (req, res) => {
    const { name, emoji } = req.body;
    try {
        // For demo, just return the new category without saving
        const category = { _id: Date.now().toString(), name, emoji: emoji || '📌' };
        res.json(category);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;