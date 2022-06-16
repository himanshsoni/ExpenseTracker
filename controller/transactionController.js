const Transaction = require("../models/Transaction");

// @desc Get All Transactions
// @route GET /api/v1/tranactions
// @access public

exports.getTransaction = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    return res.status(200).json({
      status: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      status: true,
      msg: "Server Error",
    });
  }
};

// @desc ADD NEW  Transactions
// @route POST /api/v1/tranactions
// @access public

exports.addTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;
    const transaction = await Transaction.create(req.body);
    return res.status(201).json({
      status: true,
      data: transaction,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({
        status: false,
        msg: err.message,
      });
    } else {
      return res.status(500).json({
        status: true,
        msg: "Server Error",
      });
    }
  }
};

// @desc DELETEl Transactions
// @route DELETE /api/v1/tranactions/:id
// @access public

exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      res.status(404).json({
        status: false,
        error: "No Transaction found",
      });
    } else {
      await transaction.remove();

      return res.status(200).json({
        status: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: true,
      msg: "Server Error",
    });
  }
};
