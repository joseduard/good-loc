const express = require('express'); 
const router = express.Router();
const imageCtrl = require('../controllers/uploadController'); 
const multer = require('../middlewares/multerConfig'); 
const auth = require("../middlewares/auth.js")

router.post('/',auth, multer, imageCtrl.upload);

module.exports = router;