const purchaseOrderModel = require("../models/purchaseOrderModel");

const getPurchaseOrders = async (req, res) => {
  try {
    const orders = await purchaseOrderModel.getAllPurchaseOrders();

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createPurchaseOrder = async (req, res) => {
  try {
    await purchaseOrderModel.createPurchaseOrder(req.body);

    res.status(201).json({
      success: true,
      message: "Purchase Order Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getPurchaseOrders,
  createPurchaseOrder,
};