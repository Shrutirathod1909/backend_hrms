const express = require("express");
const router = express.Router();

const supplierController = require("../controllers/suppliercontroller");

const authMiddleware = require("../middleware/authMiddleware");

// GET
router.get(
  "/",
  authMiddleware,
  supplierController.getSuppliers,
);

// CREATE
router.post(
  "/create",
  authMiddleware,
  supplierController.createSupplier,
);

// UPDATE
router.put(
  "/update/:id",
  authMiddleware,
  supplierController.updateSupplier,
);

// DELETE
router.delete(
  "/delete/:id",
  authMiddleware,
  supplierController.deleteSupplier,
);

module.exports = router;