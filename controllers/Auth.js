import { AdminWakaf, PesertaWakaf, Donatur } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const salt = bcrypt.genSaltSync(10);

export const changePassword = async (req, res) => {
  try {
    const { user_type, id, new_password, old_password } = req.body;
    // const payload = { ...req.body };
    let user = null;
    let passwordUser = null;

    if (user_type == "1") {
      user = await PesertaWakaf.findOne({
        where: {
          id_peserta: id,
        },
      });
    } else if (user_type == "2") {
      user = await AdminWakaf.findOne({
        where: {
          id_admin_wakaf: id,
        },
      });
    } else if (user_type == "3") {
      user = await Donatur.findOne({
        where: {
          id_donatur: id,
        },
      });
    }

    if (user === null) {
      return res.status(400).json({
        status: false,
        msg: "user not exist",
      });
    }

    if (user_type == "1" || user_type == "3") {
      passwordUser = user.dataValues.password;
    } else if (user_type == "2") {
      passwordUser = user.dataValues.pwd;
    }

    if (bcrypt.compareSync(old_password, passwordUser)) {
      let resultChangePassword = null;
      const payloadChangePasswordAdmin = {
        pwd: bcrypt.hashSync(new_password, salt),
      };
      const payloadChangePasswordMhs = {
        password: bcrypt.hashSync(new_password, salt),
      };

      if (user_type == "1") {
        resultChangePassword = await PesertaWakaf.update(
          payloadChangePasswordMhs,
          {
            where: {
              id_peserta: id,
            },
          }
        );
      } else if (user_type == "2") {
        resultChangePassword = await AdminWakaf.update(
          payloadChangePasswordAdmin,
          {
            where: {
              id_admin_wakaf: id,
            },
          }
        );
      } else if (user_type == "3") {
        user = await Donatur.update(payloadChangePasswordMhs, {
          where: {
            id_donatur: id,
          },
        });
      }

      return res.status(200).json({
        status: true,
        msg: "success",
        data: resultChangePassword,
      });
    } else {
      return res.status(400).json({
        status: false,
        msg: "password not match",
      });
    }

    return res.status(200).json({
      status: true,
      msg: "success",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      msg: err.message,
      data: null,
    });
  }
};

export const authUser = async (req, res) => {
  try {
    let user = null;
    let passwordUser = null;
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

    if (user_type == "1" || user_type == "3") {
      passwordUser = user.dataValues.password;
    } else if (user_type == "2") {
      passwordUser = user.dataValues.pwd;
    }

    if (user_type == "1" && user.verifikasi == 0) {
      return res.status(400).json({
        status: false,
        msg: "user not activated",
        data: null,
      });
    }

    if (bcrypt.compareSync(password, passwordUser)) {
      // const { id_user } = user;
      const accessToken = jwt.sign({ username }, process.env.TOKEN_KEY, {
        expiresIn: "24h",
      });
      let result = {
        user: user,
        token: accessToken,
        isMahasiswa: user_type == "1" ? true : false,
        isVerifikator: user_type == "2" ? true : false,
        isDonatur: user_type == "3" ? true : false,
      };
      return res.status(200).json({
        status: true,
        msg: "success",
        data: result,
      });
    } else {
      return res.status(400).json({
        status: false,
        msg: "password not match",
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
