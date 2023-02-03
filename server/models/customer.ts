// import mongoose from "mongoose";

// const schema = new mongoose.Schema(
//   {
//     customerId: {
//       type: Number
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     vat_number: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Customer", schema, "customer");


import { Sequelize, DataTypes } from "sequelize";
const sequelize = new Sequelize('entities_manager', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
});

const Customer = sequelize.define("customer", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    // defaultValue: sequelize.fn("cuid"),
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  vat_number: {
    type: DataTypes.STRING,
    unique: true,
  },
},
{freezeTableName: true}
);

// await Customer.sync({ alter: true })
export default Customer;


