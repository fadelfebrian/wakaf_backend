import { Sequelize } from "sequelize";
import db from "../database/index.js";
const { DataTypes } = Sequelize;

const Category = db.define(
  "td_peserta_wakaf",
  {
    id_peserta: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    nim_mhs: {
      type: DataTypes.CHAR(20),
    },
    nama_mhs: {
      type: DataTypes.CHAR(50),
    },
    prodi: {
      type: DataTypes.CHAR(50),
    },
    no_hp: {
      type: DataTypes.CHAR(20),
    },
    email: {
      type: DataTypes.CHAR(50),
    },
    password: {
      type: DataTypes.CHAR(100),
    },
    verifikasi: {
      type: DataTypes.CHAR(1),
    },
    token: {
      type: DataTypes.CHAR(100),
    },
    tanggal_daftar: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTable: true,
    timestamps: false,
    tableName: "td_peserta_wakaf",
  }
);

export default Category;
