import express from "express";
import multer from "multer";
const router = express.Router();
import os from "os";
import {
  getAllPesertaWakaf,
  getOnePesertaWakaf,
  savePesertaWakaf,
  activateAccount,
  lengkapiData,
} from "../controllers/PesertaWakaf.js";
import {
  getAllDonasi,
  getOneDonasi,
  saveDonasi,
  putDonasi,
} from "../controllers/Donasi.js";
import {
  getAllPeminjaman,
  getOnePeminjaman,
  getByNimPeminjaman,
  putPeminjaman,
  savePeminjaman,
  getDetailPeminjaman,
} from "../controllers/Peminjaman.js";

import {
  getAllPembayaran,
  getOnePembayaran,
  getByNimPembayaran,
  savePembayaran,
  putPembayaran,
} from "../controllers/Pembayaran.js";

import { authUser } from "../controllers/Auth.js";
import { putAdminWakaf } from "../controllers/AdminWakaf.js";

// Menu
router.get("/pesertaWakaf/getAll", getAllPesertaWakaf);
router.get("/pesertaWakaf/getOne", getOnePesertaWakaf);
router.post("/pesertaWakaf/save", savePesertaWakaf);
router.get("/pesertaWakaf/activate", activateAccount);
router.put(
  "/pesertaWakaf/lengkapidata/:id",
  multer({ dest: os.tmpdir() }).fields([
    {
      name: "file_ktp",
      maxCount: 1,
    },
    {
      name: "file_ktp_ortu",
      maxCount: 1,
    },
    {
      name: "file_kk",
      maxCount: 1,
    },
  ]),
  lengkapiData
);

router.get("/donasi/getAll", getAllDonasi);
router.get("/donasi/getOne", getOneDonasi);
router.put("/donasi/put/:id", putDonasi);
router.post(
  "/donasi/save",
  multer({ dest: os.tmpdir() }).single("file_donasi"),
  saveDonasi
);

// PEMINJAMAN
router.get("/peminjaman/getAll", getAllPeminjaman);
router.get("/peminjaman/getOne", getOnePeminjaman);
router.get("/peminjaman/getDetail", getDetailPeminjaman);
router.get("/peminjaman/getByNim", getByNimPeminjaman);
router.put("/peminjaman/put/:id", putPeminjaman);
router.post(
  "/peminjaman/post",
  multer({ dest: os.tmpdir() }).fields([
    {
      name: "file_krs",
      maxCount: 1,
    },
    {
      name: "file_tagihan",
      maxCount: 1,
    },
    {
      name: "file_persetujuan",
      maxCount: 1,
    },
    {
      name: "file_materai",
      maxCount: 1,
    },
  ]),
  lengkapiData
);

// PEMBAYARAN
router.get("/pembayaran/getAll", getAllPembayaran);
router.get("/pembayaran/getOne", getOnePembayaran);
router.get("/pembayaran/getByNim", getByNimPembayaran);
router.post(
  "/pembayaran/save",
  multer({ dest: os.tmpdir() }).single("file_transfer"),
  savePembayaran
);
router.put("/pembayaran/put/:id", putPembayaran);

// AUTH
router.post("/auth", authUser);

// ADMIN WAKAF
router.put("/adminWakaf/put/:id", putAdminWakaf);

export default router;
