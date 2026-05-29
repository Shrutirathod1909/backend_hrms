const sql = require("mssql");
const { poolPromise } = require("../config/db");

const Supplier = {

  // ================= GET ALL =================
  getAll: async () => {
    try {
      const pool = await poolPromise;

      const result = await pool.request().query(`
        SELECT * FROM supplier_master
        WHERE disabled_on IS NULL
        ORDER BY id DESC
      `);

      return result.recordset;
    } catch (err) {
      throw err;
    }
  },

  // ================= CREATE =================
  create: async (data) => {
    try {
      const pool = await poolPromise;

      const result = await pool.request()
        .input("supplier_name", sql.VarChar, data.supplier_name)
        .input("contact_person_name", sql.VarChar, data.contact_person_name)   // ✅ ADDED
        .input("phone", sql.VarChar, data.phone)                               // ✅ ADDED
        .input("email", sql.VarChar, data.email)
        .input("address", sql.VarChar, data.address)
        .input("city", sql.VarChar, data.city)
        .input("pincode", sql.VarChar, data.pincode)
        .input("state", sql.VarChar, data.state)
        .input("created_by", sql.Int, data.created_by)
        .query(`
          INSERT INTO supplier_master
          (
            supplier_name,
            contact_person_name,
            phone,
            email,
            address,
            city,
            pincode,
            state,
            created_by,
            created_on
          )
          VALUES
          (
            @supplier_name,
            @contact_person_name,
            @phone,
            @email,
            @address,
            @city,
            @pincode,
            @state,
            @created_by,
            GETDATE()
          )
        `);

      return result;
    } catch (err) {
      throw err;
    }
  },

  // ================= UPDATE =================
  update: async (id, data) => {
    try {
      const pool = await poolPromise;

      const result = await pool.request()
        .input("id", sql.Int, id)
        .input("supplier_name", sql.VarChar, data.supplier_name)
        .input("contact_person_name", sql.VarChar, data.contact_person_name)   // ✅ ADDED
        .input("phone", sql.VarChar, data.phone)                               // ✅ ADDED
        .input("email", sql.VarChar, data.email)
        .input("address", sql.VarChar, data.address)
        .input("city", sql.VarChar, data.city)
        .input("pincode", sql.VarChar, data.pincode)
        .input("state", sql.VarChar, data.state)
        .input("modified_by", sql.Int, data.modified_by)
        .query(`
          UPDATE supplier_master
          SET
            supplier_name = @supplier_name,
            contact_person_name = @contact_person_name,
            phone = @phone,
            email = @email,
            address = @address,
            city = @city,
            pincode = @pincode,
            state = @state,
            modified_by = @modified_by,
            modified_on = GETDATE()
          WHERE id = @id
        `);

      return result;
    } catch (err) {
      throw err;
    }
  },

  // ================= DELETE (SOFT DELETE) =================
  delete: async (id, disabled_by) => {
    try {
      const pool = await poolPromise;

      const result = await pool.request()
        .input("id", sql.Int, id)
        .input("disabled_by", sql.Int, disabled_by)
        .query(`
          UPDATE supplier_master
          SET
            disabled_by = @disabled_by,
            disabled_on = GETDATE()
          WHERE id = @id
        `);

      return result;
    } catch (err) {
      throw err;
    }
  },

};

module.exports = Supplier;