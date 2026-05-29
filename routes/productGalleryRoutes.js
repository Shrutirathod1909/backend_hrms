const express = require("express");
const router = express.Router();

const controller = require("../controllers/productGalleryController");
const upload = require("../middleware/uploadMiddleware");
const auth = require("../middleware/authMiddleware");

// ================= UPLOAD IMAGE =================
router.post(
  "/upload",
  auth,
  upload.single("image"),
  controller.uploadImage
);

// ================= GET IMAGES =================
router.get(
  "/:product_id",
  auth,
  controller.getImages
);

// ================= DELETE IMAGE =================
router.delete(
  "/delete/:id",
  auth,
  controller.deleteImage
);

module.exports = router;