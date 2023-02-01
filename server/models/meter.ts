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
import { Sequelize, DataTypes } from 'sequelize';

const Meter = (sequelize: any) => {
  return sequelize.define('Meter', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
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
};

export default Meter;