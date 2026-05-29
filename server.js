const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();

// ======================
// DATABASE CONNECTION
// ======================
try {
  const { poolPromise } = require("./config/db");

  poolPromise
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch((err) => {
      console.log("Database Connection Failed:", err);
    });
} catch (error) {
  console.log("db.js file not found inside config folder");
  console.log(error.message);
}

// ======================
// MIDDLEWARE
// ======================
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================
// STATIC FOLDER
// ======================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ======================
// ROUTES IMPORT
// ======================
const authRoutes = require("./routes/authRoutes");
const companyRoutes = require("./routes/companyRoutes");
const branchRoutes = require("./routes/branchRoutes");
const permissionRoutes = require("./routes/permissionRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const productRoutes = require("./routes/productRoutes");
const purchaseOrderRoutes = require("./routes/purchaseOrderRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/products", productRoutes);
app.use("/api/purchase-orders", purchaseOrderRoutes);

app.get("/", (req, res) => {
  res.send("🚀 HRMS Backend Running Successfully");
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
