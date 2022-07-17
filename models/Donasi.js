import { Sequelize } from "sequelize";
import db from "../database/index.js";
const { DataTypes } = Sequelize;

const Category = db.define(
  "td_donasi",
  {
    id_donasi: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    nama: {
      type: DataTypes.CHAR(100),
    },
    no_handphone: {
      type: DataTypes.CHAR(15),
    },
    email: {
      type: DataTypes.CHAR(50),
    },
    anonim: {
      type: DataTypes.CHAR(1),
    },
    nominal: {
      type: DataTypes.INTEGER,
    },
    tgl_pembayaran: {
      type: DataTypes.DATE,
    },
    file_donasi: {
      type: DataTypes.CHAR(100),
    },
    sts_donasi: {
      type: DataTypes.CHAR(1),
    },
    pesan_gagal: {
      type: DataTypes.TEXT,
    },
    pesan_donasi: {
      type: DataTypes.TEXT,
    },
    tgl_entry: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTable: true,
    timestamps: false,
    tableName: "td_donasi",
  }
);

export default Category;
