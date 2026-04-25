const express = require('express');
const Entry = require('../models/Entry');
const Category = require('../models/Category');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const entriesToday = await Entry.find({ user: req.user.id, date: today });
        const entriesYesterday = await Entry.find({ user: req.user.id, date: yesterday });

        const todayScore = entriesToday.length ? entriesToday.reduce((sum, e) => sum + e.totalScore, 0) / entriesToday.length : 0;
        const yesterdayScore = entriesYesterday.length ? entriesYesterday.reduce((sum, e) => sum + e.totalScore, 0) / entriesYesterday.length : 0;

        // Streak
        let streak = 0;
        let currentDate = new Date(today);
        while (true) {
            const entries = await Entry.find({ user: req.user.id, date: currentDate });
            if (entries.length === 0) break;
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        }

        // Best and worst category
        const categories = await Category.find({ $or: [{ user: req.user.id }, { isDefault: true }] });
        let bestCategory = null;
        let bestScore = -3;
        let worstCategory = null;
        let worstScore = 3;
        for (let cat of categories) {
            const catEntries = await Entry.find({ user: req.user.id, category: cat._id });
            const avg = catEntries.length ? catEntries.reduce((sum, e) => sum + e.totalScore, 0) / catEntries.length : 0;
            if (avg > bestScore) {
                bestScore = avg;
                bestCategory = cat.name;
            }
            if (avg < worstScore) {
                worstScore = avg;
                worstCategory = cat.name;
            }
        }

        res.json({ todayScore, yesterdayScore, streak, bestCategory, worstCategory });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

router.get('/analytics', auth, async (req, res) => {
    const { period } = req.query;
    try {
        let startDate = new Date();
        if (period === '1d') startDate.setDate(startDate.getDate() - 1);
        else if (period === '1w') startDate.setDate(startDate.getDate() - 7);
        else if (period === '1m') startDate.setMonth(startDate.getMonth() - 1);
        else if (period === '1y') startDate.setFullYear(startDate.getFullYear() - 1);

        const entries = await Entry.find({ user: req.user.id, date: { $gte: startDate } });

        const data = {};
        entries.forEach(e => {
            const dateStr = e.date.toISOString().split('T')[0];
            if (!data[dateStr]) data[dateStr] = [];
            data[dateStr].push(e.totalScore);
        });

        const chartData = Object.keys(data).map(date => ({
            date,
            score: data[date].reduce((a, b) => a + b, 0) / data[date].length
        }));

        res.json(chartData);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

router.get('/calendar', auth, async (req, res) => {
    const { month, year } = req.query;
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0);
    try {
        const entries = await Entry.find({ user: req.user.id, date: { $gte: start, $lte: end } });

        const data = {};
        entries.forEach(e => {
            const day = e.date.getDate();
            if (!data[day]) data[day] = [];
            data[day].push(e.totalScore);
        });

        const calendarData = Object.keys(data).map(day => ({
            day: parseInt(day),
            score: data[day].reduce((a, b) => a + b, 0) / data[day].length
        }));

        res.json(calendarData);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;