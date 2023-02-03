// import mongoose from "mongoose";

// const schema = new mongoose.Schema(
//   {
//     meterId: {
//       type: Number
//     },
//     serial_number: {
//       type: Number,
//       required: true,
//       unique: true,
//     },
//     installation_date: {
//       type: Date,
//       required: true
//     },
//   },
// );

// export default mongoose.model("Meter", schema, "meter");
import { Sequelize, DataTypes } from "sequelize";
import Site from './site'
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

const Meter = sequelize.define("meter", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: sequelize.fn("cuid"),
  },
  installation_date: {
    type: DataTypes.DATE,
  },
  serial_number: {
    type: DataTypes.STRING,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  siteId: {
    type: DataTypes.STRING,
  },
});

Meter.belongsTo(Site, {
  foreignKey: "siteId",
  as: "site",
});

export default Meter;