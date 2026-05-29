const ProductGallery = require("../models/productImageModel");

// ================= UPLOAD IMAGE =================
exports.uploadImage = async (req, res) => {
  try {
    const product_id = req.body.product_id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const data = {
      product_id,
      image: file.filename,
      imagepath: `/uploads/${file.filename}`,
      created_by: req.user?.id || 1,
    };

    await ProductGallery.addImage(data);

    res.json({
      success: true,
      message: "Image uploaded successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= GET IMAGES =================
exports.getImages = async (req, res) => {
  try {
    const data = await ProductGallery.getByProduct(req.params.product_id);

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= DELETE IMAGE =================
exports.deleteImage = async (req, res) => {
  try {
    await ProductGallery.delete(req.params.id);

    res.json({
      success: true,
      message: "Image deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};