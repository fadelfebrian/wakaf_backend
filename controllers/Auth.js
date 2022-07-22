import { AdminWakaf, PesertaWakaf, Donatur } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
