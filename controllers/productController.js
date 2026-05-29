const Product = require("../models/productModel");
const ProductImage = require("../models/productImageModel");

// ================= CREATE PRODUCT =================
exports.createProduct = async (req, res) => {
  try {

    const data = req.body;

    // CREATE PRODUCT
    const result = await Product.create(data);

    // GET PRODUCT ID
    const productId = result.recordset[0].id;

    // SAVE IMAGES
    if (req.files && req.files.length > 0) {

      for (let file of req.files) {

        await ProductImage.addImage(
          productId,
          file.filename
        );
      }
    }

    res.json({
      success: true,
      message: "Product Created Successfully"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// ================= GET PRODUCTS =================
exports.getProducts = async (req, res) => {
  try {

    const products = await Product.getAll();

    // ADD IMAGES
    for (let item of products) {

      const images = await ProductImage.getByProduct(item.id);

      item.images = images;
    }

    res.json({
      success: true,
      data: products
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// ================= UPDATE PRODUCT =================
exports.updateProduct = async (req, res) => {
  try {

    const id = req.params.id;

    await Product.update(id, req.body);

    // NEW IMAGES
    if (req.files && req.files.length > 0) {

      for (let file of req.files) {

        await ProductImage.addImage(
          id,
          file.filename
        );
      }
    }

    res.json({
      success: true,
      message: "Product Updated Successfully"
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// ================= DELETE PRODUCT =================
exports.deleteProduct = async (req, res) => {
  try {

    const id = req.params.id;

    await Product.delete(id);

    res.json({
      success: true,
      message: "Product Deleted Successfully"
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// ================= DELETE IMAGE =================
exports.deleteImage = async (req, res) => {
  try {

    const imageId = req.params.image_id;

    await ProductImage.deleteImage(imageId);

    res.json({
      success: true,
      message: "Image Deleted Successfully"
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
