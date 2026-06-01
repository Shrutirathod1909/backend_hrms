const Supplier = require("../models/SupplierModel");

// GET
exports.getSuppliers = async (req, res) => {
  try {
    const data = await Supplier.getAll();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// CREATE
exports.createSupplier = async (req, res) => {
  try {
    const body = {
      ...req.body,
      created_by: req.user.id,
    };

    await Supplier.create(body);

    res.status(201).json({
      success: true,
      message: "Supplier Created Successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE
exports.updateSupplier = async (req, res) => {
  try {
    const id = req.params.id;

    const body = {
      ...req.body,
      modified_by: req.user.id,
    };

    await Supplier.update(id, body);

    res.json({
      success: true,
      message: "Supplier Updated Successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE
exports.deleteSupplier = async (req, res) => {
  try {
    await Supplier.delete(req.params.id, req.user.id);

    res.json({
      success: true,
      message: "Supplier Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};