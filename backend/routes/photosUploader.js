import { Router } from "express";
const route = Router();
import imageDownload from "image-downloader";
import { multerPhotoUploader } from "../middlewares/multer.js";
import { uploadOnCloudinary } from "../services/cloudinary.js";
import path from "path"
// setting multer
// console.log("PAth",path.resolve("./uploads"));

route.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = `photo-${Date.now()}.jpg`;
  let dest = path.resolve("./uploads") + newName
  const image = await imageDownload.image({
    url: link,
    dest: dest,
  });
  if (image) {
     const res = await uploadOnCloudinary(dest)
    return res.json({
      message: "Photo uploaded successfully",
      fileUrl: res.url,
    });
  }
});

route.post("/upload", multerPhotoUploader.array("photos",10), async(req, res) => {
  console.log("Req.files - " + req.files);
  try {  
    const uploadPromises = req.files.map(file => uploadOnCloudinary(file.path));  
    const results = await Promise.all(uploadPromises);  
    const uploadedFiles = results.map(result => result.url);  
    res.json(uploadedFiles);  
  } catch (error) {  
    console.error("Error uploading files:", error);  
    res.status(500).json({ error: "Failed to upload files" });  
  }  
});
route.post("/upoadProfile",(req,res)=>{
  console.log(req);
})

export default route