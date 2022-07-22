import { Sequelize } from "sequelize";
import db from "../database/index.js";
const { DataTypes } = Sequelize;

const Donatur = db.define(
  "td_donatur",
  {
    id_donatur: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    nama: {
      type: DataTypes.CHAR(50),
    },
    no_hp: {
      type: DataTypes.CHAR(15),
    },
    email: {
      type: DataTypes.CHAR(50),
    },
    password: {
      type: DataTypes.CHAR(255),
    },
  },
  {
    freezeTable: true,
    timestamps: false,
    tableName: "td_donatur",
  }
);

export default Donatur;
