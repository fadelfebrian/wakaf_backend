import { Donasi } from "../models/index.js";
import moment from "moment";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import db from "../database/index.js";
import { QueryTypes } from "sequelize";

const rootPath = path.resolve(__dirname, "..");

export const saveDonasi = async (req, res) => {
  try {
    if (req.file) {
      let tmp_path = req.file.path;
      let originaExt =
        req.file.originalname.split(".")[
          req.file.originalname.split(".").length - 1
        ];
      let filename = req.file.filename + "." + originaExt;
      let target_path = path.resolve(
        rootPath,
        `public/uploads/donasi/${filename}`
      );
      const src = fs.createReadStream(tmp_path);
      const dest = fs.createWriteStream(target_path);
      const payload = {
        ...req.body,
        tgl_pembayaran: moment().format("YYYY-MM-DD"),
        file_donasi: filename,
        sts_donasi: 0,
      };

      src.pipe(dest);
      src.on("end", async () => {
        try {
          const result = await Donasi.create(payload);
          console.log("result", result);
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

export const getAllDonasi = async (req, res) => {
  try {
    const result = await Donasi.findAll({
      order: [["id_donasi", "DESC"]],
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

export const getAllDonasiByName = async (req, res) => {
  try {
    const { nama } = req.query;
    const result = await Donasi.findAll({
      where: {
        nama,
      },
      order: [["id_donasi", "DESC"]],
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

export const getTotalDonasi = async (req, res) => {
  try {
    const query =
      "SELECT SUM(NOMINAL) AS jml_donasi FROM TD_DONASI WHERE STS_DONASI = 1";
    const JML = await db.query(query, { type: QueryTypes.SELECT });
    res.status(200).json({
      status: true,
      msg: "success",
      data: JML[0],
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      msg: err.message,
      data: null,
    });
  }
};

export const getAllDonasiVerified = async (req, res) => {
  try {
    const result = await Donasi.findAll({
      where: {
        sts_donasi: 1,
      },
      order: [["id_donasi", "DESC"]],
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

export const getOneDonasi = async (req, res) => {
  try {
    const { id } = req.query;

    const result = await Donasi.findOne({
      where: {
        id_donasi: id,
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

export const putDonasi = async (req, res) => {
  try {
    const { id } = req.params;
    const { sts_donasi } = req.body;
    const result = await Donasi.findOne({
      where: {
        id_donasi: id,
      },
    });
    const payload = {
      sts_donasi,
    };
    if (result) {
      const updateDonasi = await Donasi.update(payload, {
        where: {
          id_donasi: id,
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
