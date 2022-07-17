import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const database = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    operatorsAliases: 0,
    host: process.env.DB_HOST,
    pool: {
      max: 5,
      min: 2,
      idle: 20000,
      acquire: 200000,
    },
  }
);

export default database;
