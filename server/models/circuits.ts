import { Sequelize, DataTypes } from "sequelize";
import Meters from './meters'
const sequelize = new Sequelize('entities_manager', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
});

const Circuits = sequelize.define("circuits", {
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

Meters.hasMany(Circuits, {
  as: 'circuit', foreignKey: 'meterId'
});

Circuits.belongsTo(Meters, {
  as: 'meter', foreignKey: 'meterId'
});

Circuits.beforeCreate(async (circuit) => {
  const meter = await Meters.findByPk(circuit.meterId);
  if (!meter) {
    throw new Error('Meter not found');
  }
});

Circuits.sync({ force: false });

export default Circuits; 