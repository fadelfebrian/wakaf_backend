import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.resolve(__dirname, "..");

export const upload = async (files, dirpath) => {
  let result = {};
  try {
    if (files) {
      await Object.keys(files).map((key, index) => {
        return files[key].map((val, i) => {
          let tmp_path = val.path;
          let originaExt =
            val.originalname.split(".")[val.originalname.split(".").length - 1];
          let filename = val.filename + "." + originaExt;
          let target_path = path.resolve(
            rootPath,
            `public/uploads/${dirpath}/${filename}`
          );
          //   console.log("key", key);
          //   console.log("filename", filename);
          const src = fs.createReadStream(tmp_path);
          const dest = fs.createWriteStream(target_path);
          src.pipe(dest);
          result = { ...result, [key]: filename };
          src.on("end", () => {
            try {
              //   return "success";s
            } catch (err) {
              return false;
            }
          });
        });
      });
      return result;
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      msg: err.message,
      data: null,
    });
  }
};
