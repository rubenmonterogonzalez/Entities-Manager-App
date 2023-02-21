import { Sequelize, DataTypes } from "sequelize";
import Meter from './meter'
const sequelize = new Sequelize('entities_manager', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
});

const Circuit = sequelize.define("circuits", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  installation_date: {
    type: DataTypes.DATE,
  },
  is_main: {
    type: DataTypes.BOOLEAN,
  },
  meterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},
  // { freezeTableName: true }
);

Meter.hasMany(Circuit, {
  as: 'circuit', foreignKey: 'meterId'
});

Circuit.belongsTo(Meter, {
  as: 'meter', foreignKey: 'meterId'
});

Circuit.beforeCreate(async (circuit) => {
  const meter = await Meter.findByPk(circuit.meterId);
  if (!meter) {
    throw new Error('Meter not found');
  }
});

Circuit.sync({ force: false });

export default Circuit; 