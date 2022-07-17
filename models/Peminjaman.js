import { Sequelize } from "sequelize";
import db from "../database/index.js";
const { DataTypes } = Sequelize;

const Category = db.define(
  "td_peminjaman",
  {
    id_peminjaman: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    nim: {
      type: DataTypes.CHAR(20),
    },
    jenis_pinjaman: {
      type: DataTypes.CHAR(2),
    },
    tgl_pengajuan: {
      type: DataTypes.DATE,
    },
    file_bukti_krs: {
      type: DataTypes.CHAR(255),
    },
    file_tagihan: {
      type: DataTypes.CHAR(255),
    },
    file_krs_ta: {
      type: DataTypes.CHAR(255),
    },
    file_s_persetujuan: {
      type: DataTypes.CHAR(255),
    },
    file_s_materai: {
      type: DataTypes.CHAR(255),
    },
    sts_pengajuan: {
      type: DataTypes.CHAR(1),
    },
    sts_peminjaman: {
      type: DataTypes.CHAR(1),
    },
    sts_pembayaran: {
      type: DataTypes.CHAR(1),
    },
    nominal: {
      type: DataTypes.INTEGER,
    },
    sisa: {
      type: DataTypes.INTEGER,
    },
    tgl_jatuh_tempo: {
      type: DataTypes.DATE,
    },
    pesan: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTable: true,
    timestamps: false,
    tableName: "td_peminjaman",
  }
);

export default Category;
