import { Sequelize, DataTypes } from "sequelize";
import Sites from './sites'
const sequelize = new Sequelize('entities_manager', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
});

const Meters = sequelize.define("meters", {
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
  serial_number: {
    type: DataTypes.STRING,
    unique: true,
  },
  siteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},
  // { freezeTableName: true }
);

Sites.hasMany(Meters, { 
  as: 'meter', foreignKey: 'siteId'
});

Meters.belongsTo(Sites, {
  as: 'site', foreignKey: 'siteId' 
});

Meters.beforeCreate(async (meter) => {
  const site = await Sites.findByPk(meter.siteId);
  if (!site) {
    throw new Error('Site not found');
  }
});

Meters.sync({ force: false })

export default Meters;