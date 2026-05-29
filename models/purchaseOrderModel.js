const sql = require("mssql");
const dbConfig = require("../config/db");

// ================= GET ALL =================
const getAllPurchaseOrders = async () => {
  try {
    const result = await sql.connect(dbConfig)
      .then(conn =>
        conn.request().query(`
          SELECT * FROM purchase_orders
          ORDER BY order_id DESC
        `)
      );

    return result.recordset;
  } catch (error) {
    throw error;
  }
};

// ================= CREATE =================
const createPurchaseOrder = async (data) => {
  try {
    const result = await sql.connect(dbConfig)
      .then(conn =>
        conn.request()
          .input("supplier_name", sql.VarChar, data.supplier_name)
          .input("product_name", sql.VarChar, data.product_name)
          .input("sku", sql.VarChar, data.sku)
          .input("qty", sql.Int, data.qty)
          .input("color", sql.VarChar, data.color)
          .input("height", sql.VarChar, data.height)
          .input("width", sql.VarChar, data.width)
          .input("length", sql.VarChar, data.length)
          .input("gender", sql.VarChar, data.gender)
          .input("purchase_price", sql.Decimal(10, 2), data.purchase_price)
          .input("sale_price", sql.Decimal(10, 2), data.sale_price)
          .input("image", sql.VarChar, data.image)
          .input("gst_type", sql.VarChar, data.gst_type)
          .input("gst_percentage", sql.Decimal(5, 2), data.gst_percentage)
          .input("invoice_no", sql.VarChar, data.invoice_no)
          .input("created_by", sql.VarChar, data.created_by)
          .input("status", sql.VarChar, data.status)
          .query(`
            INSERT INTO purchase_orders (
              supplier_name,
              product_name,
              sku,
              qty,
              color,
              height,
              width,
              length,
              gender,
              purchase_price,
              sale_price,
              image,
              gst_type,
              gst_percentage,
              invoice_no,
              created_by,
              status
            )
            VALUES (
              @supplier_name,
              @product_name,
              @sku,
              @qty,
              @color,
              @height,
              @width,
              @length,
              @gender,
              @purchase_price,
              @sale_price,
              @image,
              @gst_type,
              @gst_percentage,
              @invoice_no,
              @created_by,
              @status
            )
          `)
      );

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllPurchaseOrders,
  createPurchaseOrder,
};