import { Sequelize } from "sequelize";
import db from "../database/index.js";
const { DataTypes } = Sequelize;

const Category = db.define(
  "td_pembayaran",
  {
    id_file_pembayaran: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    id_peminjam: {
      type: DataTypes.INTEGER,
    },
    nim: {
      type: DataTypes.CHAR(20),
    },
    jenis_pinjaman: {
      type: DataTypes.CHAR(2),
    },
    file_transfer: {
      type: DataTypes.CHAR(100),
    },
    nominal: {
      type: DataTypes.INTEGER,
    },
    sts_pembayaran: {
      type: DataTypes.CHAR(1),
    },
    tgl_pembayaran: {
      type: DataTypes.DATE,
    },
    pesan: {
      type: DataTypes.TEXT,
    },
    tgl_entry: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTable: true,
    timestamps: false,
    tableName: "td_pembayaran",
  }
);

export default Category;
