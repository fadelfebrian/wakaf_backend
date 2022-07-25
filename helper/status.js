const helper = {
  statusPengajuan: (params) => {
    switch (params) {
      case "0":
        return "Proses Pengajuan";
      case "1":
        return "Menunggu Diverifikasi";
      case "2":
        return "Sedang Diverifikasi";
      case "4":
        return "Verifikasi Berhasil";
      case "3":
      case "5":
        return "Gagal Diverifikasi";
      case "6":
        return "Pengajuan Ditolak";
      default:
        return "";
    }
  },
  statusPeminjaman: (params) => {
    switch (params) {
      case "0":
        return "Proses Pengajuan";
      case "1":
        return "Pengajuan Diterima";
      case "2":
        return "Pengajuan Ditolak";
      default:
        return "";
    }
  },
  statusPembayaran: (params) => {
    switch (params) {
      case "0":
        return "Belum Lunas";
      case "1":
        return "Lunas";
      default:
        return "";
    }
  },
  statusVerifikatorPembayaran: (params) => {
    switch (params) {
      case "0":
        return "Belum Divalidasi";
      case "1":
        return "Sudah Divalidai";
      default:
        return "";
    }
  },
  statusUser: (params) => {
    switch (params) {
      case 1:
        return "Data Sudah Lengkap";
      case 0:
        return "Data Blm Lengkap";
      default:
        return "";
    }
  },
  formatCurrenncy: (number) => {
    if (number) {
      return number.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
    return 0;
  },
  formatJenisPinjaman: (jenisPinjaman) => {
    switch (jenisPinjaman) {
      case "AK":
        return "Uang Kuliah/UKT";
      case "TA":
        return "Uang Tugas Akhir";

      default:
        return "undefined";
    }
  },
};
export default helper;
