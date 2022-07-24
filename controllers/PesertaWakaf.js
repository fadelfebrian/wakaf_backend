import { PesertaWakaf, Mahasiswa } from "../models/index.js";
import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(10);
const tokenSalt = bcrypt.genSaltSync(5);
import { sentMail } from "../helper/mail.js";
import { upload } from "../helper/upload.js";

export const savePesertaWakaf = async (req, res) => {
  try {
    const payload = {
      ...req.body,
    };

    const findMhs = await Mahasiswa.findOne({
      where: {
        nim: payload.nim,
      },
    });
    if (findMhs) {
      const result = await PesertaWakaf.findOne({
        where: {
          nim_mhs: payload.nim,
        },
      });

      if (!result) {
        const payloadSave = {
          nim_mhs: findMhs.nim,
          nama_mhs: findMhs.nama,
          prodi: findMhs.prodi,
          email: payload.email,
          no_hp: payload.no_hp,
          password: bcrypt.hashSync(payload.password, salt),
          token: bcrypt.hashSync(findMhs.nama, tokenSalt),
          verifikasi: "0",
        };

        const { dataValues } = await PesertaWakaf.create(payloadSave);
        const sendMail = await sentMail(
          req.body.email,
          findMhs.nama,
          payloadSave.token
        );
        if (sendMail) {
          console.log("email sent");
        } else {
          console.log("email fail sent");
        }
        res.status(200).json({
          status: true,
          msg: "success",
          data: dataValues,
        });
      } else {
        res.status(400).json({
          status: false,
          msg: "user already exist",
          data: null,
        });
      }
    } else {
      res.status(400).json({
        status: false,
        msg: "mahasiswa not found",
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

export const activateAccount = async (req, res) => {
  try {
    const { token } = req.query;
    const findToken = await PesertaWakaf.findOne({
      where: {
        token: token,
      },
    });
    if (findToken) {
      const payload = {
        verifikasi: "1",
      };
      const updatedUser = PesertaWakaf.update(payload, {
        where: {
          id_peserta: findToken.id_peserta,
        },
      });
      res.status(200).json({
        status: true,
        msg: "success",
        data: "account activated",
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "token not found",
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

export const forgetPassword = async (req, res) => {
  try {
    let user = null;
    const { username, password, user_type } = req.body;
    if (user_type == "1") {
      user = await PesertaWakaf.findOne({
        where: {
          nim_mhs: username,
        },
      });
    } else if (user_type == "2") {
      user = await AdminWakaf.findOne({
        where: {
          username,
        },
      });
    } else if (user_type == "3") {
      user = await Donatur.findOne({
        where: {
          nama: username,
        },
      });
    }

    if (user === null) {
      return res.status(400).json({
        status: false,
        msg: "user not exist",
      });
    }

    let result = null;
    const payload = {
      password: bcrypt.hashSync(password, salt),
    };
    if (user_type == "1") {
      result = await PesertaWakaf.update(payload, {
        where: {
          nim_mhs: username,
        },
      });
    } else if (user_type == "2") {
      result = await AdminWakaf.update(payload, {
        where: {
          username,
        },
      });
    } else if (user_type == "3") {
      result = await Donatur.update(payload, {
        where: {
          nama: username,
        },
      });
    }

    if (result !== null) {
      return res.status(200).json({
        status: true,
        msg: "success",
        data: result,
      });
    } else {
      return res.status(400).json({
        status: false,
        msg: "success",
        data: null,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      msg: err.message,
      data: null,
    });
  }
};

export const getAllPesertaWakaf = async (req, res) => {
  try {
    const result = await PesertaWakaf.findAll({
      order: [["id_peserta", "DESC"]],
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

export const getOnePesertaWakaf = async (req, res) => {
  try {
    const { id } = req.query;

    const result = await PesertaWakaf.findOne({
      include: [Mahasiswa],
      where: {
        id_peserta: id,
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

export const lengkapiData = async (req, res) => {
  try {
    if (req.files) {
      const { id } = req.params;
      const {
        no_ktp_mhs,
        alamat_ktp_mhs,
        alamat_dom_mhs,
        nm_ortu,
        no_hp_ortu,
        alamat_dom_ortu,
      } = req.body;
      const uploadedFiles = await upload(req.files, "peserta_wakaf");
      const payload = {
        no_ktp_mhs,
        alamat_ktp_mhs,
        alamat_dom_mhs,
        nm_ortu,
        no_hp_ortu,
        alamat_dom_ortu,
        is_valid_user: 1,
        file_ktp: uploadedFiles.file_ktp,
        file_ktp_ortu: uploadedFiles.file_ktp_ortu,
        file_kk: uploadedFiles.file_kk,
      };
      const createPeminjaman = await PesertaWakaf.update(payload, {
        where: {
          id_peserta: id,
        },
      });
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
