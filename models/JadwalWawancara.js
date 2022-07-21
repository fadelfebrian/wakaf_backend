import { Sequelize } from "sequelize";
import db from "../database/index.js";
const { DataTypes } = Sequelize;

const Category = db.define(
  "jadwal_wawancara",
  {
    id_jadwal: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    id_peminjam: {
      type: DataTypes.INTEGER,
    },
    tanggal: {
      type: DataTypes.DATE,
    },
    waktu: {
      type: DataTypes.CHAR(10),
    },
    tempat: {
      type: DataTypes.CHAR(100),
    },
    verifikator: {
      type: DataTypes.CHAR(10),
    },
    hasil: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTable: true,
    timestamps: false,
    tableName: "jadwal_wawancara",
  }
);

export default Category;
