const express = require("express");

const router = express.Router();

const {
  getPurchaseOrders,
  createPurchaseOrder,
} = require("../controllers/purchaseOrderController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getPurchaseOrders);

router.post("/", authMiddleware, createPurchaseOrder);

module.exports = router;