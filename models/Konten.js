import { Sequelize } from "sequelize";
import db from "../database/index.js";
const { DataTypes } = Sequelize;

const Category = db.define(
  "konten",
  {
    id_halaman: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    gambar: {
      type: DataTypes.CHAR(100),
    },
    kategori: {
      type: DataTypes.CHAR(100),
    },
    deskripsi_kategori: {
      type: DataTypes.CHAR(100),
    },
    judul: {
      type: DataTypes.CHAR(255),
    },
    judul_seo: {
      type: DataTypes.TEXT,
    },
    detail: {
      type: DataTypes.TEXT,
    },
    petugas_input: {
      type: DataTypes.CHAR(50),
    },
    petugas_update: {
      type: DataTypes.CHAR(50),
    },
    waktu_terbit: {
      type: DataTypes.DATE,
    },
    waktu_update: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTable: true,
    timestamps: false,
    tableName: "konten",
  }
);

export default Category;
