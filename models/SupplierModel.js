const sql = require("mssql");
const { poolPromise } = require("../config/db");

const Supplier = {

  // ================= GET ALL =================
  getAll: async () => {
    const pool = await poolPromise;

    const result = await pool.request().query(`
      SELECT 
        id,
        supplier_name,
        contact_person_name,
        phone,
        email,
        address,
        city,
        state,
        pincode,

        bank_name,
        account_no,
        account_type,
        swift_code,
        micr_no,
        ifsc_code

      FROM supplier_master
      WHERE disabled_on IS NULL
      ORDER BY id DESC
    `);

    return result.recordset;
  },

  // ================= CREATE =================
  create: async (data) => {
    const pool = await poolPromise;

    return pool.request()
      .input("supplier_name", sql.VarChar, data.supplier_name)
      .input("contact_person_name", sql.VarChar, data.contact_person_name)
      .input("phone", sql.VarChar, data.phone)
      .input("email", sql.VarChar, data.email)
      .input("address", sql.VarChar, data.address)
      .input("city", sql.VarChar, data.city)
      .input("pincode", sql.VarChar, data.pincode)
      .input("state", sql.VarChar, data.state)

      // BANK
      .input("bank_name", sql.VarChar, data.bank_name)
      .input("account_no", sql.VarChar, data.account_no)
      .input("account_type", sql.VarChar, data.account_type)
      .input("swift_code", sql.VarChar, data.swift_code)
      .input("micr_no", sql.VarChar, data.micr_no)
      .input("ifsc_code", sql.VarChar, data.ifsc_code)

      .input("created_by", sql.Int, data.created_by)

      .query(`
        INSERT INTO supplier_master (
          supplier_name,
          contact_person_name,
          phone,
          email,
          address,
          city,
          pincode,
          state,

          bank_name,
          account_no,
          account_type,
          swift_code,
          micr_no,
          ifsc_code,

          created_by,
          created_on
        )
        VALUES (
          @supplier_name,
          @contact_person_name,
          @phone,
          @email,
          @address,
          @city,
          @pincode,
          @state,

          @bank_name,
          @account_no,
          @account_type,
          @swift_code,
          @micr_no,
          @ifsc_code,

          @created_by,
          GETDATE()
        )
      `);
  },

  // ================= UPDATE =================
  update: async (id, data) => {
    const pool = await poolPromise;

    return pool.request()
      .input("id", sql.Int, id)
      .input("supplier_name", sql.VarChar, data.supplier_name)
      .input("contact_person_name", sql.VarChar, data.contact_person_name)
      .input("phone", sql.VarChar, data.phone)
      .input("email", sql.VarChar, data.email)
      .input("address", sql.VarChar, data.address)
      .input("city", sql.VarChar, data.city)
      .input("pincode", sql.VarChar, data.pincode)
      .input("state", sql.VarChar, data.state)

      // BANK
      .input("bank_name", sql.VarChar, data.bank_name)
      .input("account_no", sql.VarChar, data.account_no)
      .input("account_type", sql.VarChar, data.account_type)
      .input("swift_code", sql.VarChar, data.swift_code)
      .input("micr_no", sql.VarChar, data.micr_no)
      .input("ifsc_code", sql.VarChar, data.ifsc_code)

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

          bank_name = @bank_name,
          account_no = @account_no,
          account_type = @account_type,
          swift_code = @swift_code,
          micr_no = @micr_no,
          ifsc_code = @ifsc_code,

          modified_by = @modified_by,
          modified_on = GETDATE()
        WHERE id = @id
      `);
  },

  // ================= DELETE =================
  delete: async (id, disabled_by) => {
    const pool = await poolPromise;

    return pool.request()
      .input("id", sql.Int, id)
      .input("disabled_by", sql.Int, disabled_by)
      .query(`
        UPDATE supplier_master
        SET disabled_by = @disabled_by,
            disabled_on = GETDATE()
        WHERE id = @id
      `);
  }
};

module.exports = Supplier; 