// import mongoose from "mongoose";

// const schema = new mongoose.Schema(
//   {
//     circuitId: {
//       type: Number
//     },
//     installation_date: {
//       type: Date,
//       required: true
//     },
//     is_main: {
//       type: Boolean,
//       required: true,
//     }
//   },
// );

// export default mongoose.model("Circuit", schema, "circuit");
import { Sequelize, DataTypes } from 'sequelize';

const Circuit = (sequelize: any) => {
  return sequelize.define('Circuit', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    installation_date: {
      type: DataTypes.DATE,
    },
    is_main: {
      type: DataTypes.BOOLEAN,
    },
    name: {
      type: DataTypes.STRING,
    },
    meterId: {
      type: DataTypes.STRING,
    },
  });
};

export default Circuit; 