import { Peminjaman, JadwalWawancara } from "../models/index.js";
import { upload } from "../helper/upload.js";
import moment from "moment";
import { QueryTypes } from "sequelize";
import db from "../database/index.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.resolve(__dirname, "..");

export const getAllPeminjaman = async (req, res) => {
  try {
    const query = `SELECT id_peminjaman,nim,jenis_pinjaman,tgl_pengajuan,file_bukti_krs,file_tagihan,file_krs_ta,file_s_persetujuan,file_s_materai,sts_pengajuan,sts_peminjaman,sts_pembayaran,nominal,sisa,tgl_jatuh_tempo,pesan,nama_mhs,prodi,no_hp,email FROM TD_PEMINJAMAN LEFT JOIN TD_PESERTA_WAKAF ON TD_PEMINJAMAN.NIM = TD_PESERTA_WAKAF.NIM_MHS ORDER BY ID_PEMINJAMAN DESC`;
    const detail = await db.query(query, { type: QueryTypes.SELECT });
    // const result = await Peminjaman.findAll({
    //   order: [["id_peminjaman", "DESC"]],
    // });
    res.status(200).json({
      status: true,
      msg: "success",
      data: detail,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      msg: err.message,
      data: null,
    });
  }
};

export const getOnePeminjaman = async (req, res) => {
  try {
    const { id } = req.query;
    const result = await Peminjaman.findOne({
      where: {
        id_peminjaman: id,
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

export const getDetailPeminjaman = async (req, res) => {
  try {
    const { id } = req.query;
    const query = `SELECT id_peminjaman,nim,jenis_pinjaman,tgl_pengajuan,file_bukti_krs,file_tagihan,file_krs_ta,file_s_persetujuan,file_s_materai,sts_pengajuan,sts_peminjaman,sts_pembayaran,nominal,sisa,tgl_jatuh_tempo,pesan,nama_mhs,prodi,no_hp,email FROM TD_PEMINJAMAN LEFT JOIN TD_PESERTA_WAKAF ON TD_PEMINJAMAN.NIM = TD_PESERTA_WAKAF.NIM_MHS WHERE id_peminjaman = ${id} LIMIT 1`;
    const detail = await db.query(query, { type: QueryTypes.SELECT });

    if (detail) {
      res.status(200).json({
        status: true,
        msg: "success",
        data: detail[0],
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

export const getByNimPeminjaman = async (req, res) => {
  try {
    const { nim } = req.query;
    const result = await Peminjaman.findAll({
      order: [["id_peminjaman", "DESC"]],
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

export const putPeminjaman = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = { ...req.body };
    const result = await Peminjaman.findOne({
      where: {
        id_peminjaman: id,
      },
    });

    if (result) {
      if (payload?.pesan) {
        const updateWawancara = { hasil: payload?.pesan };
        const findWawancara = await JadwalWawancara.findOne({
          where: {
            id_peminjam: result.dataValues.id_peminjaman,
          },
        });
        console.log("findWawancara", findWawancara);
        const updatedWawancara = await JadwalWawancara.update(updateWawancara, {
          where: { id_jadwal: findWawancara.dataValues.id_jadwal },
        });
      }
      if (payload?.id_peminjam) {
        const createJadwalWawancara = await JadwalWawancara.create(payload);
        console.log("createJadwalWawancara", createJadwalWawancara);
      }

      const updateDonasi = await Peminjaman.update(payload, {
        where: {
          id_peminjaman: id,
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
export const putPeminjamanUpload = async (req, res) => {
  try {
    if (req.file) {
      const { id } = req.params;
      let tmp_path = req.file.path;
      let originaExt =
        req.file.originalname.split(".")[
          req.file.originalname.split(".").length - 1
        ];
      let filename = req.file.filename + "." + originaExt;
      let target_path = path.resolve(
        rootPath,
        `public/uploads/peminjaman/${filename}`
      );
      const src = fs.createReadStream(tmp_path);
      const dest = fs.createWriteStream(target_path);
      const payload = {
        ...req.body,
        file_krs_ta: filename,
      };
      src.pipe(dest);
      src.on("end", async () => {
        try {
          const result = await Peminjaman.update(payload, {
            where: {
              id_peminjaman: id,
            },
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

export const savePeminjaman = async (req, res) => {
  try {
    if (req.files) {
      const { jenis_pinjaman, nominal, nim } = req.body;
      const uploadedFiles = await upload(req.files, "peminjaman");
      const payload = {
        jenis_pinjaman,
        nominal,
        sts_pengajuan: 0,
        sts_peminjaman: 0,
        sts_pembayaran: 0,
        sisa: nominal,
        tgl_pengajuan: moment().format("YYYY-MM-DD HH:mm:ss"),
        tgl_jatuh_tempo: moment().format("YYYY-MM-DD"),
        file_bukti_krs: uploadedFiles.file_krs,
        file_tagihan: uploadedFiles.file_tagihan,
        file_s_persetujuan: uploadedFiles.file_persetujuan,
        file_s_materai: uploadedFiles.file_materai,
        file_krs_ta: 0,
        nim,
      };
      const createPeminjaman = await Peminjaman.create(payload);
      res.status(200).json({
        status: true,
        msg: "success",
        data: createPeminjaman,
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
