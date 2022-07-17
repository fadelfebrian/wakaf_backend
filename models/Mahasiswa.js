import { Sequelize } from "sequelize";
import db from "../database/index.js";
const { DataTypes } = Sequelize;

const Category = db.define(
  "td_mahasiswa",
  {
    nim: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.CHAR(20),
    },
    nama: {
      type: DataTypes.CHAR(100),
    },
    prodi: {
      type: DataTypes.CHAR(50),
    },
    alamat: {
      type: DataTypes.TEXT,
    },
    hp: {
      type: DataTypes.CHAR(20),
    },
    tempat_lahir: {
      type: DataTypes.CHAR(100),
    },
    tgl_lahir: {
      type: DataTypes.CHAR(50),
    },
    kode_pos: {
      type: DataTypes.CHAR(10),
    },
    jenis_kelamin: {
      type: DataTypes.CHAR(1),
    },
    email: {
      type: DataTypes.CHAR(50),
    },
  },
  {
    freezeTable: true,
    timestamps: false,
    tableName: "td_mahasiswa",
  }
);

export default Category;
