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
    is_valid_user: {
      type: DataTypes.BOOLEAN,
    },
    no_ktp_mhs: {
      type: DataTypes.CHAR(50),
    },
    alamat_ktp_mhs: {
      type: DataTypes.TEXT,
    },
    alamat_dom_mhs: {
      type: DataTypes.TEXT,
    },
    nm_ortu: {
      type: DataTypes.CHAR(100),
    },
    no_hp_ortu: {
      type: DataTypes.CHAR(20),
    },
    alamat_dom_ortu: {
      type: DataTypes.TEXT,
    },
    file_ktp: {
      type: DataTypes.CHAR(255),
    },
    file_ktp_ortu: {
      type: DataTypes.CHAR(255),
    },
    file_kk: {
      type: DataTypes.CHAR(255),
    },
  },
  {
    freezeTable: true,
    timestamps: false,
    tableName: "td_peserta_wakaf",
  }
);

export default Category;
