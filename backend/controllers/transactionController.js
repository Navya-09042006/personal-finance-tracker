const Transaction = require("../models/Transaction");

// Add Transaction
const addTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body;

    const transaction = await Transaction.create({
      user: req.user.id,
      title,
      amount,
      type,
      category,
      date,
    });

    res.status(201).json({
      message: "Transaction Added Successfully",
      transaction,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user.id,
    }).sort({ date: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Transaction
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    await transaction.deleteOne();

    res.status(200).json({
      message: "Transaction Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Transaction
const updateTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body;

    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    transaction.title = title || transaction.title;
    transaction.amount = amount || transaction.amount;
    transaction.type = type || transaction.type;
    transaction.category = category || transaction.category;
    transaction.date = date || transaction.date;

    const updatedTransaction = await transaction.save();

    res.status(200).json({
      message: "Transaction Updated Successfully",
      updatedTransaction,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
};
