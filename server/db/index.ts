import mysql, { Connection } from 'mysql2';
import type { Nitro } from 'nitropack';

const config = useRuntimeConfig();

type NitroWithMysql = Nitro & {
  mysql: Connection;
};

export const db = async (_nitroApp: NitroWithMysql) => {
  try {
    const connection = mysql.createConnection({
      host: config.DB_HOST,
      user: config.DB_USER,
      password: config.DB_PASSWORD,
      database: config.DB_NAME
    });
    console.log("DB connection established.");
    _nitroApp.mysql = connection;
  } catch (err) {
    console.log("DB connection failed.", err);
  }
};

export default db;