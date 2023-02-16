import { Sequelize, DataTypes } from "sequelize";
import Customer from './customer';
const sequelize = new Sequelize('entities_manager', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
});

const Site = sequelize.define("sites", {
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
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},
  // { freezeTableName: true }
);

Customer.hasMany(Site, { 
  as: 'site', foreignKey: 'customerId'
});

Site.belongsTo(Customer, { 
  as: 'customer', foreignKey: 'customerId' 
});

Site.beforeCreate(async (site) => {
  const customer = await Customer.findByPk(site.customerId);
  if (!customer) {
    throw new Error('Customer not found');
  }
});

Site.sync({ force: false })

export default Site;