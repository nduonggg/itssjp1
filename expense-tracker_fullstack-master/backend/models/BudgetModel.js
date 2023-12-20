const mongoose = require('mongoose');


const BudgetSchema = new mongoose.Schema({
    incomebudget: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },
    expensebudget: {
        type: Number,
       required: true,
        maxLength: 20,
        trim: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Budget', BudgetSchema)