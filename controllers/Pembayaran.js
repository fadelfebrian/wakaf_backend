import { Pembayaran } from "../models/index.js";

export const getAllPembayaran = async (req, res) => {
  try {
    const result = await Pembayaran.findAll({
      order: [["id_file_pembayaran", "DESC"]],
    });
    res.status(200).json({
      status: true,
      msg: "success",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      msg: err.message,
      data: null,
    });
  }
};

export const getOnePembayaran = async (req, res) => {
  try {
    const { id } = req.query;
    const result = await Pembayaran.findOne({
      where: {
        id_file_pembayaran: id,
      },
    });
    if (result) {
      res.status(200).json({
        status: true,
        msg: "success",
        data: result,
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "record not found",
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

export const getByNimPembayaran = async (req, res) => {
  try {
    const { nim } = req.query;
    const result = await Pembayaran.findAll({
      order: [["id_file_pembayaran", "DESC"]],
      where: {
        nim,
      },
    });
    if (result) {
      res.status(200).json({
        status: true,
        msg: "success",
        data: result,
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "record not found",
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
