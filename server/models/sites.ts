import { Sequelize, DataTypes } from "sequelize";
import Customers from './customers';

const sequelize = new Sequelize('entities_manager', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
});

const Sites = sequelize.define("sites", {
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
    // allowNull: false,
  },
},
  // { freezeTableName: true }
);

Customers.hasMany(Sites, { 
  as: 'site', foreignKey: 'customerId'
});

Sites.belongsTo(Customers, { 
  as: 'customer', foreignKey: 'customerId' 
});

Sites.beforeCreate(async (site) => {
  const customer = await Customers.findByPk(site.customerId);
  if (!customer) {
    throw new Error('Customer not found');
  }
});

Sites.sync({ force: false })

export default Sites;