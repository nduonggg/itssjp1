const BudgetSchema= require("../models/BudgetModel")


exports.addBudget = async (req, res) => {
    const { incomebudget, expensebudget}  = req.body

    const budget = BudgetSchema({
        incomebudget,
        expensebudget
    })

    try {  
        await budget.save()
        res.status(200).json({message: 'budget Added'})
    } catch (error) {
        // res.status(500).json({message: 'Server Error'})
    }

    console.log(budget)
}

exports.getBudgets = async (req, res) =>{
    try {
        const budgets = await BudgetSchema.find().sort({createdAt: -1})
        res.status(200).json(budgets)
    } catch (error) {
        // res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteBudget = async (req, res) =>{
    const {id} = req.params;
    BudgetSchema.findByIdAndDelete(id)
        .then((budget) =>{
            res.status(200).json({message: 'Budget Deleted'})
        })
        .catch((err) =>{
            // res.status(500).json({message: 'Server Error'})
        })
}