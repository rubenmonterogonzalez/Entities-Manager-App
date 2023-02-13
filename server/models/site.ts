import { Sequelize, DataTypes } from "sequelize";
import Customer from './customer';
const sequelize = new Sequelize('entities_manager', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
});

const Site = sequelize.define("site", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  post_code: {
    type: DataTypes.STRING,
  },
  coordinates: {
    type: DataTypes.JSON,
  },
  customerId: {
    type: DataTypes.STRING,
    unique: true,
  },
},
  { freezeTableName: true }
);

Customer.hasMany(Site, { 
  as: 'site', foreignKey: 'customerId'
});

Site.belongsTo(Customer, { 
  as: 'customer', foreignKey: 'customerId' 
});

Site.sync({ force: false })

export default Site;