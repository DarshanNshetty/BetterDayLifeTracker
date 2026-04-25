const express = require('express');
const Category = require('../models/Category');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        const categories = await Category.find({ $or: [{ user: req.user.id }, { isDefault: true }] });
        res.json(categories);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

router.post('/', auth, async (req, res) => {
    const { name } = req.body;
    try {
        const category = new Category({ name, user: req.user.id });
        await category.save();
        res.json(category);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;