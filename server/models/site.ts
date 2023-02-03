// import mongoose from "mongoose";

// const schema = new mongoose.Schema(
//   {
//     siteId: {
//       type: Number
//     },
//     coordinates: {
//       latitude: {
//         type: Number,
//         required: true
//       },
//       longitude: {
//         type: Number,
//         required: true
//       }
//     },
//     address: {
//       type: String,
//       required: true,
//     },
//     post_code: {
//       type: String,
//       required: true,
//     },
//   },
// );

// export default mongoose.model("Site", schema, "site");

import { Sequelize, DataTypes } from "sequelize";
import Customer from './customer';
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

const Site = sequelize.define("site", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: sequelize.fn("cuid"),
  },
  address: {
    type: DataTypes.STRING,
  },
  post_code: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  coordinates: {
    type: DataTypes.STRING,
  },
  customerId: {
    type: DataTypes.STRING,
  },
});

Site.belongsTo(Customer, {
  foreignKey: "customerId",
  as: "customer",
});

export default Site;