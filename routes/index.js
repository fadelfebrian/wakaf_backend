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
  forgetPassword,
  updateTokenMsg,
} from "../controllers/PesertaWakaf.js";
import {
  getAllDonasi,
  getOneDonasi,
  saveDonasi,
  putDonasi,
  getAllDonasiVerified,
  getAllDonasiByName,
  getTotalDonasi,
} from "../controllers/Donasi.js";
import {
  getAllPeminjaman,
  getOnePeminjaman,
  getByNimPeminjaman,
  putPeminjaman,
  savePeminjaman,
  getDetailPeminjaman,
  putPeminjamanUpload,
  getListPerpanjangan,
  putPengajuanPerpanjangan,
  getAllPerpanjangan,
  saveWawancara,
  putPerpanjanganAdmin,
  getDetailPerpanjangan,
  getPeminjamanValidated,
  getPaidPembayaran,
  getSummaryPeminjaman,
  getAllKonten,
} from "../controllers/Peminjaman.js";

import {
  getAllPembayaran,
  getOnePembayaran,
  getByNimPembayaran,
  savePembayaran,
  putPembayaran,
} from "../controllers/Pembayaran.js";

import { authUser, changePassword } from "../controllers/Auth.js";
import { putAdminWakaf } from "../controllers/AdminWakaf.js";
import { createDonatur } from "../controllers/Donatur.js";

// Menu
router.get("/pesertaWakaf/getAll", getAllPesertaWakaf);
router.get("/pesertaWakaf/getOne", getOnePesertaWakaf);
router.post("/pesertaWakaf/save", savePesertaWakaf);
router.post("/pesertaWakaf/forgetPassword", forgetPassword);
router.get("/pesertaWakaf/activate", activateAccount);
router.put("/pesertaWakaf/updateTokenMsg/:id", updateTokenMsg);
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

router.get("/donasi/getTotalDonasi", getTotalDonasi);
router.get("/donasi/getAll", getAllDonasi);
router.get("/donasi/getOne", getOneDonasi);
router.get("/donasi/getAllDonasiVerified", getAllDonasiVerified);
router.get("/donasi/getAllDonasiByName", getAllDonasiByName);
router.put("/donasi/put/:id", putDonasi);
router.post(
  "/donasi/save",
  multer({ dest: os.tmpdir() }).single("file_donasi"),
  saveDonasi
);

// PEMINJAMAN
router.get("/peminjaman/getAll", getAllPeminjaman);
router.get("/konten/getAll", getAllKonten);
router.get("/peminjaman/getSummaryPeminjaman", getSummaryPeminjaman);
router.post("/peminjaman/createWawancara", saveWawancara);
router.put("/peminjaman/putPerpanjanganAdmin/:id", putPerpanjanganAdmin);
router.get("/peminjaman/getListPerpanjangan", getListPerpanjangan);
router.get("/peminjaman/getPeminjamanValidated", getPeminjamanValidated);
router.get("/peminjaman/getPaidPembayaran", getPaidPembayaran);
router.get("/peminjaman/getOne", getOnePeminjaman);
router.get("/peminjaman/getDetail", getDetailPeminjaman);
router.get("/peminjaman/getDetailPerpanjangan", getDetailPerpanjangan);
router.get("/peminjaman/getByNim", getByNimPeminjaman);
router.get("/peminjaman/getAllPerpanjangan", getAllPerpanjangan);
router.put("/peminjaman/put/:id", putPeminjaman);
router.put(
  "/peminjaman/putPengajuanPerpanjangan/:id",
  putPengajuanPerpanjangan
);
router.put(
  "/peminjaman/putUpload/:id",
  multer({ dest: os.tmpdir() }).single("file_krs_ta"),
  putPeminjamanUpload
);
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
  savePeminjaman
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
router.post("/auth/changePassword", changePassword);

// ADMIN WAKAF
router.put("/adminWakaf/put/:id", putAdminWakaf);

// donatur
router.post("/donatur/createDonatur", createDonatur);

export default router;
