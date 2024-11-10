import { Router } from "express";
const route = Router();
import imageDownload from "image-downloader";
import multer from "multer";
import path from "path"
// setting multer
// console.log( path.resolve("./uploads"));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

route.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = `photo-${Date.now()}.jpg`;
  const image = await imageDownload.image({
    url: link,
    dest: path.resolve("./uploads") + newName,
  });
  if (image) {
    return res.json({
      message: "Photo uploaded successfully",
      fileUrl: newName,
    });
  }
});

const photosMiddleware = multer({ storage });
route.post("/upload", photosMiddleware.array("photos", 10), (req, res) => {
  console.log(req.files);
  let uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path } = req.files[i];
    let newPath = path.split("uploads/")[1]
    uploadedFiles.push(newPath);
  }
  res.json(uploadedFiles);
});
route.post("/upoadProfile",(req,res)=>{
  console.log(req);
})
export default route