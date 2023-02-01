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

import { Sequelize, DataTypes } from 'sequelize';

const Site = (sequelize: any) => {
  return sequelize.define('Site', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
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
};

export default Site;