import { Sequelize } from "sequelize";
import db from "../database/index.js";
const { DataTypes } = Sequelize;

const Category = db.define(
  "td_admin_wakaf",
  {
    id_admin_wakaf: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    username: {
      type: DataTypes.CHAR(20),
    },
    kategori: {
      type: DataTypes.CHAR(20),
    },
    akses: {
      type: DataTypes.CHAR(1),
    },
    deskripsi_akses: {
      type: DataTypes.CHAR(30),
    },
    instansi: {
      type: DataTypes.CHAR(50),
    },
    nama: {
      type: DataTypes.CHAR(50),
    },
    pwd: {
      type: DataTypes.CHAR(100),
    },
    tgl: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTable: true,
    timestamps: false,
    tableName: "td_admin_wakaf",
  }
);

export default Category;
