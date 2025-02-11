
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("file");

const uploadMiddleware = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: "Error uploading file" });
    }
    next(); 
  });
};

module.exports = uploadMiddleware;
