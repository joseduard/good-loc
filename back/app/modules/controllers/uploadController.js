export function upload(req, res, next) {
  if (req) {
    res.status(200).json({
      message: "Image upload successfully",
      url: `${req.protocol}://${req.get("host")}/app/uploads/${req.file.filename}`,
    });
  } else {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
}
