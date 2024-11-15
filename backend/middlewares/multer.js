import multer from "multer";
import path from "path"
// console.log("path:"+ path.resolve("./uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const multerPhotoUploader = multer({storage})

