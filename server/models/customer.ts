// import mongoose from "mongoose";

// const schema = new mongoose.Schema(
//   {
//     customerId: {
//       type: Number
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     vat_number: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Customer", schema, "customer");

import {Sequelize} from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL);

const Customer = sequelize.define('Customer', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    defaultValue: Sequelize.fn('cuid')
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  vat_number: {
    type: Sequelize.STRING,
    unique: true
  },
  name: {
    type: Sequelize.STRING
  }
});

const Site = sequelize.define('Site', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    defaultValue: Sequelize.fn('cuid')
  },
  address: {
    type: Sequelize.STRING
  },
  post_code: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  coordinates: {
    type: Sequelize.STRING
  },
  customerId: {
    type: Sequelize.STRING
  }
});

const Meter = sequelize.define('Meter', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    defaultValue: Sequelize.fn('cuid')
  },
  installation_date: {
    type: Sequelize.DATE
  },
  serial_number: {
    type: Sequelize.STRING,
    unique: true
  },
  name: {
    type: Sequelize.STRING
  },
  siteId: {
    type: Sequelize.STRING
  }
});

const Circuit = sequelize.define('Circuit', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    defaultValue: Sequelize.fn('cuid')
  },
  installation_date: {
    type: Sequelize.DATE
  },
  is_main: {
    type: Sequelize.BOOLEAN
  },
  name: {
    type: Sequelize.STRING
  },
  meterId: {
    type: Sequelize.STRING
  }
});

Customer.hasMany(Site, { foreignKey: 'customerId' });
Site.belongsTo(Customer, { foreignKey: 'customerId' });
Site.hasMany(Meter, { foreignKey: 'siteId' });
Meter.belongsTo(Site, { foreignKey: 'siteId' });
Meter.hasMany(Circuit, { foreignKey: 'meterId' });
Circuit.belongsTo(Meter, { foreignKey: 'meterId' });

