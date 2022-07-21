import { Pembayaran, Peminjaman } from "../models/index.js";
import moment from "moment";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.resolve(__dirname, "..");

export const savePembayaran = async (req, res) => {
  try {
    console.log("req.file", req.file);
    if (req.file) {
      let tmp_path = req.file.path;
      let originaExt =
        req.file.originalname.split(".")[
          req.file.originalname.split(".").length - 1
        ];
      let filename = req.file.filename + "." + originaExt;
      let target_path = path.resolve(
        rootPath,
        `public/uploads/pembayaran/${filename}`
      );
      const src = fs.createReadStream(tmp_path);
      const dest = fs.createWriteStream(target_path);
      const payload = {
        ...req.body,
        tgl_pembayaran: moment().format("YYYY-MM-DD"),
        tgl_entry: moment().format("YYYY-MM-DD"),
        file_transfer: filename,
        sts_pembayaran: 0,
      };
      src.pipe(dest);
      src.on("end", async () => {
        try {
          const result = await Pembayaran.create(payload);
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
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "bad request",
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

export const putPembayaran = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = { ...req.body };
    const result = await Pembayaran.findOne({
      where: {
        id_file_pembayaran: id,
      },
    });
    if (result) {
      const findPeminjaman = await Peminjaman.findOne({
        where: {
          id_peminjaman: result.dataValues.id_peminjam,
        },
      });

      if (payload.sts_pembayaran === "1") {
        const newSisa =
          parseInt(findPeminjaman.dataValues.sisa) -
          parseInt(result.dataValues.nominal);

        const payloadUpdatePeminjaman = {
          sisa: newSisa,
          sts_pembayaran: newSisa === 0 ? 1 : 0,
        };
        await Peminjaman.update(payloadUpdatePeminjaman, {
          where: {
            id_peminjaman: result.dataValues.id_peminjam,
          },
        });
      }

      const updateDonasi = await Pembayaran.update(payload, {
        where: {
          id_file_pembayaran: id,
        },
      });
      res.status(200).json({
        status: true,
        msg: "success",
        data: updateDonasi,
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
