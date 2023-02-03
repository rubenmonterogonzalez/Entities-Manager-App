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
import { Sequelize, DataTypes } from "sequelize";
import Meter from './meter'
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});


const Circuit = sequelize.define("circuit", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: sequelize.fn("cuid"),
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

Circuit.belongsTo(Meter, {
  foreignKey: "meterId",
  as: "meter",
});

export default Circuit; 