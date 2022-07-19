import PesertaWakaf from "./PesertaWakaf.js";
import Mahasiswa from "./Mahasiswa.js";
import Donasi from "./Donasi.js";
import Peminjaman from "./Peminjaman.js";
import Pembayaran from "./Pembayaran.js";
import AdminWakaf from "./AdminWakaf.js";

PesertaWakaf.hasOne(Mahasiswa, {
  onDelete: "RESTRICT",
  foreignKey: "nim",
  foreignKeyConstraint: true,
});

Peminjaman.hasOne(PesertaWakaf, {
  onDelete: "RESTRICT",
  foreignKey: "nim_mhs",
  foreignKeyConstraint: true,
});

Mahasiswa.belongsTo(PesertaWakaf, {
  foreignKey: "nim",
});
PesertaWakaf.belongsTo(Mahasiswa, {
  foreignKey: "nim_mhs",
});

export { PesertaWakaf, Mahasiswa, Donasi, Peminjaman, Pembayaran, AdminWakaf };
