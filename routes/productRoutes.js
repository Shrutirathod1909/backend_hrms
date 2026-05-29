const express = require("express");

const router = express.Router();

const controller = require("../controllers/productController");

const upload = require("../middleware/uploadMiddleware");

// ================= CREATE PRODUCT =================
router.post(
  "/create",
  upload.array("images", 10),
  controller.createProduct
);

// ================= GET PRODUCTS =================
router.get(
  "/",
  controller.getProducts
);

// ================= UPDATE PRODUCT =================
router.put(
  "/update/:id",
  upload.array("images", 10),
  controller.updateProduct
);

// ================= DELETE PRODUCT =================
router.delete(
  "/delete/:id",
  controller.deleteProduct
);

// ================= DELETE IMAGE =================
router.delete(
  "/delete-image/:image_id",
  controller.deleteImage
);

module.exports = router;
