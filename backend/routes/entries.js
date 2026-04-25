const express = require('express');
const Entry = require('../models/Entry');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        const entries = await Entry.find({ user: req.user.id }).populate('category');
        res.json(entries);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

router.post('/', auth, async (req, res) => {
    const { category, date, morningScore, afternoonScore, eveningScore } = req.body;
    const totalScore = (morningScore + afternoonScore + eveningScore) / 3;
    try {
        const entry = new Entry({
            user: req.user.id,
            category,
            date,
            morningScore,
            afternoonScore,
            eveningScore,
            totalScore
        });
        await entry.save();
        res.json(entry);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;