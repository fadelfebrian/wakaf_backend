import { PesertaWakaf, Mahasiswa, Donatur } from "../models/index.js";
import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(10);

export const createDonatur = async (req, res) => {
  try {
    const payload = {
      ...req.body,
    };

    const findMhs = await Donatur.findOne({
      where: {
        nama: payload.nama,
      },
    });
    if (!findMhs) {
      const payloadSave = {
        nama: payload.nama,
        no_hp: payload.no_hp,
        email: payload.email,
        password: bcrypt.hashSync(payload.password, salt),
      };
      const create = await Donatur.create(payloadSave);
      res.status(200).json({
        status: true,
        msg: "success",
        data: create,
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "user already exist",
        data: null,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      msg: err.message,
      data: null,
    });
  }
};
