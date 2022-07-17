import { AdminWakaf } from "../models/index.js";
import { Sequelize } from "sequelize";
const Op = Sequelize.Op;
import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(10);

export const putAdminWakaf = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const findAdminWakaf = await AdminWakaf.findOne({
      where: {
        id_admin_wakaf: id,
      },
    });

    if (findAdminWakaf) {
      const payload = {
        pwd: bcrypt.hashSync(password, salt),
      };

      const result = await AdminWakaf.update(payload, {
        where: {
          id_admin_wakaf: id,
        },
      });

      res.status(200).json({
        status: true,
        msg: "success",
        data: result,
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "user not found",
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
