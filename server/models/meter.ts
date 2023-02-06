import { Sequelize, DataTypes } from "sequelize";
import Site from './site'
const sequelize = new Sequelize('entities_manager', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
});

const Meter = sequelize.define("meter", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    // defaultValue: sequelize.fn("cuid"),
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
    type: DataTypes.INTEGER,
  },
},
  { freezeTableName: true }
);

Site.hasMany(Meter, { 
  as: 'meter', foreignKey: 'siteId'
});

Meter.belongsTo(Site, {
  as: 'site', foreignKey: 'siteId' 
});

Meter.sync({ force: false })

export default Meter;