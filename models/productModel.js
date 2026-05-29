
const { sql, poolPromise } = require("../config/db");

// ================= GET ALL PRODUCTS =================
exports.getAll = async () => {

  const pool = await poolPromise;

  const result = await pool.request().query(`

    SELECT *
    FROM product_master
    WHERE disabled_on IS NULL
    ORDER BY id DESC

  `);

  return result.recordset;
};

// ================= CREATE PRODUCT =================
exports.create = async (data) => {

  const pool = await poolPromise;

  const result = await pool.request()

    .input("supplier_name", sql.VarChar, data.supplier_name)
    .input("product_name", sql.VarChar, data.product_name)
    .input("sku_code", sql.VarChar, data.sku_code)
    .input("color", sql.VarChar, data.color)
    .input("height", sql.VarChar, data.height)
    .input("width", sql.VarChar, data.width)
    .input("length", sql.VarChar, data.length)
    .input("gender", sql.VarChar, data.gender)
    .input("purchase_price", sql.Decimal(18,2), data.purchase_price)
    .input("sale_price", sql.Decimal(18,2), data.sale_price)
    .input("status", sql.VarChar, data.status)
    .input("created_by", sql.Int, data.created_by)

    .query(`

      INSERT INTO product_master
      (
        supplier_name,
        product_name,
        sku_code,
        color,
        height,
        width,
        length,
        gender,
        purchase_price,
        sale_price,
        status,
        created_by,
        created_on
      )

      OUTPUT INSERTED.id

      VALUES
      (
        @supplier_name,
        @product_name,
        @sku_code,
        @color,
        @height,
        @width,
        @length,
        @gender,
        @purchase_price,
        @sale_price,
        @status,
        @created_by,
        GETDATE()
      )

    `);

  return result;
};

// ================= UPDATE PRODUCT =================
exports.update = async (id, data) => {

  const pool = await poolPromise;

  const result = await pool.request()

    .input("id", sql.Int, id)
    .input("supplier_name", sql.VarChar, data.supplier_name)
    .input("product_name", sql.VarChar, data.product_name)
    .input("sku_code", sql.VarChar, data.sku_code)
    .input("color", sql.VarChar, data.color)
    .input("height", sql.VarChar, data.height)
    .input("width", sql.VarChar, data.width)
    .input("length", sql.VarChar, data.length)
    .input("gender", sql.VarChar, data.gender)
    .input("purchase_price", sql.Decimal(18,2), data.purchase_price)
    .input("sale_price", sql.Decimal(18,2), data.sale_price)
    .input("status", sql.VarChar, data.status)

    .query(`

      UPDATE product_master
      SET
        supplier_name = @supplier_name,
        product_name = @product_name,
        sku_code = @sku_code,
        color = @color,
        height = @height,
        width = @width,
        length = @length,
        gender = @gender,
        purchase_price = @purchase_price,
        sale_price = @sale_price,
        status = @status
      WHERE id = @id

    `);

  return result;
};

// ================= DELETE PRODUCT =================
exports.delete = async (id) => {

  const pool = await poolPromise;

  const result = await pool.request()

    .input("id", sql.Int, id)

    .query(`

      UPDATE product_master
      SET disabled_on = GETDATE()
      WHERE id = @id

    `);

  return result;
};

