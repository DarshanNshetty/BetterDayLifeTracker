const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    date: { type: Date, required: true },
    morningScore: { type: Number, min: -2, max: 2, required: true },
    afternoonScore: { type: Number, min: -2, max: 2, required: true },
    eveningScore: { type: Number, min: -2, max: 2, required: true },
    totalScore: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Entry', entrySchema);