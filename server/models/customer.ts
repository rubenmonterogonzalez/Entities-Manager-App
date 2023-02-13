import { Sequelize, DataTypes } from "sequelize";
const sequelize = new Sequelize('entities_manager', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
});

const Customer = sequelize.define("customer", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  vat_number: {
    type: DataTypes.STRING,
    unique: true,
  },
},
  { freezeTableName: true }
);

Customer.sync({ force: false });

export default Customer;



