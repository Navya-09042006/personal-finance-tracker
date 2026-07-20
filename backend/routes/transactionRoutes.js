const express = require("express");
const router = express.Router();

const {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transactionController");
const { protect } = require("../middleware/authMiddleware");

// Add Transaction
router.post("/", protect, addTransaction);

// Get All Transactions
router.get("/", protect, getTransactions);
router.delete("/:id", protect, deleteTransaction);
router.put("/:id", protect, updateTransaction);

module.exports = router;
