import multer from "multer";
// Define Mime_types Logic
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "app/uploads");
  },
  filename: (req, file, callback) => {
    const originalName = file.originalname;
    const extension = MIME_TYPES[file.mimetype];

    if (!extension) {
      return callback(new Error("Extension de fichier non valide"));
    }

    const timestamp = Date.now();
    const filename = `${originalName.substring(
      0,
      originalName.lastIndexOf(".")
    )}${timestamp}.${extension}`;
    callback(null, filename);
  },
});



// exports multer & add limits size accepted
export const setMulterConfig =  multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 512,
    fieldNameSize: 200,
  },
}).single("upload");
